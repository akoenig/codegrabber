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

codegrabber.Snippet = (function init () {
    
    var HTTP = codegrabber.HTTP;
    var Burnisher = codegrabber.Burnisher;
    var Highlighters = codegrabber.Highlighters;

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
        this.uri = options.uri;
        this.lines = options.lines;

        this.$pre = options.pre;
        this.$code = document.createElement('code');

        this.$pre.appendChild(this.$code);

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
     * Triggers the configured highlight plugin.
     *
     */
    Snippet.prototype.$$highlight = function $$highlight () {
        var highlighters = codegrabber.Plugins.highlighters;
        // In the current release it is just possible to access the first
        // registered highlighter.
        var highlighter = highlighters[Object.keys(highlighters)[0]];

        if (highlighter) {
            highlighter(this.$pre);
        }
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

            self.$code.appendChild(contents);

            // Trigger the syntax highlighting.
            self.$$highlight();
        }

        HTTP.get(this.uri, onFetch);
    };

    return {
        create : function create (options) {
            options = options || {};

            return new Snippet(options);
        }
    };
})();