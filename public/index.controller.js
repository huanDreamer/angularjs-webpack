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

        wx.ready(function () {

            wx.checkJsApi({
                jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    console.log(res);
                }
            });

            wx.onMenuShareTimeline({
                title: '懂球女神邀你一起 Battle',
                link: 'http://wechat.sillyfan.top',
                imgUrl: 'http://img.sillyfan.top/logo.png',
                success: function () {

                    var shared = localStorage.getItem("share");

                    if (shared && Number(shared) === new Date().getDate()) {
                        return;
                    } else {

                        localStorage.setItem("share", new Date().getDate());

                        BootstrapDialog.alert({
                            title: '提示',
                            message: '恭喜你获得第二次抽奖机会',
                            type: '',
                            closable: true,
                            draggable: true,
                            buttonLabel: '好的'
                        });
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });


            wx.onMenuShareAppMessage({
                title: '懂球女神邀你一起 Battle',
                desc: '投票、抽奖、赢iphone，快来参与吧',
                link: 'http://wechat.sillyfan.top',
                imgUrl: 'http://img.sillyfan.top/logo.png',
                success: function () {

                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数

                }
            });


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