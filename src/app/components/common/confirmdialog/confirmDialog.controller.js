/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016.
 */
import confirmDialogTemplate from './confirmDialog.html';

class ConfirmDialogController {

    /*@ngInject*/
    constructor($uibModalInstance, confirmText) {
        this.$uibModalInstance = $uibModalInstance;
        this.confirmText = confirmText;
    }

    static showDialog(uibModal, confirmText) {
        return uibModal.open({
            animation: true,
            template: confirmDialogTemplate,
            controller: ConfirmDialogController,
            bindToController: true,
            controllerAs: '$ctrl',
            resolve: {
                confirmText: () => confirmText
            }
        }).result;
    }

    cancel() {
        this.$uibModalInstance.dismiss();
    }

    ok() {
        this.$uibModalInstance.close();
    }
}

export default ConfirmDialogController;
