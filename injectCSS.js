/*	A javascript doodad for injecting CSS into your document.
 *
 * (The MIT License)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the 'Software'), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


(function(window){

var module = (function(){

	// We will only be manipulating one extra style block since older IE browsers have a limit of 32 style blocks per page
	var __dynamicStyleObject = null,

	/* Accepts a function where the entire contents is CSS wrapped in a multiline comment (much like this comment)
	 * Returns the style element that was created and injected.
	 * Example:
	 *		(function(){
	 *			require(['injectCSS'], function(injectCSS) {
	 *				injectCSS(function(){/*
	 *					.woohoo {
	 *						border: 3px solid #f0f;
	 *					}
	 *				* /});
	 *			// or
	 *				injectCSS('.foobar { border: 2px solid #f00; } ');
	 *			});
	 *		})();
	 */
	inject = function(input) {
		// first ensure that we have created a dom element to work with
		if (__dynamicStyleObject == null) {
			__dynamicStyleObject = window.document.createElement('style');
			__dynamicStyleObject.id = 'injectCSS';
			__dynamicStyleObject.innerHTML = '';
			document.body.appendChild(__dynamicStyleObject);
		}
		
		// interpret the input
		var content = null;
		if (typeof input === 'string') { 
			content = input;
		} else
		if (typeof input === 'function') { 
			content = input.toString().
				replace(/^[^\/]+\/\*!?/, '').
				replace(/\*\/[^\/]+$/, '');
		} else {
			throw 'Type (' + (typeof input) + ') is not supported by injectCSS.';
		}
		
		// now lets append CSS content inside
		if (content != null)
			__dynamicStyleObject.innerHTML += '\n' + content;
		
		// return our working node for the implementor to potentially poke holes in.
		return __dynamicStyleObject;
	}

	// incase someone uses a script include then throws in some requireJS later. we want to use the same style object always. a clean dom is a happy dom.
	if (window['injectCSS'] != undefined)
		return window['injectCSS'];
	// incase someone uses a script include then throws in some requireJS later. we want to use the same style object always. a clean dom is a happy dom.
	if (window.injectCSS != undefined)
		return window.injectCSS;
	
	return inject;
	
});


/* If RequireJS is not detected, a global variable called 'injectCSS' will be created.
 *
 */
if (window['define'] !== undefined) {
	define(module);
} else {
	window['injectCSS'] = module();
}

if (typeof define === 'function' && define.amd) {
	define('injectCSS', [], module);
} else {
	window.injectCSS = module();
}

})( window );