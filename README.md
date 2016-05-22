# bitcoin-transact

This is a simple web app and experiment that tries to demonstrate how to send bitcoins from one address to another using nodejs and bitcore.
It was scaffolded with the [ng-fullstack](https://github.com/ericmdantas/generator-ng-fullstack) Yeoman generator.
I am making use of the [bicore](https://github.com/bitpay/bitcore-lib) and [bitcore-explorers](https://github.com/bitpay/bitcore-explorers) libraries
and the [blockchain.info API](http://blockchain.info/api) to fetch transaction information.

You can find a full tutorial on my [blog](http://jestersimpps.github.io/my-first-experience-with-bitpay-bitcore/).

![preview](https://raw.githubusercontent.com/jestersimpps/bitcoin-transact/master/preview.png)

## Getting started:

clone the repository and cd into the directory

Install the npm dependencies
```
npm install
```
Install the bower dependencies
```
bower install
```

## Running the project:

To run the project on [http://localhost:3333/](http://localhost:3333/)
```
npm start
```
You can also run in dev mode, which will autoreload using [browsersync](https://www.browsersync.io/)
```
npm run dev
```
Open browsersync options on [http://localhost:3001/](http://localhost:3001/)
