(function () {
'use strict';

angular.module('CounterApp', [])
.controller('CounterController', CounterController);

CounterController.$inject = ['$scope'];
function CounterController($scope) {
  $scope.counter = 0;

  $scope.upCounter = function(){
    setTimeout(function(){
      $scope.$apply(function(){
        $scope.counter++;
        console.log("Counter Incremented!");
      });
    },2000);//2ms i.e. 2 seconds
  };

  //1
  // $scope.upCounter = function(){
  //   setTimeout(function(){
  //     $scope.counter++;
  //     console.log("Counter Incremented!");
  //     $scope.digest(); // notify about kicking off
  //   },2000);//2ms i.e. 2 seconds
  // };
}
})();
