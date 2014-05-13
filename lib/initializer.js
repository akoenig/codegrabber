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

(function init () {

    var HTTP = akoenig.codegrabber.HTTP;
    var Snippet = akoenig.codegrabber.Snippet;

    var $pres = document.querySelectorAll('pre');

    //
    // Fetch all snippets for the given 'pre' elements.
    //
    [].forEach.call($pres, function ($pre) {
        var uri = $pre.getAttribute('data-src');
        var snippet;

        if (uri) {
            snippet = Snippet.create({
                uri: uri,
                lines: $pre.getAttribute('data-lines')
            });

            $pre.appendChild(snippet.getNode());
        }
    });
})();