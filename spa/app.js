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
      otherwise({
        redirectTo: '/list'
      });
  }]);

cdApp.controller('ListController', ['$scope', 'searchService', function($scope, searchService) {
  searchService.getRecentCds(function(cds) {
    console.log(cds);
  });
     
}]);

cdApp.service('searchService', function() {
  
  var client = resilient();

  client.use(resilientConsul({
    // App service name (required)
    service: 'c24-search-service',
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