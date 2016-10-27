angular.module('core.routes', ['ngRoute']).config([
    '$routeProvider',
    '$compileProvider',
    '$locationProvider', function($routeProvider, $compileProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider

        .when('/', {
            templateUrl : 'views/home/home.html',
            controller  : 'home.controller'
        })

        .when('/comprar', {
            templateUrl : 'views/home/home.html',
            controller  : 'home.controller'
        })

        .when('/como-comprar', {
            templateUrl : 'views/comprar/comprar.html',
            controller  : 'comprar.controller'
        })

        .when('/entrega-gratuita', {
            templateUrl : 'views/entrega/entrega.html',
            controller  : 'entrega.controller'
        })

        .when('/localizacao', {
            templateUrl : 'views/localizacao/localizacao.html',
            controller  : 'localizacao.controller'
        })

        .when('/contato', {
            templateUrl : 'views/contato/contato.html',
            controller  : 'contato.controller'
        })

        .otherwise({ redirectTo: '/' });

}]);
