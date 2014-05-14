



akoenig.codegrabber.Plugins.registerHighlighter('highlightjs', function (element) {

    console.log(element);

    hljs.highlightBlock(element);
});