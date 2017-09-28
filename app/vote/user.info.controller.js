(function () {

    'use strict';

    angular.module('portalApp')
        .controller('UserInfoController', ['$scope', '$log', '$uibModalInstance', 'PrizeService', 'rewardId', 'rewardName', UserInfoController]);

    function UserInfoController($scope, $log, $uibModalInstance, PrizeService, rewardId, rewardName) {


        $scope.user = {};

        $scope.rewardName = rewardName;

        $scope.save = function () {

            $scope.form.name.$setTouched();
            $scope.form.address.$setTouched();
            $scope.form.phone.$setTouched();

            if ($scope.form.$invalid) {
                $scope.showInvalid = true;
                return;
            }

            PrizeService.userinfo(
                {
                    code: localStorage.getItem("code"),
                    rewardId: rewardId,
                    name: $scope.user.name,
                    address: $scope.user.address,
                    phone: $scope.user.phone
                },
                function success(response) {
                    if(response.code === 0) {
                        BootstrapDialog.alert({
                            title: '提示',
                            message: '提交成功，活动结束后我们将寄出奖品。您可询问微信客服查看奖品进度。',
                            type: '',
                            closable: true,
                            draggable: true,
                            buttonLabel: '好的'
                        });

                    } else {
                        BootstrapDialog.alert({
                            title: '提示',
                            message: '非法请求！',
                            type: '',
                            closable: true,
                            draggable: true,
                            buttonLabel: '好的'
                        });
                    }
                    $uibModalInstance.dismiss();
                },
                function error(reason) {
                    BootstrapDialog.alert({
                        title: '提示',
                        message: '服务器异常，请凭当前页截图到微信公众号询问客服。<br/> code:' + localStorage.getItem("code"),
                        type: '',
                        closable: true,
                        draggable: true,
                        buttonLabel: '好的'
                    });
                    $uibModalInstance.dismiss();
                }
            )
        };

        $scope.cancel = function () {
            BootstrapDialog.confirm({
                title: '确定取消?',
                message: '取消后不可再次填写',
                type: BootstrapDialog.TYPE_DEFAULT,
                closable: true,
                draggable: true,
                btnCancelLabel: '继续填写',
                btnOKLabel: '确定',
                btnOKClass: 'btn-primary',
                callback: function (result) {

                    if (!result) {
                        return;
                    }
                    $uibModalInstance.dismiss();
                }
            });

        }

    }
})();