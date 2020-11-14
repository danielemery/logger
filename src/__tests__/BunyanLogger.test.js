const sinon = require('sinon');
const bunyan = require('bunyan');
const { assert } = require('chai');

const { BunyanLogger } = require('../BunyanLogger');
const { InvalidLogConfigError } = require('../LoggerErrors');

describe('BunyanLogger', () => {
  const bunyanP = sinon.stub(bunyan.prototype);
  const createLoggerSpy = sinon.spy(bunyan, 'createLogger');
  afterEach(() => {
    sinon.reset();
  });
  it('must log to underlying bunyan instance', () => {
    const logger = new BunyanLogger('root', 'warn');
    logger.error('Some error occurred');
    sinon.assert.calledOnce(bunyanP.error);
    sinon.assert.calledWithExactly(bunyanP.error, 'Some error occurred');
  });
  it('must pass context to underlying bunyan instance', () => {
    const logger = new BunyanLogger('root', 'warn');
    const context = { hello: 'This object is a problem' };
    logger.warn('Warn message', context);
    sinon.assert.calledOnce(bunyanP.warn);
    sinon.assert.calledWithExactly(bunyanP.warn, 'Warn message', context);
  });
  it('must pass correct name to underlying bunyan instance', () => {
    new BunyanLogger('correct', 'info');

    sinon.assert.calledOnce(createLoggerSpy);
    sinon.assert.calledWithExactly(createLoggerSpy, {
      name: 'correct',
      level: 'info',
    });
  });
  it('must pass correct child name to underlying bunyan instance', () => {
    const parent = new BunyanLogger('parent', 'info');
    parent.child('child');

    sinon.assert.calledTwice(createLoggerSpy);
    sinon.assert.calledWithExactly(createLoggerSpy, {
      name: 'parent',
      level: 'info',
    });
    sinon.assert.calledWithExactly(createLoggerSpy.secondCall, {
      name: 'parent/child',
      level: 'info',
    })
  });
  it('must pass correct default log level to underlying bunyan instance', () => {
    new BunyanLogger('default');
    sinon.assert.calledOnce(createLoggerSpy);
    sinon.assert.calledWithExactly(createLoggerSpy, {
      name: 'default',
      level: 'info',
    });
  });
  it('must pass log level from process env to underlying bunyan instance', () => {
    process.env.LOG_LEVEL = 'debug';
    new BunyanLogger('default');
    sinon.assert.calledOnce(createLoggerSpy);
    sinon.assert.calledWithExactly(createLoggerSpy, {
      name: 'default',
      level: 'debug',
    });
    delete process.env.LOG_LEVEL;
  });
  it('must override process env with arg when providing level to underlying bunyan instance', () => {
    process.env.LOG_LEVEL = 'error';
    new BunyanLogger('default', 'warn');
    sinon.assert.calledOnce(createLoggerSpy);
    sinon.assert.calledWithExactly(createLoggerSpy, {
      name: 'default',
      level: 'warn',
    });
    delete process.env.LOG_LEVEL;
  });
  it('must throw if an unknown log level is provided as an argument', () => {
    try {
      new BunyanLogger('oops', 'garbage');
      assert.fail();
    } catch (err) {
      assert.instanceOf(err, InvalidLogConfigError);
      assert.equal(err.message, 'Unknown log level provided: garbage');
    }
  });
  it('must ignore if an invalid log level is provided using process.env', () => {
    process.env.LOG_LEVEL = 'garbage';
    new BunyanLogger('hey');
    sinon.assert.calledWithExactly(createLoggerSpy, {
      name: 'hey',
      level: 'info',
    });
    delete process.env.LOG_LEVEL;
  });
});
