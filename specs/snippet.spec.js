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

describe('The Snippet', function () {

    var Snippet = window.akoenig.codegrabber.Snippet;

    it('should be creatable', function () {
        var snippet = Snippet.create();

        expect(snippet.constructor.name).toBe('Snippet');
    });
});