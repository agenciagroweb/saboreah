var app = angular.module('saboreah', [
    'core.routes',
    'ui.bootstrap',
    'pathgather.popeye',
    'ngAnimate'
]);

/*jshint esnext: true */
var GSTATIC = {
    HOST : "https://maps.googleapis.com/maps/api/staticmap?",
    KEY : "AIzaSyCM0KLxQhBdC92YGTY0E8wp3GlpyXCtpSc",
    ZOOM : "14",
    SIZE : "580x200",
    TYPE : "roadmap",
    SCALE : "2"
};

(function() {

    fetchData();

    function fetchData() {
        var initInjector = angular.injector(['ng']);
        var $http = initInjector.get("$http");

        return bootstrapApplication();
    }

    function bootstrapApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["saboreah"]);
        });
    }

}());


app.config([
    '$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    }
]);

app.run([
    '$rootScope',
    '$location',
    function ($rootScope, $location) {

        $rootScope.path = $location.path();
        $rootScope._ = _;

        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.path = $location.path();
        });
    }
]);

window.app.Session = {};

window.app.Session.invoice = {
    total : 0.00,
    items : []
};