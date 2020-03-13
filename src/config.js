/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import convict from 'convict';

const { NODE_ENV } = process.env;

if (NODE_ENV !== 'production') {
  require('dotenv').config();
}

let cfg;

export function config() {
  if (!cfg) {
    cfg = convict({
      config: {
        format: String,
        default: '',
        env: 'FIO_CONFIG_FILE'
      },
      redis: {
        host: {
          format: String,
          default: 'localhost',
          env: 'FIO_REDIS_HOST'
        },
        port: {
          format: 'port',
          default: 6379,
          env: 'FIO_REDIS_PORT'
        }
      }
    });

    const configFile = cfg.get('config');
    if (configFile) {
      cfg.loadFile(configFile);
    }
  }

  return cfg;
}

export default config;
