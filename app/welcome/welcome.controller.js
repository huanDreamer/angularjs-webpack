(function () {

    'use strict';

    angular.module('portalApp')
        .controller('WelcomeController', ['$scope', WelcomeController]);

    function WelcomeController($scope) {

        $scope.title = "welcome";
    }
})();