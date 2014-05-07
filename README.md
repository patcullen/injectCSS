# Why injectCSS?
- The primary goal was to create an easy way to include multi-line (lots) of CSS using Javascript.
- Can reduce number of files in a JS plugin or project (My goal was one).
- A test run at jsperf.com shows that injecting CSS rules for a vast number of elements is very fast:  http://jsperf.com/inject-vs-apply/2

# How to use

## With RequireJS
```js
require(['injectCSS'], function(injectCSS) {
	injectCSS(function(){/*
		.case1 {
			border: 3px solid #0f0;
		}
	*/});
	injectCSS('.case2 { border: 3px solid #00f; } ');
});
```

## On it's own with no dependencies
```html
<!DOCTYPE html>
<head>
	<script src="injectCSS.js"></script>
</head>
<body>
	<div class="test case1">test case 1</div>
	<div class="test case2">test case 2</div>
<script>
	(function(){
		injectCSS(function(){/*
			.case1 {
				border: 3px solid #0f0;
			}
		*/});
		injectCSS('.case2 { border: 3px solid #00f; } ');
	})();
</script>
</body>
</html>
```
# Compatability
Tested successfully on:
- Chrome (+mobile)
- Firefox
- Safari (+mobile)
- IE 10+

Due to the older IE browsers not allowing the innerHTML property to be set on certain elements, this will not work in them.

# License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.