angular
  .module('homecntrl',[])
  .controller('homecontroller',function($scope,$window,AUTH,ionicToast,$timeout,$location,Authhibi){

    // saving the token in localStorage
    AUTH.post('/api/AIO/user/me')// /api/AIO/user/me geta of the user specified in token
    .then(function(response){
      // saving to the scope
      $scope.data = response.data;
    })

    $scope.logout = function(){
      AUTH.logout();
      $window.localStorage.removeItem('data');
      ionicToast.show('loggin out ','bottom',false,1000);
      $timeout(function(){
        $location.path('/login');
      },1000)

      }

      $scope.hibi = function(path,data){
        Authhibi.post(path,data)
         .then(function successCallback(response){
          console.log("making request");
          console.log(response);
          // if success
        },function errorCallback(response){
          // if error
        })
      }
  })
