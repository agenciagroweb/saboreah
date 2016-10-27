app.controller('alert.controller', [
    '$scope',
    '$location',
    '$routeParams',
    '$route',
    '$timeout',
    '$filter',
    '$window',
    '$http',
    'Popeye', function($scope, $location, $routeParams, $route, $timeout, $filter, $window, $http, Popeye) {

    console.log("Share");

    $scope.share = {

        close : function() {
            Popeye.closeCurrentModal();
        }
    };

}]);
