(function () {

    'use strict';

    angular.module('portalApp')
        .controller('WelcomeController', ['$scope', '$log', 'WechatService', '$location', '$state', WelcomeController]);

    function WelcomeController($scope, $log, WeChatService, $location, $state) {

        // 设置背景的宽度和高度
        $(function () {

            let height = $(window).height();
            let width = $(window).width();

            //改变div的高度
            $('#container').height(height);
            //改变div的宽度
            $('#container').width(width);

            // 根据屏幕宽度加载对应的图片
            $('#container').css("backgroundImage", "url('../../img/welcome.png')");

            $('#startImg').width(width / 4);
            $('#startBtn').css("marginLeft", width / 2 - $('#startImg').width() / 2 - 5 + "px");
            $('#startBtn').css("marginTop", height * 0.6 + "px");
        });

        // 获取localstorage code
        if (!localStorage.getItem("code")) {

            WeChatService.getCode(
                {},
                function success(response) {
                    localStorage.setItem("code", response.data);
                },
                function error(reason) {
                    alert("服务器异常，请稍后重试");
                });
        }

        // 获取用户的code
        // try {
        //     $scope.code = $location.$$absUrl.split('?')[1].split('&')[0].split('=')[1];
        //
        //     // alert($scope.code);
        //
        //     if ($scope.code === undefined || $scope.code === null) {
        //         $state.go('error');
        //     }

        //      localStorage.code = $scope.code;
        //
        //     WeChatService.saveCode($scope.code, function success(response) {
        //
        //     }, function error(reason) {
        //         $log.error(reason);
        //     })
        // } catch (e) {
        //     $state.go('error');
        // }
    }
})();