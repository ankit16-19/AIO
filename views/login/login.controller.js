angular
  .module('logincntrl',[])
  .controller('logincontroller',function($scope,$http,AUTH,AuthToken,$location,ionicToast,$window){
    $scope.login = function(data){
      console.log(data);
      AUTH.post('/api/AIO/user/login',data)
      .then(function successCallback(response){
        console.log("login credentails test :" + response.data.success);
        // if loggin successfull
        if(response.data.success){
          // setting token
          AuthToken.setToken(response.data.token)
          $location.path('/home')
        }
        // if login failed
        else{
          ionicToast.show('login failed','bottom',false,1000);
          $scope.result = true;
        }

      }, function errorCallback(response){
        console.log(response);
      });
  }



  })
