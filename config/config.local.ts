import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/demo',
      options: {},
    },
  };

  config.redis = {
    clients: {
      df: {
        "host": "127.0.0.1",
        "port": 6379,
        "password": "",
        db: 0,
      },
      acl: {
        "host": "127.0.0.1",
        "port": 6379,
        "password": "",
        db: 1,
      }
    }
  };

  return config;
};
