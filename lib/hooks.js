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

codegrabber.Hooks = (function initialize () {

    var hooks = [];

    /**
     * Registering a hook. This function will be exposed
     * for using by hook authors.
     *
     * @param {object} hook The hook that should be registered..
     *
     */
    function register (hook) {

        hook = hook || {};

        if (!hook.name) {
            return console.error('%s: Please define a name for your hook.', codegrabber.name);
        }

        if ('function' !== typeof hook.run) {
            return console.error('%s: The hook \'%s\' needs a valid \'run\' function. Skipping this hook.', codegrabber.name, hook.name);
        }

        hooks.push(hook);
    }

    /**
     * Clears all registered hooks
     *
     */
    function clear () {
        hooks = [];
    }

    /**
     * Will run all defined hooks in series
     * 
     * @param  {element} element The 'pre' element.
     *
     */
    function run (element) {
        var i = 0;
        var len;
        var executions = 0;

        if (hooks.length) {
            len = hooks.length;

            for (i; i < len; i = i + 1) {
                hooks[i].run(element);

                executions = executions + 1;
            }
        }

        return executions;
    }

    return {
        register: register,
        clear: clear,
        $$run: run
    };
})();