# Project Boilerplate

An SCSS, Gulp and BrowserSync based project boilerplate for your HTML5 project, shipped with jQuery, several awesome polyfills, FontAwesome and more.

## Polyfills
* **HTML5Shiv.js** by afarkas, Jon Neal & community - Polyfill for HTML5
* **Flexibility.js** by 10up - Polyfill for Flexbox
* **Picturefill.js** by Scott Jehl/Filament Group - Polyfill for responsive images (src-set)
* **SVG4everybody.js** by Jonathan T Neal - Polyfill for using  external SVG spritemaps
* **rAF.js** by Paul Irish - Polyfill for requestAnimationFrame

## Other features
* **Meyer Reset** by Eric Meyer
* **Normalize SCSS** by John Albin
* **Support-For** by John Albin
* **VideoJS** by zencoder
* **FontAwesome** by Dave Gandy
* **jQuery** by John Resig

### Flexibility.js
You don't have to manually put `-js-display: flex;` everywhere, this is done automatically through Gulp.

### SVG4everybody.js
Since this not needed for every project. If you want this to be included, you have to edit the gulpfile.js and uncomment the code below:
```javascript
// 'bower_components/svg4everybody/dist/svg4everybody.js',
...
// 'assets/src/js/vendors/svg4everybody.js',
```

Then initialize the script in /assets/src/js/site.js by adding:
```javascript
svg4everybody();
```

## How to use this Boilerplate
First make sure you have Node, NPM, Gulp, Bower and Sass installed on your system. Plenty of resources out there for any help if necessary. After that:

1. Run `npm install` to install all packages.
2. Run `bower install` to pull in all dependencies.
3. Run `gulp init` to copy all necessary files from the bower_components folder to our project folder.
4. Edit gulpfile.js and change the devUrl variable to reflect your development environment.
```javascript
var devUrl = ''; // Put your local development URl here. eg. http://localhost or http://localhost:8888
```
5. Run `gulp` to start development. This will start BrowserSync in your default browser. Any HTML, CSS and JS changes will appear in your browser.
6. If you're putting your project in Git, don't forget to add *bower_components* and *node_modules* folders in the .gitignore file.
7. Make an awesome website.

## Issues
If you run into any issues, let me know.
