// Declare app level module which depends on views, and components
angular.module('Unrest', [])
.controller('appController', function($scope, $http){
  $scope.hosts={};

  var activeRequest=false;
  update=function(){
    if(!activeRequest){
      activeRequest=true;
      $http.get('/api/getHosts')
      .success(function(data){
        activeRequest=false;
        $scope.hosts=data;
        setTimeout(update(),1000); 
      })
      .error(function(){
        activeRequest=false;
        setTimeout(update(),1000); 
      });
    }
  }
  update( );

  $scope.submit=function(){
    $http.post('/api/addHost', {host: $scope.host})
    .error(function(){
      $scope.submit(); 
    });
    $scope.host="";
  }
});