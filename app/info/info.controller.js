(function () {

    'use strict';

    angular.module('portalApp')
        .controller('InfoController', ['$scope', '$log', 'player', '$state', InfoController]);

    function InfoController($scope, $log, player, $state) {

        $scope.teams = [
            {id: '1', name: '金州勇士', img: '../../plubic'},
            {id: '2', name: '凯尔特人', img: '../../plubic'},
            {id: '3', name: '克利夫兰骑士', img: '../../plubic'},
            {id: '4', name: '雷霆', img: '../../plubic'},
            {id: '5', name: '洛杉矶 湖人', img: '../../plubic'},
            {id: '6', name: '圣安东尼奥马刺', img: '../../plubic'},
            {id: '7', name: '休斯顿火箭队', img: '../../plubic'},
            {id: '8', name: '芝加哥公牛', img: '../../plubic'},
        ];

        $scope.player = player;

        $scope.images = [];

        angular.fromJson($scope.player.images).forEach(function (item, index) {
            $scope.images.push({url: item, id: index + 1});
        });

        $scope.playStatus = false;

        $scope.play = function () {
            $scope.playStatus = !$scope.playStatus;
            if ($scope.playStatus) {
                $('#voice')[0].play();
            } else {
                $('#voice')[0].pause();
            }
        };
    }
})();