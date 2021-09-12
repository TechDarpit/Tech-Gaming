const TechGaming = angular.module("TechGaming", ['ngRoute']);

// Routing Part
TechGaming.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "Views/Home.html"
        })
        .when("/BlackJack", {
            templateUrl: "Views/BlackJack.html",
            controller: "BlackJackController"
        })
        .when("/RockPaperSeasor", {
            templateUrl: "Views/RockPaperSeasor.html"
        })
        .otherwise({
            templateUrl: "Views/Home.html",
        });

    $locationProvider.html5Mode({
        enabled: true
    });
});