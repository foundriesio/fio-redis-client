A redis client wrapper, used on \*.foundries.io web applications.

It is based on the [redis](https://www.npmjs.com/package/redis) nodejs client.

## How to use it

```JavaScript
import redisClient from '@foundriesio/redis-client';

return redisClient();
```

## Configuration

Via a JSON file with the following structure:
```JSON
{
  "redis": {
    "host": "The redis host, defaults to localhost",
    "port": "The redis port, defaults to 6379",
    "password": "The redis access password"
  }
}
```

The JSON file can be defined using the `FIO_CONFIG_FILE` environment variable:
```bash
export FIO_CONFIG_FILE="/path/to/config.json"
```

Or using the following environment variable:
* `FIO_REDIS_HOST`: the redis host, defaults to `localhost` (string).
* `FIO_REDIS_PORT`: the redis port, defaults to `6379` (number).
* `FIO_REDIS_PASSWORD`: the redis password, not set by default (string).
