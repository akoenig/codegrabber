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

codegrabber.Burnisher = (function init () {

    /**
     * Burnisher provides the functionality
     * for polishing the content of the source
     * file (slicing particular lines, etc.)
     *
     */
    function Burnisher () {}

    /**
     * Normalizes the line range for slicing lines.
     * The function validates if the given range is valid.
     *
     * @param  {string} range e.g. (1-23)
     * @return {array} [1, 23]
     *
     */
    Burnisher.prototype.$$normalizeLineRange = function $$normalizeLineRange (range) {
        range = (range || '').split('-');

        if (2 !== range.length) {
            return;
        }

        range[0] = Number(range[0]);
        range[1] = Number(range[1]);

        if ( (isNaN(range[0]) || range[0] < 0) ||
             (isNaN(range[1]) || range[1] < 0) ) {
            return;
        }

        return range;
    };

    /**
     * Returns a subset of the given content.
     *
     * Example:
     *
     *     range: '1-20'
     *     Will slice the line 1 to 20 out of the given content.
     *
     * @param  {string} contents The source content.
     * @return {string} range e.g. '1-20'
     *
     */
    Burnisher.prototype.slice = function slice (contents, range) {
        var newline = '\n';
        var lines = contents.split(newline);

        range = this.$$normalizeLineRange(range);

        if (!range) {
            return lines.join(newline);
        }

        contents = lines.splice(range[0] - 1, range[1]).join(newline);

        return contents;
    };

    return {
        create : function create () {
            return new Burnisher();
        }
    };
})();