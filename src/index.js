/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import Future from 'bluebird';
import redis from 'redis';

import config from './config.js';

let client;

/**
 * Create a redis client instance.
 * All methods are promisified via `bluebird.promisifyAll`.
 *
 * @param {Function} retryFunction The retry strategy function.
 * @param {Object} appState Object instance to set global app state health.
 * @returns {Object} A valid redis client instance.
 */
export function redisClient(retryFunction, appState) {
  if (!client) {
    const cfg = config();

    const options = {
      host: cfg.get('redis').host,
      port: cfg.get('redis').port,
      socket_keepalive: true
    };

    if (cfg.get('redis').password) {
      options.password = cfg.get('redis').password;
    }

    if (retryFunction && typeof retryFunction === 'function') {
      options.retry_strategy = retryFunction;
    }

    Future.promisifyAll(redis.RedisClient.prototype);
    Future.promisifyAll(redis.Multi.prototype);

    client = redis.createClient(options);

    process.on('SIGTERM', () => {
      setTimeout(client.quit.bind(client), 500);
    });

    process.on('SIGINT', () => {
      setTimeout(client.quit.bind(client), 500);
    });

    if (appState) {
      client.on('reconnecting', () => {
        appState.setBad();
      });

      client.on('connect', () => {
        if (!appState.isGood()) {
          appState.setGood();
        }
      });
    }
  }

  return client;
}

export default redisClient;
