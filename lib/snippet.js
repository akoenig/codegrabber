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

codegrabber.Snippet = (function initialize () {
    
    var HTTP = codegrabber.HTTP;
    var Burnisher = codegrabber.Burnisher;
    var Hooks = codegrabber.Hooks;

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
        var self = this;

        this.uri = options.uri;
        this.lines = options.lines;

        //
        // Create the DOM element structure
        //
        //     <pre>
        //         <code></code>
        //     </pre>
        // 
        this.$pre = options.pre;
        this.$code = document.createElement('code');
        this.$pre.appendChild(this.$code);

        //
        // Fetch the remote source file, polish it, embed
        // the contents into the DOM and execute possible hooks.
        //
        HTTP.get(this.uri, function onFetch (err, contents) {
            if (err) {
                return console.log('%s: Fetching remote source file failed', codegrabber.name);
            }

            contents = self.$$polish(contents);
            contents = document.createTextNode(contents);

            self.$code.appendChild(contents);

            Hooks.$$run(self.$pre);
        });
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

    return {
        create : function create (options) {
            options = options || {};

            return new Snippet(options);
        }
    };
})();