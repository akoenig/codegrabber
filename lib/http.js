/*
 * grabcode
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

var akoenig = akoenig || {};
akoenig.grabcode = akoenig.grabcode || {};

akoenig.grabcode.HTTP = (function init () {

    function HTTP () {}

    /**
     * Wrapper around the XMLHTTPRequest
     *
     * @param {string} uri
     * @param {function} callback Error first callback
     *
     */
    HTTP.prototype.get = function get (uri, callback) {
        var xhr = new XMLHttpRequest();
        var method = 'GET';

        // TODO: Implement error handlin.
        xhr.onreadystatechange = function() {
            if (4 === xhr.readyState) {
                callback(null, xhr.responseText);
            }
        };

        xhr.open(method, uri);
        xhr.send();
    };

    return new HTTP();
})();