(function () {

    'use strict';

    angular.module('portalApp')
        .controller('UserInfoController', ['$scope', '$log', '$uibModalInstance', 'PrizeService', UserInfoController]);

    function UserInfoController($scope, $log, $uibModalInstance, PrizeService) {



        $scope.save = function() {

            $scope.form.name.$setTouched();
            $scope.form.address.$setTouched();
            $scope.form.phone.$setTouched();

            if($scope.form.$invalid) {
                $scope.showInvalid = true;
            }
        };

        $scope.cancel = function() {
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

                    // user cancelled action, do nothing.
                    if (!result) {
                        return;
                    }
                    $uibModalInstance.dismiss();
                }
            });

        }

    }
})();