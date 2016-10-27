app.directive(
    "footerView",
    function() {

        return({
            controller: "footer.controller",
            restrict: "AE",
            replace: true,
            templateUrl: "views/footer/footer.html"
        });

    }
);
