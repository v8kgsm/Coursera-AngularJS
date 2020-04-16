// (function () {
// 'use strict';
//
// angular.module('DIApp', [])
// .controller('DIController', DIController);
//
// function DIController ($scope,
//                        $filter,
//                        $injector) {
//   $scope.name = "Vikas";
//
//   $scope.upper = function () {
//     var upCase = $filter('uppercase');
//     $scope.name = upCase($scope.name);
//   };
//
//   console.log($injector.annotate(DIController));
// }
//
// function AnnonateMe(name, job, blah) {
//   return "Blah!";
// }
//
// console.log(DIController.toString());
// console.log(AnnonateMe());
// console.log(AnnonateMe);
// console.log(AnnonateMe.toString());
// })();
//magnified code
!function(){"use strict";function e(e,n){e.name="Yaakov",e.upper=function(){var o=n("uppercase");e.name=o(e.name)}}angular.module("DIApp",[]).controller("DIController",e),e.$inject=["$scope","$filter"]}();
