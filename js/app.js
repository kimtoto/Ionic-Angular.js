'use strict';
var app = angular.module('App', ['ngResource']);
    app.directive('markdown', function () {
        var converter = new Showdown.converter();
        return {
          scope: {
            markdown: '@'
          },
          link: function (scope, element, attrs) {
            scope.$watch('markdown', function () {
              var content = converter.makeHtml(attrs.markdown);
              element.html(content);
            });
          }
        }
      });
