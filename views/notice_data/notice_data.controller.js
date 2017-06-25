angular
  .module('notice_datacntrl',[])
  .controller('notice_datacontroller',function($scope,$location,$ionicLoading,PassData,Authhibi){
   	$scope.show = false;
  	// getting if from the home controller using PassData service
  	var get_data  = JSON.parse(PassData.getDataSave("notice_data"))
    
    console.log(get_data);
    $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
    });
    Authhibi.post('/notice_data',get_data)
     .then(function successCallback(response){
      $ionicLoading.hide();
      console.log("making request");
      console.log(response.data);
      $scope.notice_data = response.data.Notices[0].notice_data
      $scope.notice = get_data
      $scope.show = true;
      // if success
    },function errorCallback(response){
      // if error
      console.log(response)
      $ionicLoading.hide();
    })


      
  })