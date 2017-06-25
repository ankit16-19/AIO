angular
    .module('registercntrl1',[])
    .controller('registercontroller1',function($scope,$http,$timeout,$location,ionicToast,$ionicLoading,AUTH,AuthToken,PassData,$ionicTabsDelegate){
    //   $scope.result = false;
    // not showing tabs
    $ionicTabsDelegate.showBar(false);
      $scope.login = function(data){
          // Setup the loader
            $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
          console.log(data);
          //   sending data to register-2
          PassData.sendData(data);
          //ionicToast.show('sending request', 'bottom', false, 1500);
          AUTH.post('/api/hibi/login_test',data)
          .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response.data.result);
            if(response.data.result == "success"){

                ionicToast.show('Login sucessfull..redirecting', 'bottom', false, 1500);
                $timeout(function(){
                    console.log("redirecting....");
                    $ionicLoading.hide();
                    $location.path("/register-2");
                }, 1000);
            }else{
                $ionicLoading.hide();
                ionicToast.show('Login failed try again', 'bottom', false, 2000);
            }
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $ionicLoading.hide();
            ionicToast.show('Login failed ; connection issue', 'bottom', false, 1500);
            console.log(response);
            console.log("error in connection with database");
          });
      }


});
