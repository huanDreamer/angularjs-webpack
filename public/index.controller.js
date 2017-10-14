(function () {

    'use strict';

    angular.module('portalApp')
        .controller('IndexController', ['WechatService', '$http', IndexController]);

    function IndexController(WeChatService, $http) {

        //

        // console.log($http);

        // $http.get(
        //     'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi')
        //     .then(function success(response) {
        //         console.log(response);
        //     }, function error(reson){
        //
        //     });

        // wx.config({
        //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     appId: '', // 必填，公众号的唯一标识
        //     timestamp: , // 必填，生成签名的时间戳
        //     nonceStr: '', // 必填，生成签名的随机串
        //     signature: '',// 必填，签名，见附录1
        //     jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        // });

        // wx.onMenuShareAppMessage({
        //     title: '懂球女神邀你一起 Battle', // 分享标题
        //     desc: '测试测试 懂球女神邀你一起 Battle', // 分享描述
        //     link: 'http://wechat.sillyfan.top', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //     imgUrl: '', // 分享图标
        //     type: '', // 分享类型,music、video或link，不填默认为link
        //     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        //     success: function () {
        //         // 用户确认分享后执行的回调函数
        //     },
        //     cancel: function () {
        //         // 用户取消分享后执行的回调函数
        //     }
        // });
        //
        // wx.onMenuShareTimeline({
        //     title: '懂球女神邀你一起 Battle', // 分享标题
        //     link: 'http://wechat.sillyfan.top', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //     imgUrl: '', // 分享图标
        //     success: function () {
        //         // 用户确认分享后执行的回调函数
        //     },
        //     cancel: function () {
        //         // 用户取消分享后执行的回调函数
        //     }
        // });

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