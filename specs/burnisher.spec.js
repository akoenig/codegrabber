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

describe('The Burnisher', function () {

    var Burnisher = window.codegrabber.Burnisher;

    it('should be creatable', function () {
        var burnisher = Burnisher.create();

        expect(burnisher.constructor.name).toBe('Burnisher');
    });

    it('should be able to slice lines out of content', function () {
        var burnisher = Burnisher.create();
        var content = 'Hello\nWorld\n!';

        var result = burnisher.slice(content, '1-2');
        expect(result).toBe('Hello\nWorld');
    });

    it('should be able to slice lines even if the range is invalid', function () {
        var burnisher = Burnisher.create();
        var content = 'Hello\nWorld\n!';

        var result = burnisher.slice(content, 'fooo');
        expect(result).toBe('Hello\nWorld\n!');
    });
});