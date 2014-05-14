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

(function main () {

    var Snippet = codegrabber.Snippet;

    var $pres = document.querySelectorAll('pre');

    //
    // Fetch all snippets for the given 'pre' elements.
    //
    [].forEach.call($pres, function ($pre) {
        var uri = $pre.getAttribute('data-src');

        if (uri) {
            Snippet.create({
                pre: $pre,
                uri: uri,
                lines: $pre.getAttribute('data-lines')
            });
        }
    });
})();