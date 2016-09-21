/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016.
 */
import confirmDialogTemplate from './confirmDialog.html';

class ConfirmDialogController {

    /*@ngInject*/
    constructor($uibModalInstance, confirmHead, confirmBody) {
        this.$uibModalInstance = $uibModalInstance;
        this.confirmHead = confirmHead;
        this.confirmBody = confirmBody;
    }

    static showDialog(uibModal, confirmHead, confirmBody) {
        return uibModal.open({
            animation: true,
            template: confirmDialogTemplate,
            controller: ConfirmDialogController,
            bindToController: true,
            controllerAs: '$ctrl',
            resolve: {
                confirmHead: () => confirmHead,
                confirmBody: () => confirmBody
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
