angular
  .module('registercntrl2',[])
  .controller('registercontroller2',function($scope,AUTH,PassData,ionicToast,$timeout,$location,$window){
        $scope.available = false;
        $scope.idused = false;
        // check if the hibiuid is alredy used
        // var register1data = PassData.getData()
        $scope.check = function(){
          console.log(PassData.getData() + ":no Data from register-1");
          AUTH.post('/api/AIO/user/hibiIdExist',PassData.getData())
          .then(function successCallback(response){
            // if id exist
            if(response.data.success){
              $scope.idused = true;
            }
          }), function errorCallback(response){
            console.log(response);
          }
        }

        // chek if the user is logged in
        if(AUTH.isLoggedIn()){
          console.log('users is logged-in');
        }
        // if the user is not logged in
        else{
          console.log('user is not logged-in ');
        }

        // checking if password and confirm passwrd match
        $scope.confirm = function(pass1,pass2){
          if(pass1 != pass2)
          {
            return true;
          }else{
            return false;
          }
        }


        $scope.register = function(data){
          var newData = PassData.newData(data);
          // // saving the new data in loval storage
          // $window.localStorage.setItem('data',newData);
          // calling register api
          AUTH.post('/api/AIO/user/register',newData)
          .then(function successCallback(response){
              console.log(response.data);
              // if user with alredy exists
              if(response.data.message == "user alredy exist"){
                $scope.available = true;
              }
              else{
                console.log('user created succsfully');
                ionicToast.show('Registeration successfull','bottom',false,1000);
                $timeout(function(){
                  $location.path("/home")
                },1000)
              }
          }), function errorCallback(response){
            console.log(response);
          }

        }



  });
