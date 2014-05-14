# CodeGrabber [![Build Status](https://travis-ci.org/akoenig/codegrabber.svg?branch=master)](https://travis-ci.org/akoenig/codegrabber)

Grabs remote code files and embeds them into your website.

## Installation

1. Include `codegrabber` in your HTML.

    ```html
    <script src="codegrabber.min.js"></script>
    ```

2. Define some `pre` tags.

    ```html
    <pre data-src="https://rawgit.com/akoenig/codegrabber/master/README.md"></pre>
    ```

3. Enjoy :)

## Options

#### data-src
Type: `String`
Default: undefined

The URI to the source file which you want to embed.

#### data-lines (optional)
Type: `String`
Default: undefined

There are sometime situations in which you only want to display a particular part of your source files. You can do that by defining the `data-lines` attribute, like:

    <pre data-src="https://host.tld/your-file.js"
         data-lines="1-20"></pre>

Displays only the first 20 lines of `your-file.js`.

## Meh, no syntax highlighting? - Hooks!

If you are wondering why there is no syntax highlighting, because hooks :) `codegrabber` provides a straightforward hook mechanism with which you can embed your favorite syntax highlighter or, of course, do other crazy things. I built a hook for using the [highlight.js](http://highlightjs.org) syntax highlighter out of the box. Check [https://github.com/akoenig/codegrabber-highlightjs](codegrabber-highlightjs).

But, writing your own hook and registering it is easy:

```javascript
    codegrabber.Hooks.register({
        name: 'your-hook',
        run : function run (element) {
            // Do something special
        }
    });
```

You can register as much hooks as you want. All of them will be executed in a sequential order.

Easy, eh? Every hook will be run `after` the source file has been loaded into the respective HTML element which will also be passed to the `run` function.
    
### Available Hooks

If you have written your own hook (e.g. for covering a different syntax highlighter), [drop me a line](mailto:akoenig@posteo.de) and I will add it to the following list.

- [https://github.com/akoenig/codegrabber-highlightjs](codegrabber-highlightjs) - Syntax highlighting with `highlight.js`.

## Changelog

### Version 0.3.0 (Future)

- Feature for removing comments from a source file.

### Version 0.2.0 (20140513)

- Interface for integrating hooks (e.g. syntax highlighters).
- Streamlined the namespace.

### Version 0.1.0 (20140513)

- Support for fetching remote files.
- Support for extracting a particular range of lines.

## Author

Copyright 2014, [André König](http://andrekoenig.info) (andre.koenig@posteo.de)
