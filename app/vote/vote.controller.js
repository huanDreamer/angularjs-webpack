(function () {

    'use strict';

    angular.module('portalApp')
        .controller('VoteController', ['$scope', '$log', '$sce', 'VoteService', 'PlayerService', 'PrizeService', '$location', '$state', '$uibModal', 'players', VoteController]);

    function VoteController($scope, $log, $sce, VoteService, PlayerService, PrizeService, $location, $state, $uibModal, players) {

        // 初始化选手信息
        $scope.players = players;

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
            }
        );

        // 获取参与抽奖的总人数
        PrizeService.count(
            {},
            function success(response) {
                $scope.count = response.data;
            }, function error(reason) {

            }
        );

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

        $scope.hasPrized = function() {
            var prizeHistory = localStorage.getItem("prize");
            var share = localStorage.getItem("share");
            var sharePrized = localStorage.getItem("sharePrized");

            var i = 0;

            // 第一次用完
            if(prizeHistory && Number(prizeHistory) === new Date().getDate()) {
                i = 1;
            }

            if(share && Number(share) === new Date().getDate()) {
                i = 2;

                if(sharePrized && Number(sharePrized) === new Date().getDate()) {
                    i = 3;
                }
            }


            return i;
        }

        $scope.prize = {
            score: 0,
            running: false,
            awards: [
                {id: 0, name: "暖手袋"},
                {id: 1, name: "中超定制毛巾"},
                {id: 2, name: "iPhone 8"},
                {id: 3, name: "未中奖"},
                {id: 4, name: "卡通定制T恤"},
                {id: 5, name: "NBA纪念邮票"},
                {id: 6, name: "天天范特西门票"},
                {id: 7, name: "卡通限量眼镜"}
            ]
        };

        $scope.start = function () {
            if ($scope.prize.running === true) {
                return;
            }
            if ($scope.history.length === 0) {
                BootstrapDialog.alert({
                    title: '提示',
                    message: '投票后才可以抽奖哦。',
                    type: '',
                    closable: true,
                    draggable: true,
                    buttonLabel: '好的'
                });

                return;
            }

            if ($scope.hasPrized() === 3) {
                BootstrapDialog.alert({
                    title: '提示',
                    message: '今天的抽奖机会已经用完，请明天再来叭~',
                    type: '',
                    closable: true,
                    draggable: true,
                    buttonLabel: '好的'
                });

                return;
            }

            if ($scope.hasPrized() === 1) {
                BootstrapDialog.alert({
                    title: '提示',
                    message: '分享至朋友圈可获得第二次抽奖机会哦！',
                    type: '',
                    closable: true,
                    draggable: true,
                    buttonLabel: '好的'
                });

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

            var prized = localStorage.getItem("prize");
            if(prized && Number(prized) === new Date().getDate()) {
                localStorage.setItem("sharePrized", new Date().getDate());
            } else {
                localStorage.setItem("prize", new Date().getDate());
            }


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
                    $scope.$apply();
                }

                timeout = setTimeout(myFunction, speed);
            };
            var timeout = setTimeout(myFunction, speed);

        }

        var prizeFinish = function (prize) {
            // 谢谢参与
            if (prize.id === 3) {

                if($scope.hasPrized() !== 3) {

                    var message = '';

                    if($scope.hasPrized() === 1) {
                        message = '差点就中奖啦~ 分享至朋友圈可获得第二次抽奖机会哦！'
                    } else {
                        message = '差点就中奖啦~ 你还有一次抽奖机会噢'
                    }

                    BootstrapDialog.alert({
                        title: '提示',
                        message: message,
                        type: '',
                        closable: true,
                        draggable: true,
                        buttonLabel: '好的'
                    });

                } else {

                    BootstrapDialog.alert({
                        title: '提示',
                        message: '差点就中奖啦~ 今天的抽奖机会已用完，请明天再来叭~',
                        type: '',
                        closable: true,
                        draggable: true,
                        buttonLabel: '好的'
                    });
                }


                // 门票
            } else if (prize.id === 6) {

                BootstrapDialog.alert({
                    title: '提示',
                    message: '恭喜你获得 <pan style="color: red">天天NBA门票</pan><br/>请妥善保存你的兑换码：' + prize.name,
                    type: '',
                    closable: true,
                    draggable: true,
                    buttonLabel: '好的'
                });

                // 其他
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

        /*随机生成中奖信息*/
        var infos = [];

        var phonePre = [138, 139, 147, 183, 188, 176, 158, 189, 135];

        for (var i = 0; i < 100; i++) {

            var num = (Math.floor(Math.random() * 10) % 8);

            if (num !== 3) {

                infos.push('恭喜' + phonePre[num] + '****' + (Math.floor(Math.random() * 9000) + 1000) + '用户获得' + $scope.prize.awards[num].name)
            }
        }

        $scope.phoneInfo = $sce.trustAsHtml(infos.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"));

    }
})();