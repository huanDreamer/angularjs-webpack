(function () {

    'use strict';

    angular.module('portalApp')
        .controller('IndexController', ['WechatService', IndexController]);

    function IndexController(WeChatService) {

        // 获取localstorage code
        var code = localStorage.getItem("code");
        if (!code) {

            WeChatService.getCode(
                {},
                function success(response) {
                    localStorage.setItem("code", response.data);
                },
                function error(reason) {
                    alert("服务器异常，请稍后重试");
                });
        } else {
            WeChatService.checkCode(
                code,
                function success(response) {
                    localStorage.setItem("code", response.data);
                },function error() {

                }
            )
        }

    }
})();