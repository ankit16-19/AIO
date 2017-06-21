angular
  .module('services',[])
    // factory for http post
  .factory('AUTH',function($http,AuthToken){
    var authFactory = {}; //empty authFactory object

    //authentication
    authFactory.post = function(path , data = {}){
      console.log(data);
      return $http.post('http://localhost:3001' + path,data);
    }
    // cheking if user is logged in
    authFactory.isLoggedIn = function(){
      // if logged in
      if(AuthToken.getToken()){
        // return true
        return true;
      }
      // is not logged in
      else{
        // return false
          return false;
      }
    }
    // destring token if usser logs out
    authFactory.logout = function(){
      return AuthToken.setToken();
    }

    return authFactory;

  })
  //factory for Tokens
  .factory('AuthToken',function($window){
    var authtokenFactory = {};

    // set the token in localstorage
    authtokenFactory.setToken = function(token){
      // if token is provided
      if(token){
        return $window.localStorage.setItem('token',token);
      }
      // if no token
      else {
        return  $window.localStorage.removeItem('token');
      }

    }
    // get the value of token from localstorage
    authtokenFactory.getToken = function(){
        return $window.localStorage.getItem('token');
    }

    return authtokenFactory;
  })

  // passing data from register-1 to register-2
  .factory('PassData',function(){
    var passdataFactory = {};

    // varibale to save the data
    var hibidata
    // getting data from register-1
    passdataFactory.sendData = function(data){
      hibidata = data;
    }
    passdataFactory.getData = function(){
      return hibidata;
    }
    passdataFactory.newData = function(data){
      data.uid = hibidata.uid;
      data.pass = hibidata.pwd;
      return data;
    }
    return passdataFactory;
  })

  // factory for hibi uid and pass
  .factory('Authhibi',function(AUTH,$http){
    var AuthhibiFactory = {};

      AuthhibiFactory.post =  function(path,data){
        AUTH.post('/api/AIO/user/hibipass')
        .then(function successCallback(response){
          // do something when success
          console.log("success the password is:" +  response)
          return $http.post('http://localhost:3001/api/hibi' + path,data);

        }, function errorCallback(response){
          // do something when errorCallback //adasdasdfdf
          return "error in processing the request"

        })
        return $http.post('http://localhost:3001/api/AIO/user/hibipass')

      }
    return AuthhibiFactory
  })

  //Authintercepter
  .factory('AuthInterceptor',function(AuthToken){
    var AuthInterceptorFactory = {};

    // Editing the config file to ass token in header
    AuthInterceptorFactory.request = function(config){
      // getting the value of token
      var token = AuthToken.getToken()
      // if token exists
      if(token){
        config.headers['x-access-token'] = token;
      }
      return config;
    }

    return AuthInterceptorFactory
  })
