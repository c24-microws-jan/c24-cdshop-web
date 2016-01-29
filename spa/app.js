'use strict';

var cdApp = angular.module('cdapp', [
  'ngRoute'
  ]);
  
cdApp .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/list', {
        templateUrl: 'templates/list.html',
        controller: 'ListController'
      }).
      when('/product/:record', {
        templateUrl: 'templates/product.html',
        controller: 'ProductController'
      }).      
      when('/cart', {
        templateUrl: 'templates/cart.html',
        controller: 'CartController'
      }).      
      when('/checkout', {
        templateUrl: 'templates/checkout.html',
        controller: 'CheckoutController'
      }).
      otherwise({
        redirectTo: '/list'
      });
  }]);

cdApp.controller('ListController', ['$scope', function($scope) {
  $scope.cds = [{"id":1,"title":"Mock Title1","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":2,"title":"Mock Title2","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":3,"title":"Mock Title3","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":4,"title":"Mock Title4","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}}];
}]);

cdApp.controller('CheckoutController', ['$scope', function($scope) {
  $scope.cds = [{"id":1,"title":"Mock Title1","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":2,"title":"Mock Title2","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":3,"title":"Mock Title3","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":4,"title":"Mock Title4","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}}];
}]);

cdApp.controller('CartController', ['$scope', function($scope) {
  $scope.removeItem = removeItem;
  $scope.cds = [{"id":1,"title":"Mock Title1","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":2,"title":"Mock Title2","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":3,"title":"Mock Title3","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":4,"title":"Mock Title4","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}}];

  function removeItem(cd) {
    var index =  $scope.cds.indexOf(cd);
    if (index > -1) {
      $scope.cds.splice(index, 1);
    }
  }

}]);

cdApp.controller('ProductController', ['$scope', function($scope) {
  $scope.cd = {"id":"1","title":"Mock Title","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}};
}]);