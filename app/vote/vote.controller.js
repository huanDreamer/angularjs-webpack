(function () {

    'use strict';

    angular.module('portalApp')
        .controller('VoteController', ['$scope', '$log', 'VoteService', 'PlayerService', 'PrizeService', '$location', '$state', '$uibModal', 'players', VoteController]);

    function VoteController($scope, $log, VoteService, PlayerService, PrizeService, $location, $state, $uibModal, players) {

        // 初始化选手信息
        $scope.players = angular.copy(players);

        $scope.players2 = [];

        var all = $scope.players.length;
        for (var i = 0; i < all / 2; i++) {
            $scope.players2.push($scope.players[i]);
        }
        $scope.players.splice(0, Math.fround(all / 2));

        $scope.history = [];

        // 获取用户的投票记录
        VoteService.getHistory(
            {code: localStorage.code},
            function (response) {
                if (response.code === 0 && response.data) {
                    response.data.forEach(function (item) {
                        $scope.history.push(item);
                    })
                }
            });

        // 点击投票按钮
        $scope.vote = function (playerId, $event) {
            $event.stopPropagation();

            if ($scope.voted(playerId)) {
                return;
            }

            VoteService.vote(
                {playerId: playerId},
                localStorage.code,
                function success(response) {
                    if (response.data !== null) {
                        $scope.history.push(response.data);
                    }
                },
                function (error) {
                    alert("投票失败，请退出后重试");
                }
            )
        };

        $scope.voted = function (playerId) {
            return $scope.history.indexOf(playerId) >= 0;
        };


        /******************** 抽奖 *********************/

        $scope.hasPrized = false;

        var prizeHistory = localStorage.getItem("prize");
        if (prizeHistory && Number(prizeHistory) === new Date().getDate()) {
            $scope.hasPrized = true;
        }


        $scope.prize = {
            score: 0,
            running: false,
            awards: [
                {id: 0, name: "奖品0"},
                {id: 1, name: "奖品1"},
                {id: 2, name: "奖品2"},
                {id: 3, name: "谢谢"},
                {id: 4, name: "奖品4"},
                {id: 5, name: "奖品5"},
                {id: 6, name: "奖品6"},
                {id: 7, name: "奖品7"},
            ]
        };

        $scope.start = function () {
            if ($scope.prize.running === true) {
                return;
            }

            PrizeService.get(
                {
                    code: localStorage.getItem('code')
                }, function success(response) {
                    if (response.data) {
                        prize(response.data)
                    } else {
                        prize($scope.prize.awards[3]);
                    }

                }, function error(reason) {

                });

        };

        function prize(prize) {

            localStorage.setItem("prize", new Date().getDate());

            $scope.prize.running = true;

            var speed = 600;
            var count = 0;
            var myFunction = function () {

                if ($scope.prize.running === false) {

                    prizeFinish(prize);

                    return;
                }
                clearTimeout(timeout);

                count += 1;

                if (count < 40) {
                    if (speed > 100) {
                        speed -= 100;
                    } else if (speed > 50) {
                        speed -= 50;
                    }
                } else {
                    speed += 50;
                }


                $scope.prize.score += 1;
                $scope.prize.score = $scope.prize.score % 8;
                $scope.$apply();

                if (speed >= 400 && count > 40 && $scope.prize.score === prize.id) {
                    $scope.prize.running = false;
                    $scope.hasPrized = true;
                    $scope.$apply();
                }

                timeout = setTimeout(myFunction, speed);
            };
            var timeout = setTimeout(myFunction, speed);

        }

        var prizeFinish = function (prize) {
            if (prize.id === 3) {

                BootstrapDialog.alert({
                    title: '提示',
                    message: '谢谢参与，请明天再来。',
                    type: '',
                    closable: true,
                    draggable: true,
                    buttonLabel: '好的'
                });

            } else {

                $uibModal.open({
                    animation: true,
                    backdrop: false,
                    templateUrl: require('./user.info.html'),
                    controller: 'UserInfoController',
                    resolve: {
                        rewardId: function () {
                            return prize.rewardId;
                        },
                        rewardName: function () {
                            return prize.name;
                        }
                    }
                });
            }


        };

        /******************** 设置背景 *********************/

        // 设置背景的宽度和高度
        $(function () {

            var height = $(window).height();
            var width = $(window).width();

            //改变div的高度
            $('.container').height("auto");
            //改变div的宽度
            $('.container').width(width);

            for (var i = 0; i < $scope.players.length; i++) {
                $($('#info' + i)).css('left', i * width * 0.255 + "px").css('top', ($scope.players.length - i) * 30 + "px");
            }
            $('#info0').css('left', '10px');

            for (var i = 0; i < $scope.players2.length; i++) {
                $($('#info2' + i)).css('left', i * width * 0.255 + "px").css('bottom', (i + 2) * 30 + "px");
            }
            $('#info20').css('left', '10px');
        });
    }
})();