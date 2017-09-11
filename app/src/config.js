require('babel-polyfill');

const environment = {
    development: {
        isProduction: false
    },
    production: {
        isProduction: true
    }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    app: {
        title: 'Hero',
        description: 'The best online shopping ever.',
        head: {
            titleTemplate: 'Hero: %s',
            meta: [
                {name: 'description', content: 'The best online shopping ever.'},
                {charset: 'utf-8'},
                {property: 'og:site_name', content: 'Hero'},
                {property: 'og:image', content: ''},
                {property: 'og:locale', content: 'en_US'},
                {property: 'og:title', content: 'Hero'},
                {property: 'og:description', content: 'The best online shopping ever.'},
                {property: 'og:card', content: 'summary'},
                {property: 'og:site', content: '@mossen'},
                {property: 'og:creator', content: '@mossen'},
                {property: 'og:image:width', content: '200'},
                {property: 'og:image:height', content: '200'}
            ]
        }
    },

}, environment);
