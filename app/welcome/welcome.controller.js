(function () {

    'use strict';

    angular.module('portalApp')
        .controller('WelcomeController', ['$scope', '$log', 'WechatService', '$location', '$state', WelcomeController]);

    function WelcomeController($scope, $log, WeChatService, $location, $state) {

        // 设置背景的宽度和高度
        $(function () {

            var width = $(window).width();

            console.log(width);

            $('#startImg').width("120px");
            $('#startDiv').css("top", "510px");
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