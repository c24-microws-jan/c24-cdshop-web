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

  searchService.getRecentCds().then(function(cds) {
    $scope.cds = cds;
  });
}]);

cdApp.controller('CheckoutController', ['$scope', 'checkoutService', function($scope, checkoutService) {
  $scope.cds = [{"id":1,"title":"Mock Title1","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":2,"title":"Mock Title2","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":3,"title":"Mock Title3","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}},{"id":4,"title":"Mock Title4","artist":"Mock Artist","cover":{"small":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-250.jpg","large":"http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842-500.jpg"}}];
  $scope.totalPrice = 0;
  var totalPrice = 0;
  $scope.cds.forEach(function(cd) {
    totalPrice += 30;
  }); 
  $scope.totalPrice = totalPrice;
  $scope.totalProducts = $scope.cds.length;

  $scope.submitOrder = function() {
      checkoutService.createOrder($scope.cds).then(function(id) { $scope.orderId = id; });
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

cdApp.service('searchService', ['$q', function($q) {
  
  var client = createService('c24-search-service')

  return {
    getRecentCds: getRecentCds 
  };

  function getRecentCds() {
    var deferred = $q.defer();

    client.get('/cd', function(err, res) {
      if(err) {
        deferred.reject(err);
      }
      deferred.resolve(res.data);      
    });

    return deferred.promise;
  }
}]);

cdApp.service('cartService', ['$q', function($q) {
  
  var client = createService('c24-cdshop-cart')

  return {
    createCartId: createCartId,
    addToCart: addToCart
  };

  function addToCart(cartId, productId) {
    var deferred = $q.defer();
    client.post('/shoppingcarts/' + cartId + '/products/'+ productId, function(err, res) {
       if (res) {
        deferred.resolve(res);
       }
       if (err) {
        deferred.reject(err);
       }
    });    
    return deferred.promise;
  }

  function createCartId() {
    var deferred = $q.defer();
    client.put('/shoppingcarts', function(err, res) {
      if (res) {
        deferred.resolve(res.data.id);
      }
      if (err) {
        deferred.reject(err);
      } 
    });
    return deferred.promise;
  }
}]);

cdApp.service('checkoutService', ['$q', function($q) {
  
  var client = createService('c24-order-service')

  return {
    createOrder: createOrder,
    getOrderDetails: getOrderDetails,
    getAllOrders: getAllOrders
  };

  function createOrder(cds) {
    var deferred = $q.defer();
    client.post('/', { data: cds }, function(err, res) {
      if (res) {
        console.log(res);
        deferred.resolve(res.data);
      }
      if (err) {
        deferred.reject(err);
      } 
    }); 
    return deferred.promise;   
  }

  function getOrderDetails(id) {
    var deferred = $q.defer();
    client.get('/' + id, function(err, res) {
      if (res) {
        deferred.resolve();
      }
      if (err) {
        deferred.reject(err);
      }   
    });
    return deferred.promise; 
  }

  function getAllOrders() {
    var deferred = $q.defer();
    client.get('/', function(err, res) {
      if (res) {
        deferred.resolve();
      }
      if (err) {
        deferred.reject(err);
      }        
    });
    return deferred.promise;
  }
}]);

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