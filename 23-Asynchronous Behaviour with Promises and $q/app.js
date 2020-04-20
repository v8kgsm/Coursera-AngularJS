
(function () {
'use strict';

angular.module('ShoppingListPromiseApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.service('WeightLossFilterService', WeightLossFilterService);

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
  var list = this;

  list.items = ShoppingListService.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    ShoppingListService.addItem(list.itemName, list.itemQuantity);
  };

  list.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}


ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
function ShoppingListService($q, WeightLossFilterService) {
  var service = this;

// the steps 1 , 2, and 3 differ with respect to time taken for execution asynchronously

  // List of shopping items
  var items = [];
// 1
// threads for both conditions wait until the execution of first is done to process the other one in queue
  // service.addItem = function (name, quantity) {
  //   var promise = WeightLossFilterService.checkName(name);
  //
  //   promise.then(function (response) {
  //     var nextPromise = WeightLossFilterService.checkQuantity(quantity);
  //
  //     nextPromise.then(function (result) {
  //       var item = {
  //         name: name,
  //         quantity: quantity
  //       };
  //       items.push(item);
  //     }, function (errorResponse) {
  //       console.log(errorResponse.message);
  //     });
  //   }, function (errorResponse) {
  //     console.log(errorResponse.message);
  //   });
  // };

//2
// different way of initializing with same(1) way of thread async.
  // service.addItem = function (name, quantity) {
  //   var promise = WeightLossFilterService.checkName(name);
  //
  //   promise
  //   .then(function (response) {
  //     return WeightLossFilterService.checkQuantity(quantity);
  //   })
  //   .then(function (response) {
  //     var item = {
  //       name: name,
  //       quantity: quantity
  //     };
  //     items.push(item);
  //   })
  //   .catch(function (errorResponse) {
  //     console.log(errorResponse.message);
  //   });
  // };

//3
// the threads for both conditions works independently not wait for other one to complete.
  service.addItem = function (name, quantity) {
    var namePromise = WeightLossFilterService.checkName(name);
    var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

    $q.all([namePromise, quantityPromise]).
    then(function (response) {
      var item = {
        name: name,
        quantity: quantity
      };
      items.push(item);
    })
    .catch(function (errorResponse) {
      console.log(errorResponse.message);
    });
  };

// Functions

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q, $timeout) {
  var service = this;

  service.checkName = function (name) {
    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for cookies
      if (name.toLowerCase().indexOf('cookie') === -1) {
        deferred.resolve(result)
      }
      else {
        result.message = "Stay away from cookies, Yaakov!";
        deferred.reject(result);
      }
    }, 3000);

    return deferred.promise;
  };


  service.checkQuantity = function (quantity) {
    var deferred = $q.defer();
    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for too many boxes
      if (quantity < 6) {
        deferred.resolve(result);
      }
      else {
        result.message = "That's too much, Yaakov!";
        deferred.reject(result);
      }
    }, 1000);

    return deferred.promise;
  };
}

})();
