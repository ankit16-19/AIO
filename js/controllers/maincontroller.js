//  public/js/controllers/maincontroller.js
angular.module('maincntrl',[]).controller('maincontroller',function($scope,$ionicTabsDelegate){
$scope.test = 'This is a test to check all the controllers are working fine';
$ionicTabsDelegate.showBar(false);
})
