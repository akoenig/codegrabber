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

akoenig.codegrabber.Plugins = (function init () {

    return {
        highlighters: {},

        registerHighlighter : function registerHighlighter (name, hook) {
            this.highlighters[name] = hook;
        }
    };
})();