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

akoenig.grabcode.Snippet = (function init () {
    var HTTP = akoenig.grabcode.HTTP;

    function Snippet (options) {
        this.uri = options.uri || '<TODO_DEFINE_URI>';
        this.lines = options.lines;

        this.$$node = document.createElement('pre');
        this.$$fetch();
    }

    /**
     * DOCME
     *
     * @param  {[type]} contents [description]
     * @return {[type]}          [description]
     *
     */
    Snippet.prototype.$$polish = function $$polish (contents) {
        console.log(this.lines);

        if (this.lines) {
            
        }

        return contents;
    };

    /**
     * DOCME
     * 
     * @return {[type]} [description]
     *
     */
    Snippet.prototype.$$fetch = function $$fetch () {
        var self = this;

        function onFetch (err, contents) {
            if (err) {
                return console.error(err);
            }

            contents = self.$$polish(contents);
            contents = document.createTextNode(contents);

            self.$$node.appendChild(contents);
        }

        HTTP.get(this.uri, onFetch);
    };

    /**
     * DOCME
     *
     * @return {[type]} [description]
     *
     */
    Snippet.prototype.getNode = function getNode () {
        return this.$$node;
    };

    return {
        create : function (options) {
            options = options || {};

            return new Snippet(options);
        }
    };
})();