# reConfigure your Node.js Applications

Like: https://www.npmjs.com/package/config

## Introduction
Node-config organizes hierarchical configurations for your app deployments.

It lets you define a set of default parameters, and extend them for different deployment environments (development, qa, staging, production, etc.).

Configurations are stored in configuration files within your application, and can be overridden and extended by environment variables, command line parameters, or external sources.

This gives your application a consistent configuration interface shared among a growing list of npm modules also using node-config.

## Project Guidelines
- Simple - Get started fast
- Powerful - For multi-node enterprise deployment
- Flexible - Supporting multiple config file formats
- Lightweight - Small file and memory footprint
- Predictable - Well tested foundation for module and app developers

## Quick Start
The following examples are in JSON format, but configurations can be in other file formats.

Install in your app directory, and edit the default config file.
```cmd
$ npm install config
$ mkdir config
$ vi config/default.json
```

```json
{
  // Customer module configs
  "Customer": {
    "dbConfig": {
      "host": "localhost",
      "port": 5984,
      "dbName": "customers"
    },
    "credit": {
      "initialLimit": 100,
      // Set low for development
      "initialDays": 1
    }
  }
}
```

**Edit config overrides for production deployment:**
```cmd
 $ vi config/production.json
 ```

 ```json
{
  "Customer": {
    "dbConfig": {
      "host": "prod-db-server"
    },
    "credit": {
      "initialDays": 30
    }
  }
}
```

**Use configs in your code:**
```js
const config = require('config');
//...
const dbConfig = config.get('Customer.dbConfig');
db.connect(dbConfig, ...);

if (config.has('optionalFeature.detail')) {
  const detail = config.get('optionalFeature.detail');
  //...
}
```

`config.get()` will throw an exception for undefined keys to help catch typos and missing values. Use config.has() to test if a configuration value is defined.

**Start your app server:**
```shell
$ export NODE_ENV=production
$ node my-app.js
```

Running in this configuration, the port and dbName elements of dbConfig will come from the `default.json` file, and the host element will come from the production.json override file.
