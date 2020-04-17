(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController)
.filter('loves',LovesFilter)
//registration of filter
.filter('truth',TruthFilter);
//we will use it in html therefore not required to inject in msg controller.
MsgController.$inject = ['$scope','lovesFilter']; // loves is defined in LovesFilter
                                                  // Filter is appended by AngularJS for us
function MsgController($scope,lovesFilter) {
  $scope.name = "Yaakov";
  $scope.stateOfBeing = "hungry";
  $scope.sayMessage = function () {
    var  msg = "Yaakov likes to eat healthy snacks at night!";
    return msg;
  };
  //use of filters
  $scope.sayLovesMessage = function () {
    var msg = "Yaakov likes to eat healthy snacks at night!";
    msg = lovesFilter(msg)
    return msg;
  };
  $scope.feedYaakov = function () {
    $scope.stateOfBeing = "fed";
  };
}
// user defined filter
function  LovesFilter(){
  return function(input){
    input = input || "";
    input = input.replace("likes","loves");
    return input;
  };
}

//custom filter with additional argument
function TruthFilter(){
  return function(input , target , replace){
    input = input || "";
    input = input.replace(target,replace);
    return input;
  }
}
})();
