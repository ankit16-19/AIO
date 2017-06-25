angular
  .module('homecntrl',[])
  .controller('homecontroller',function($scope,$window,AUTH,ionicToast,$ionicLoading,$timeout,$location,Authhibi,PassData,$interval){
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
    // loading the data from local storage
    $scope.notice = JSON.parse(PassData.getDataSave('notice'))

    $scope.hibi = function(path,da={}){

        Authhibi.post(path,da)
         .then(function successCallback(response){
          console.log("making request");
          // saving the data to the local storage
          PassData.sendDataSave('notice',JSON.stringify(response.data.Notices))
          $scope.notice = response.data.Notices
          // if success
          $scope.$broadcast('scroll.refreshComplete'); 
        },function errorCallback(response){
          // if error
          $scope.$broadcast('scroll.refreshComplete'); 
        })
         // to stop the refresher 
        $scope.$broadcast('scroll.refreshComplete'); 
    }

    $scope.notice_data = function(notice_data){
      PassData.sendDataSave('notice_data',JSON.stringify(notice_data))
      $location.path("/data")
    }

    // making request at every ten seconds
    $interval(function(){
      $scope.hibi('/notice')
   }.bind(this), 180000);


  })
