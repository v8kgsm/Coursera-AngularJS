(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', function ($scope) {
  $scope.name = "Vikas";
  $scope.sayHello = function(){
    return "Hello Coursera";
  }

});

})();
