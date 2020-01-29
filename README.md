# Logger

Logger for use with my personal projects. Created so if I change my best practices for logging I only have to update in one place.

Picks up log level from `process.env.LOG_LEVEL` unless explicitly provided in constructor. Defaults to `info` if not provided in any.

Currently using bunyan.
