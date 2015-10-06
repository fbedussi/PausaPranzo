module.exports = function(grunt, options) {
  'use strict';


  var task = {
    options: {
      useHelpers: false,
      stopOnFailure: false,
      // configure one or more built-in reporters
      reporters: {
        console: {
          colors: true,
          cleanStack: 1,       // (0|false)|(1|true)|2|3
          verbosity: 4,        // (0|false)|1|2|3|(4|true)
          listStyle: "indent", // "flat"|"indent"
          activity: false
        }//,
        // junit: {
        //     savePath: "./reports",
        //     filePrefix: "junit-report",
        //     consolidate: true,
        //     useDotNotation: true
        // },
        // nunit: {
        //     savePath: "./reports",
        //     filename: "nunit-report.xml",
        //     reportName: "Test Results"
        // },
        // terminal: {
        //     color: false,
        //     showStack: false,
        //     verbosity: 2
        // },
        // teamcity: true,
        // tap: true
      }
    },
    dev: {
      // spec files
      specs: [
        "spec/**"
      ]
    }
  };


  return task;
};
