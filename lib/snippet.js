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

akoenig.codegrabber.Snippet = (function init () {
    
    var HTTP = akoenig.codegrabber.HTTP;
    var Burnisher = akoenig.codegrabber.Burnisher;

    /**
     * A remote code snippet which will be fetched, polished
     * and wrapped into a HTML 'code' element.
     *
     * Options:
     * 
     *     uri: The URI of the code snippet
     *     lines: A line range that should be fetched
     * 
     * @param {object} options 
     *
     */
    function Snippet (options) {
        this.uri = options.uri || 'https://rawgit.com/akoenig/codegrabber/master/message';
        this.lines = options.lines;

        this.$$node = document.createElement('pre');
        this.$$fetch();
    }

    /**
     * Will polish the content depending on the given options.
     *
     * @param  {string} contents The contents that should be polished.
     * @return {string} The polished content.
     *
     */
    Snippet.prototype.$$polish = function $$polish (contents) {
        var burnisher = Burnisher.create();

        if (this.lines) {
            contents = burnisher.slice(contents, this.lines);
        }

        return contents;
    };

    /**
     * Fetchs the source file from the given URI and injects
     * the polished source into the 'code' node.
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
     * Returns the HTML 'code' node.
     *
     * @return {Node}
     *
     */
    Snippet.prototype.getNode = function getNode () {
        return this.$$node;
    };

    return {
        create : function create (options) {
            options = options || {};

            return new Snippet(options);
        }
    };
})();