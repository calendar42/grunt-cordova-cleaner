/*
 * grunt-cordova-cleaner
 * https://github.com/calendar42/cordova-cleaner
 *
 * Copyright (c) 2013 Bob Karreman
 * Licensed under the MIT license.
 */

 'use strict';

 module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('cordova_cleaner', 'Cleans unnecessary files copied dfiles after the preparing process of Cordova', function() {
    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();

    // Libs
    var path    = require('path');
    var cheerio = require('cheerio');

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      'cwd': 'www',
      'htmlFile': 'index.html',
      'alwaysInclude': [],
      'foldersToClean': []
    });

    function findIncludesFromHTML (htmlFile, cbFindIncludes) {
      var data = grunt.file.read(htmlFile);
      var $ = cheerio.load(data);
      var includedFiles = [];

      $('script,link[rel="stylesheet"][type="text/css"]').each(function() {
        var el = $(this);
        var src = null;

        if (el.attr('dev') === 'true') {
          el.remove();
        } else {
          if (el.is('script')) {
            src = el.attr('src');
          } else if (el.is('link')) {
            src = el.attr('href');
          }

          if (src) {
            includedFiles.push(src);
          }
        }
      });

      // Remove the less includes
      $('link[rel="stylesheet/less"]').each(function() {
        var el = $(this);
        el.remove();
      });
          
      // Save changed indexFiles
      grunt.file.write('platforms/android/assets/www/index.html', $.html());
      grunt.file.write('platforms/ios/www/index.html', $.html());
      grunt.log.writeln('Saved the different files');

      cbFindIncludes(null, includedFiles);
    }

    function getFilesToKeep (files) {
      return grunt.file.expand({
        'cwd': options.cwd,
        'dot': true,
        'filter': 'isFile'
      }, files.concat(options.alwaysInclude));
    }

    function getFilesToDelete (filesToKeep) {
      return grunt.file.expand({
        'cwd': options.cwd,
        'dot': true,
        'filter': function(filepath) {
              // Get all files that are not in filesToKeep
              return grunt.file.isFile(filepath) && filesToKeep.indexOf(path.relative(options.cwd, filepath)) === -1;
            }
          }, ['**']);
    }

    function hasFiles (folderpath) {
      var files = grunt.file.expand({
        'cwd': folderpath,
        'dot': true,
        'filter': 'isFile'
      }, ['**', '!.DS_Store']);
      return files.length > 0;
    }

    function cleanFolders (toDelete, cbCleanFolders) {
      options.foldersToClean.forEach(function (folder) {
        toDelete.forEach(function (fileToDelete) {
          var fullPath = path.join(folder, fileToDelete);
          if (grunt.file.exists(fullPath)) {
                  // console.warn('delete:', fullPath);
                  grunt.file.delete(fullPath);
                }
              });
      });
      cbCleanFolders();
    }

    function removeEmptyFolders (cbRemoveEmpty) {
      options.foldersToClean.forEach(function (folder) {
        var folders = grunt.file.expand({
          'cwd': folder,
          'dot': true,
          'filter': function (filepath) {
            return grunt.file.isDir(filepath) && filepath !== folder;
          }
        }, ['**']);

        folders.forEach(function (folderToDelete) {
          var fullPath = path.join(folder, folderToDelete);

          if (grunt.file.exists(fullPath) && !hasFiles(fullPath)) {
                  // console.warn('delete empty folder:', fullPath);
                  grunt.file.delete(fullPath);
                }
              });
      });
      cbRemoveEmpty();
    }

    findIncludesFromHTML(path.join(options.cwd, options.htmlFile), function (err, files) {
      if (err) {
        done(false);
      }

      var toKeep = getFilesToKeep(files);

      var toDelete = getFilesToDelete(toKeep);

      cleanFolders(toDelete, function () {
        removeEmptyFolders(function () {
          done();
        });
      });
    });
  });
};
