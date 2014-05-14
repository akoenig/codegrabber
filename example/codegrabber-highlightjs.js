/* 
 * codegrabber-highlightjs (v0.1.0)
 * 
 * Copyright(c) 2014 André König <andre.koenig@posteo.de>
 * MIT Licensed 
 * 
 */
"use strict";codegrabber.Hooks.register({name:"codegrabber-highlightjs",run:function(e){hljs.highlightBlock(e)}});