import convict from 'convict';

export const config = convict({
  database: {
    host: {
      default: 'localhost',
      env: 'API_DB_HOST',
      format: String,
    },
    port: {
      default: 3306,
      env: 'API_DB_PORT',
      format: Number,
    },
    username: {
      default: '',
      env: 'API_DB_USERNAME',
      format: String,
    },
    password: {
      default: '',
      env: 'API_DB_PASSWORD',
      sensitive: true,
      format: String,
    },
    database: {
      default: 'finances',
      env: 'API_DB_DATABASE',
      format: String,
    },
    synchronize: {
      default: false,
      env: 'API_DB_SYNCHRONIZE',
      format: Boolean,
    },
  },
});

config.validate();
