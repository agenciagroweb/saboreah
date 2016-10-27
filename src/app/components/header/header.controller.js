app.controller('header.controller', [
    '$scope',
    '$rootScope',
    '$location',
    '$window',
    '$routeParams',
    '$route',
    '$filter', function($scope, $rootScope, $location, $window, $routeParams, $route, $filter) {

    console.log("Header");

    $scope.cart = {

        invoice : {
            total : 0.00,
            items : window.app.Session.invoice.items
        },

        status : false,

        open : function() {
            $scope.cart.status = true;
        },

        close : function() {
            $scope.cart.status = false;
        },

        submit : function() {

            console.log("Pagseguro");
        },

        reset : function() {
            window.app.Session.invoice = {
                total : 0.00,
                items : []
            };
        }
    };

    $scope.$watch(
        function () {

            var total = 0;

            _.each(window.app.Session.invoice.items, function(p) {

                var subtotal  = 0;

                _.each(p.products, function(data) {

                    var pval = 0;

                    if (data.amount !== 0) {
                        pval += (data.amount * 3);
                        subtotal += pval;
                    }

                    data.value = pval.toFixed(2);
                });

                p.total = subtotal.toFixed(2);
                total += subtotal;
            });

            window.app.Session.invoice.total = total.toFixed(2);
            $scope.cart.invoice.total = total.toFixed(2);

            return window.app.Session.invoice;

        }, function(n, o){
            $scope.cart.invoice.items = n.items;
            $scope.cart.invoice.total = n.total;
        }
    );

    $scope.functions = {

        real : function(int)
        {
            var tmp = int + '';
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");

            if (tmp.length > 6)
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

            return tmp;
        }

    };


    $(document).click(function() {

    });

    $('.cart-controller').click(function(){

    });

}]);