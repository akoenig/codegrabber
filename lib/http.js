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

codegrabber.HTTP = (function initialize () {

    function HTTP () {}

    /**
     * Wrapper around the XMLHttpRequest for performing
     * a HTTP GET request.
     *
     * @param {string} uri
     * @param {function} callback Error first callback
     *
     */
    HTTP.prototype.get = function get (uri, callback) {
        var xhr = new XMLHttpRequest();
        var method = 'GET';

        // TODO: Implement error handling.
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