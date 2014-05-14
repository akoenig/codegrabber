
codegrabber.Hooks.register({
    name: 'highlight.js',
    run : function run (element) {
        hljs.highlightBlock(element);
    }
});