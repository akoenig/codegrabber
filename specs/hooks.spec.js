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

describe('The Hooks interface', function () {
    var Hooks = codegrabber.Hooks;

    it('should be able to provide a mechanism for registering hooks', function () {
        var executions;

        Hooks.register({name: 'foo', run : function () {}});

        executions = Hooks.$$run();

        expect(executions).toBe(1);
    });

    it('should be able to handle the case if someone tries to register an invalid hook', function () {
        var executions;

        Hooks.clear();

        // Registering hook with missing 'run' function.
        Hooks.register({name: 'foo'});

        executions = Hooks.$$run();

        expect(executions).toBe(0);
    });
});