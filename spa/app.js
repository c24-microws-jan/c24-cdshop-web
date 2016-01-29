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

cdApp.controller('ListController', ['$scope', 'searchService', 'cartService', function($scope, searchService, cartService) {
  $scope.cds = [];

  searchService.getRecentCds(function(cds) {
    $scope.cds = cds;
    $scope.$apply();
  });

}]);

cdApp.controller('CheckoutController', ['$scope', function($scope) {
  $scope.cds = [{"id":1,"title":"Mock Title1","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":2,"title":"Mock Title2","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":3,"title":"Mock Title3","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":4,"title":"Mock Title4","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}}];
  $scope.submitOrder = function() {
    
  };
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

cdApp.service('searchService', function() {
  
  var client = createService('c24-search-service')

  return {
    getRecentCds: getRecentCds 
  };

  function getRecentCds(callback) {

    return client.get('/cd', function(err, res) {
      
      //console.log(res);
      //console.log(err);
      callback(res.data);      
    });
  }
});

cdApp.service('cartService', function() {
  
  var client = createService('c24-cdshop-cart')

  return {
    createCartId: createCartId,
    addToCart: addToCart
  };


  function addToCart(cartId, productId, done, error) {
    return client.post('/shoppingcarts/' + cartId + '/products/'+ productId, function(err, res) {
       if (res) {
        done();
       }
       if (err) {
        error();
       }
    });    
  }

  function createCartId(callback) {

    return client.put('/shoppingcarts', function(err, res) {
      
      console.log(res);
      //console.log(err);
      callback(res.data.id);      
    });
  }
});

cdApp.service('checkoutService', function() {
  
  var client = createService('c24-order-service')

  return {
    createOrder: createOrder,
    getOrderDetails: getOrderDetails,
    getAllOrders: getAllOrders
  };


  function createOrder(done, error) {
    return client.post('/', function(err, res) {
       if (res) {
        done();
       }
       if (err) {
        error();
       }
    });    
  }

  function getOrderDetails(id, done, error) {

    return client.get('/' + id, function(err, res) {
      if (res) {
        done();
       }
       if (err) {
        error();
       }      
    });
  }

  function getAllOrders(done, error) {

    return client.get('/', function(err, res) {
      if (res) {
        done();
       }
       if (err) {
        error();
       }      
    });
  }
});

function createService(serviceName) {
    var client = resilient();

    client.use(resilientConsul({
      // App service name (required)
      service: serviceName,
      // Service name for self discovery (optional)
      //discoveryService: 'consul',
      // Use a custom datacenter (optional)
      //datacenter: 'ams2',
      // Use a custom service tag (optional)
      /*tag: '1.0',*/
      // Consul servers pool
      servers: [
        'http://46.101.245.190:8500',
        'http://46.101.132.55:8500',
        'http://46.101.193.82:8500',
      ],
      // Use Consul's health check endpoint instead of the catalog
      // to retrieve only services with passing health checks (optional)
      onlyHealthy: true,
      // Use a custom mapping function (optional)
      mapServers: function (list) {
        // here you can filter/map the services retrieved from Consul
        // to a list of addresses according to custom logic (optional)

        var lst = list.map(function (svc) { return "http://" + svc.Service.Address + ":" + svc.Service.Port });
        //console.log(lst);
        return lst;
      }
    }));
  
    return client;
}