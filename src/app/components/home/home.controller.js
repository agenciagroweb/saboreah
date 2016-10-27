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

        range : function(count){
            return Array.apply(0, Array(+count));
        },

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

            $scope.cart.size = size;

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
                    amount : null
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

$(document).ready(function(){

    var $slider = $('input[type=range]');
    var max = parseInt($slider.attr('max'));
    var lastChangeHandled;

    function convertTouchXToFraction(touchX) {
        //Figure out where it will be on the slider
        var sliderOffset = $slider.offset();
        var normalizedX = touchX - sliderOffset.left;
        return normalizedX / $slider.width();
    }

    function changeHandler(event) {
        var value = $slider.val();
        if (lastChangeHandled !== value) {
            lastChangeHandled = value;
            console.log(value);
            var frac = value / max;
            var rangeWidth = (frac * 100) + "%";
            $('.range-fill').css({"width": rangeWidth, "min-width": "3%", "max-width": "98%"});
            $slider.hide().show(0);
        }
    }
    var lastSnap;

    function setLastSnap() {
        lastSnap = (new Date()).getTime();
    }

    setLastSnap();

    var touchRegexp = /^touch/;

    function syncValToXCreator(snap) {
        return function(event) {
            var epoch = (new Date()).getTime();
            var timeDiff = epoch - lastSnap;
            // We don't handle any move events for THIS NUMBER of milliseconds after a snap.
            // This is required because on iPad you get:
            //  touchEnd -> 300ms delay -> mouseMove
            var throttleMs = 400;
            if (timeDiff > throttleMs &&
                (event.which === 1 || touchRegexp.test(event.type))) {

                var touchX = event.originalEvent.clientX || event.originalEvent.changedTouches[0].clientX;
                var frac = convertTouchXToFraction(touchX);
                var inputValue;

                inputValue = frac * max;
                if (snap) {
                    inputValue = Math.round(inputValue);
                    setLastSnap();
                    $slider.trigger("shp.snap", [inputValue]);
                }

                $slider.val(inputValue);
                // jQuery does not trigger change for non-user interactions.
                changeHandler(event);
            }
        };
    }
    $slider.on("shp.snap", function(event, value){
        $(".label").css("color", "grey");
        $(".label:nth-child(" + (value + 1) + ")").css("color", "#f36f21");
    });

    // Snap to closest value
    $slider.on("touchend mouseup click", syncValToXCreator("snap"));
    $(".label").on("touchend mouseup click", syncValToXCreator("snap"));

    // Modify range-fill as ball move.
    $slider.on("touchmove mousemove click", syncValToXCreator());
    $(".label").on("touchend mouseup click", syncValToXCreator("snap"));
});