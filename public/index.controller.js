(function () {

    'use strict';

    angular.module('portalApp')
        .controller('IndexController', ['WechatService', IndexController]);

    function IndexController(WeChatService) {


        WeChatService.getJsConfig(
            {
                url: location.href.split('#')[0]
            },
            function success(response) {

                var config = response.data;

                console.log(config);

                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: config.appId, // 必填，公众号的唯一标识
                    timestamp: config.timestamp, // 必填，生成签名的时间戳
                    nonceStr: config.nonceStr, // 必填，生成签名的随机串
                    signature: config.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

            },
            function error(reason) {
                console.error(reason);
            }
        );


        wx.onMenuShareAppMessage({
            title: '测试 分享 标题', // 分享标题
            desc: '测试分享描述', // 分享描述
            link: 'http://wechat.sillyfan.top', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });


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
                }, function error() {

                }
            )
        }

    }
})();