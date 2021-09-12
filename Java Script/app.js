const app = angular.module("TechGaming",['ngRoute']);



// Routing Part
TechGaming.config(function($routeProvider,$locationProvider){
    $routeProvider
    .when("/", {
        templateUrl : "Views/Home.html"
    })
    .when("/BlackJack", {
        templateUrl : "Views/BlackJack.html",
        controller : "BlackJackController"
    })
    .when("/RockPaperSeasor", {
        templateUrl : "Views/RockPaperSeasor.html"
    })
    .otherwise({
        templateUrl : "Views/Error404.html",
    });

    // $locationProvider.html5Mode({
    //     enabled:true
    // });
});