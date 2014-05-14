/* 
 * codegrabber (v0.2.0-alpha)
 * 
 * Copyright(c) 2014 André König <andre.koenig@posteo.de>
 * MIT Licensed 
 * 
 */
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

/*jshint -W079 */
var akoenig = akoenig || {};
akoenig.codegrabber = akoenig.codegrabber || {};
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

akoenig.codegrabber.Burnisher = (function init () {

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

akoenig.codegrabber.HTTP = (function init () {

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
    var Highlighters = akoenig.codegrabber.Highlighters;

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
        var highlighters = akoenig.codegrabber.Plugins.highlighters;
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

akoenig.codegrabber.Plugins = (function init () {

    return {
        highlighters: {},

        registerHighlighter : function registerHighlighter (name, hook) {
            this.highlighters[name] = hook;
        }
    };
})();
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
                pre: $pre,
                uri: uri,
                lines: $pre.getAttribute('data-lines')
            });
        }
    });
})();