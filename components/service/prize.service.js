(function () {

    'use strict';

    angular.module('portalApp').factory('PrizeService', ['$resource', 'Server', PrizeService]);

    function PrizeService($resource, Server) {

        return $resource(Server.WeChat + "/wechat/vote/prize", {}, {

            'get': {
                method: 'GET'
            },
            'userinfo': {
                method: 'POST'
            }
        });

    }
})();