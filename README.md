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

    <pre data-src="https://domain.tld/your-file.js"
         data-lines="1-20"></pre>

Displays only the first 20 lines of `your-file.js`.

## Changelog

### Version 0.3.0 (Future)

- Feature for removing comments from a source file.

### Version 0.2.0 (20140513)

- Specs

### Version 0.1.0 (20140513)

- Support for fetching remote files.
- Support for extracting a particular range of lines.

## Author

Copyright 2014, [André König](http://andrekoenig.info) (andre.koenig@posteo.de)
