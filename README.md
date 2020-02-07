# Logger

Logger for use with my personal projects. Created so if I change my best practices for logging I only have to update in one place.

Picks up log level from `process.env.LOG_LEVEL` unless explicitly provided in constructor. Defaults to `info` if not provided in any.

Currently using bunyan.

## Usage

Install with `npm i -D @danielemeryau/logger`

```js
import Logger from '@danielremery/logger';

const logger = new Logger('My app name');

logger.info('Some text message', {
  context1: 'some context',
  context2: 'some other context',
});
```
