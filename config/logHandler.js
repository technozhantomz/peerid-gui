/* eslint-disable jsdoc/require-jsdoc */
import {Config} from '../src/utility';

(function takeOverConsole(){
  var console = window.console;

  if (!console) {
    return;
  }

  function intercept(method){
    var original = console[method];

    console[method] = function(){
      // do sneaky stuff
      if (original.apply && Config.isDev){
        // alert('thing');
        // Do this for normal browsers
        original.apply(console, arguments);
      }
      // else{
      //   // Do this for IE
      //   var message = Array.prototype.slice.apply(arguments).join(' ');
      //   original(message);
      // }
    };
  }

  var methods = ['log', 'warn', 'error', 'info'];

  for (var i = 0; i < methods.length; i++) {
    intercept(methods[i]);
  }
})();