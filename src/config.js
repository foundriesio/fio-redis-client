import convict from 'convict';

const { NODE_ENV } = process.env;

if (NODE_ENV !== 'production') {
  require('dotenv').config();
}

let cfg;

export function config() {
  if (!cfg) {
    const cfg = convict({
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
