(function () {

    'use strict';

    angular.module('portalApp')
        .controller('InfoController', ['$scope', '$log', 'player', '$state', InfoController]);

    function InfoController($scope, $log, player, $state) {

        setTimeout(function () {

            $(".slider-container").ikSlider({
                speed: 1000
            });

            function changeActivePreview(i) {
                $('.active').removeClass('active');
            }

            $('.slider-container').on('changeSlide.ikSlider', function (e) {
                changeActivePreview(e.currentSlide);
            });

            changeActivePreview(0);

            document.body.scrollTop = document.documentElement.scrollTop = 0;

        }, 0);


        $scope.player = player;

        $scope.images = [];

        $scope.playStatus = false;

        $scope.play = function () {
            $scope.playStatus = !$scope.playStatus;
            if ($scope.playStatus) {
                $('#voice')[0].play();
            } else {
                $('#voice')[0].pause();
            }
        };

        angular.fromJson($scope.player.images).forEach(function (item, index) {
            $scope.images.push({url: item, id: index + 1});
        });
    }
})();