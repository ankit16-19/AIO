// public/js/approutes.js
angular
 .module('routes', ['uiRouterStyles'])
 .config(function($stateProvider, $urlRouterProvider,$locationProvider){
   $stateProvider
   //home page
   .state('login',{
      url:'/login',
      templateUrl:'views/login/login.html',
      controller:'logincontroller',
      data:{
         css:'views/login/login.style.css'
      },
      authenticationRq : false
   })
   .state('register-1',{
      url:'/register-1',
     templateUrl:'views/register/register-1.html',
     controller:'registercontroller1',
     data:{
        css:'views/register/register.style.css'
     },
     authenticationRq:false
   })
   .state('register-2',{
      url:'/register-2',
     templateUrl:'views/register/register-2.html',
     controller:'registercontroller2',
     data:{
        css:'views/register/register.style.css'
     },
     authenticationRq:false
   })
   .state('home',{
     url:'/home',
     templateUrl:'views/home/home.html',
     controller:'homecontroller',
     data:{
        css:'views/home/home.style.css'
     },
     authenticationRq:true
   })
    .state('data',{
     url:'/data',
     templateUrl:'views/notice_data/notice_data.html',
     controller:'notice_datacontroller',
     data:{
        css:'views/notice_data/notice_data.style.css'
     },
     authenticationRq:true
   })
   .state('404',{
     url:'/404',
     templateUrl:'views/404.html',
    //  controller:'homecontroller',
    //  data:{
    //     css:'views/home/home.style.css'
    //  },

   })
   .state('forgetPass',{
      url:'/forgetPass',
      templateUrl:'views/forgetPass/forgetPass.html',
      controller:'forgetPasscontroller',
      data:{
         css:'views/forgetPass/forgetPass.style.css'
      },
      authenticated:false
    })






   $urlRouterProvider.otherwise('/login');

      // todo remove the hash "#" from the Url and make it refresh able
      // $locationProvider.html5Mode({
      //    'enabled':false,
      //    'requiredBase':false
      // });

})
