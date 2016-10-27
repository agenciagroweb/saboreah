app.controller('share.controller', [
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

    var base = angular.element(".share-options");

    $scope.share = {

        close : function() {
            Popeye.closeCurrentModal();
        }
    };

}]);

