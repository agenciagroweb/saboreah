app.controller('home.controller', [
    '$scope',
    '$location',
    '$routeParams',
    '$route',
    '$timeout',
    '$filter',
    '$window',
    '$http', 'Popeye', function($scope, $location, $routeParams, $route, $timeout, $filter, $window, $http, Popeye) {

        console.log("Home");

        var base = angular.element("#home");

        $scope.cart = {

            size : 0,
            product : [
                {
                    value  : 0.00,
                    amount : 0
                },
                {
                    value  : 0.00,
                    amount : 0
                },
                {
                    value  : 0.00,
                    amount : 0
                },
                {
                    value  : 0.00,
                    amount : 0
                },
                {
                    value  : 0.00,
                    amount : 0
                },
                {
                    value  : 0.00,
                    amount : 0
                }
            ],

            box : function(size) {

                angular.element("input[type='radio']").removeAttr('checked');

                this.product = [
                    {
                        value  : 0.00,
                        amount : 0
                    },
                    {
                        value  : 0.00,
                        amount : 0
                    },
                    {
                        value  : 0.00,
                        amount : 0
                    },
                    {
                        value  : 0.00,
                        amount : 0
                    },
                    {
                        value  : 0.00,
                        amount : 0
                    },
                    {
                        value  : 0.00,
                        amount : 0
                    }
                ];

                this.size = size;

                angular.element(".box-3").removeClass("selected");
                angular.element(".box-5").removeClass("selected");
                angular.element(".box-10").removeClass("selected");

                switch (size) {

                    case 3 :
                        angular.element(".box-3").addClass("selected");
                        break;

                    case 5 :
                        angular.element(".box-5").addClass("selected");
                        break;

                    case 10 :
                        angular.element(".box-10").addClass("selected");
                        break;

                }

                angular.element(".select-product").removeClass("ng-hide");
                angular.element(".list-product").removeClass("ng-hide");
                angular.element(".action-box").removeClass("ng-hide");
            },

            amount : function(checkout) {

                var sum = 0;

                _.each(this.product, function(data) {
                    sum += parseInt(data.amount);
                });

                if (this.size === 0) {
                    $scope.alerts.box();
                    return false;
                }

                if (sum > this.size) {
                    $scope.alerts.amount();
                    return false;
                }

                if (checkout === true && (sum < this.size)) {
                    $scope.alerts.empty();
                    return false;
                }

                return true;
            },

            submit : function() {

                if ( ! this.amount(true)) {
                    $scope.alerts.empty();
                    return false;
                }

                var item = {
                    size : $scope.cart.size,
                    products : $scope.cart.product,
                    total : 0.00
                };

                window.app.Session.invoice.items.push(item);

                this.reset();
            },

            reset : function() {

                angular.element("input[type='radio']").removeAttr('checked');

                this.size = 0;
                this.product = [
                    {
                        value  : 0.00,
                        amount : 0
                    },
                    {
                        value  : 0.00,
                        amount : 0
                    },
                    {
                        value  : 0.00,
                        amount : 0
                    },
                    {
                        value  : 0.00,
                        amount : 0
                    },
                    {
                        value  : 0.00,
                        amount : 0
                    },
                    {
                        value  : 0.00,
                        amount : 0
                    }
                ];

                angular.element(".box-3").removeClass("selected");
                angular.element(".box-5").removeClass("selected");
                angular.element(".box-10").removeClass("selected");

                angular.element(".select-product").addClass("ng-hide");
                angular.element(".list-product").addClass("ng-hide");
                angular.element(".action-box").addClass("ng-hide");

                $window.scrollTo(0, 0);
            }
        };

        $scope.banners = [
            {
                "title" : "Banner Produtos",
                "url" : "assets/images/banner-1.jpg"
            },
            {
                "title" : "Banner Produtos",
                "url" : "assets/images/banner-1.jpg"
            }
        ];

        $scope.carousel = {

            banner : function() {

                $("#owl-banner").owlCarousel({
                    nav : true,
                    items : 1,
                    autoPlay: 5000,
                    stopOnHover: true,
                    singleItem: true
                });
            }
        };

        $scope.alerts = {

            box : function() {
                Popeye.openModal({
                    templateUrl: "views/alert/box.html",
                    controller: "alert.controller",
                    modalClass: "alert-modal"
                });
            },

            empty : function() {
                Popeye.openModal({
                    templateUrl: "views/alert/empty.html",
                    controller: "alert.controller",
                    modalClass: "alert-modal"
                });
            },

            amount : function() {
                Popeye.openModal({
                    templateUrl: "views/alert/amount.html",
                    controller: "alert.controller",
                    modalClass: "alert-modal"
                });
            }
        };

        setTimeout(function(){
            $scope.carousel.banner();
        }, 200);

    }]);
