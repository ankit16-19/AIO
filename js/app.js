angular
  .module('myapp',['ionic','ionic-toast','uiRouterStyles','routes','maincntrl','logincntrl','registercntrl1','registercntrl2','homecntrl','services','forgetPasscntrl'])
  .run(function($ionicPlatform,$rootScope,AUTH,$location,$window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  }); // $ionicPlatform --end
  $rootScope.$on("$stateChangeStart",function(event,tostate,toparam,fromstate,fromparam){
    console.log("Is user logged in:" + AUTH.isLoggedIn());
    console.log(tostate.url +":AuthenticationRq-->"+tostate.authenticationRq);
    if(tostate.authenticationRq == true){//autentication required
      console.log("Authentication is required to visit this page");
      $window.stop();
      if(!AUTH.isLoggedIn()){//if the user is not logged in
        $location.path("/404");//redirecting the user to 404
      }

    }else if (tostate.authenticationRq == false) {//authentication not required
      console.log("Authentication is not required to visit this page");
      if(AUTH.isLoggedIn()){//if the user is logged in
        $window.stop();
        console.log("redirecting");
        $location.path("/home");//if the user is logged in sending the user to the home page
      }
    }else{//authentication doesnt matter
      console.log("Authentication doesnt matter");
    }

  })



}) // .run -- end

  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor')
  })





  // $rootScope.$on("$stateChangeStart",function(event,toState,toParam,fromState,fromParam){
  //
  //   if(toState.url != '/login' && toState.url != '/register-1'){// not checking for login page and register-1 page
  //       // recording the last authenticated state
  //       var lastAuthenticatedState
  //       toState.authenticated == true? lastAuthenticatedState = toState.state: lastAuthenticatedState = ""
  //       console.log(lastAuthenticatedState);//lastAuthenticatedState name
  //       // check for the Authentication flag
  //       console.log("authentication:" + toState.authenticated);
  //       var authentication = toState.authenticated;
  //       if(authentication){// is true
  //           // check the authentication
  //           if(AUTH.isLoggedIn()){// if true
  //               // do something
  //               console.log("User is logged in do something");
  //           }else{// if not true : not looged in
  //               console.log("Not authenticated redirecting to the login page");
  //               $location.path('/login')
  //           }
  //       }else{//if authentication is false
  //           $location.path('/404')
  //           // when user goes one page back in historu
  //           // $location.path("/lastAuthenticatedState")// last valid page is in the varibale lastAuthenticatedState
  //       }
  //     }
  //     else{
  //       // do something when state changes to login page or register-1 page
  //     }
  //
  //
  // }) //$rootScope.$on --end
