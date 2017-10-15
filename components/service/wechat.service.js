(function () {

    'use strict';

    angular.module('portalApp').factory('WechatService', ['$resource', 'Server', WechatService]);

    function WechatService($resource, Server) {

        return $resource(Server.WeChat + "/wechat/token/code", {}, {

            'getCode': {
                url: Server.WeChat + "/wechat/code",
                method: 'GET'
            },
            'checkCode': {
                url: Server.WeChat + "/wechat/code",
                method: 'POST'
            },
            'getJsConfig': {
                url: Server.WeChat + "/wechat/token/js_config",
                method: 'GET'
            }
        });

    }
})();