app.controller('localizacao.controller', [
    '$scope',
    '$location',
    '$routeParams',
    '$route',
    '$timeout',
    '$filter',
    '$window',
    '$http', function($scope, $location, $routeParams, $route, $timeout, $filter, $window, $http) {

    console.log("localizacao");

    var base = angular.element("#localizacao");

    $scope.maps = {

        pullCenter : function() {
            return "Rio de Janeiro, RJ";
        },

        source : function() {

            var $params = {
                'center' : this.pullCenter,
                'zoom' : GSTATIC.ZOOM,
                'size' : GSTATIC.SIZE,
                'maptype' : GSTATIC.TYPE,
                'key' : GSTATIC.KEY,
                'scale' : GSTATIC.SCALE
            };

            return  GSTATIC.HOST + $.param($params);
        }
    };

}]);
