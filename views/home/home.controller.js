angular
  .module('homecntrl',[])
  .controller('homecontroller',function($scope,$window,AUTH,ionicToast,$ionicLoading,$timeout,$location,Authhibi){

    // saving the token in localStorage
    AUTH.post('/api/AIO/user/me')// /api/AIO/user/me geta of the user specified in token
    .then(function(response){
      // saving data to the local storage
      $window.localStorage.setItem('data',JSON.stringify(response.data));
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

      $scope.hibi = function(path,data={}){
        $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
        });
        Authhibi.post(path,data)
         .then(function successCallback(response){
          $ionicLoading.hide();
          console.log("making request");
          console.log(response.data.Notices);
          $scope.api_data = response.data.Notices

          // if success
        },function errorCallback(response){
          // if error
        })
      }
  })
