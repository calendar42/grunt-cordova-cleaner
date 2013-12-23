# grunt-cordova-cleaner

> Cleans unnecessary files copied files after the preparing process of Cordova

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cordova-cleaner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cordova-cleaner');
```

## The "cordova_cleaner" task

### Overview
In your project's Gruntfile, add a section named `cordova_cleaner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cordova_cleaner: {
    options: {
        htmlFile: 'index.html',
        alwaysInclude: ['index.html', 'config.xml', 'img/**', 'fonts/**', 'templates/**'],
        foldersToClean: ['platforms/android/assets/www/', 'platforms/ios/www/']
    }
  },
});
```

### Options

#### options.cwd
Type: `String`
Default value: `'www'`

A string value that is used to indicate the working directory

#### options.htmlFile
Type: `String`
Default value: `'index.html'`

A string value that is used to indicate the htmlFile name of the cordova application

#### options.alwaysInclude
Type: `Array`
Default value: `[]`

An Array that indicates the paths containing files to always include

#### options.foldersToClean
Type: `Array`
Default value: `[]`

An Array that indicates the paths to directories that should be cleaned

### Usage Examples

#### Default Options
In this example, the default options are used to ... TODO

```js
grunt.initConfig({
  cordova_cleaner: {
    options: {},
    htmlFile: 'app.html',
    alwaysInclude: ['config.xml', 'img/**', 'fonts/**', 'templates/**'],
    foldersToClean: ['platforms/android/assets/www/', 'platforms/ios/www/']
  },
});
```

#### Custom Options
In this example, custom options are used to TODO

```js
grunt.initConfig({
  cordova_cleaner: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
