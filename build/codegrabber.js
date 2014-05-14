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
var codegrabber = codegrabber || {};

codegrabber.name = 'codegrabber';
codegrabber.version = '0.2.0'; // Replace by build process.
codegrabber.author = 'André König <andre.koenig@posteo.de>'; // Replace by build process.
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

codegrabber.Burnisher = (function initialize () {

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

codegrabber.Hooks = (function initialize () {

    var hooks = [];

    /**
     * Registering a hook. This function will be exposed
     * for using by hook authors.
     *
     * @param {object} hook The hook that should be registered..
     *
     */
    function register (hook) {

        hook = hook || {};

        if (!hook.name) {
            return console.error('%s: Please define a name for your hook.', codegrabber.name);
        }

        if ('function' !== typeof hook.run) {
            return console.error('%s: The hook \'%s\' needs a valid \'run\' function. Skipping this hook..', codegrabber.name, hook.name);
        }

        hooks.push(hook);
    }

    /**
     * Clears all registered hooks
     *
     */
    function clear () {
        hooks = [];
    }

    /**
     * Will run all defined hooks in series
     * 
     * @param  {element} element The 'pre' element.
     *
     */
    function run (element) {
        var i = 0;
        var len;
        var executions = 0;

        if (hooks.length) {
            len = hooks.length;

            for (i; i < len; i = i + 1) {
                hooks[i].run(element);

                executions = executions + 1;
            }
        }

        return executions;
    }

    return {
        register: register,
        clear: clear,
        $$run: run
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