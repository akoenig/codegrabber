/*
 * codegrabber
 *
 * Copyright(c) 2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@posteo.de>
 *
 */

'use strict';

module.exports = function (config) {

    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'specs/**/*.spec.js'
        ],

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],

        exclude: [],

        port: 8080,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['PhantomJS'],

        singleRun: true
    });
};