# Logger

Logger for use with my personal projects. Created so if I change my best practices for logging I only have to update in one place.

Picks up log level from `process.env.LOG_LEVEL` unless explicitly provided in constructor. Defaults to `info` if not provided in any.

Currently using bunyan.

## Usage

Install with `npm i -S @danielemeryau/logger`

```js
import { BunyanLogger } from '@danielremery/logger';

const logger = new BunyanLogger('My Application');
const routerLogger = logger.child('Router');

logger.info('Some application message', {
  context1: 'some context',
  context2: 'some other context',
});

routerLogger.error('A routing error has occurred');
```
