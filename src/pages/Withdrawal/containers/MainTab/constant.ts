import { BPOR_STATUS } from "../../constants/status"

export const LIST_ACTION = {

    EDIT: {
        key: 'EDIT',
        text: 'common.edit'
    },
    DELETE: {
        key: 'DELETE',
        text: 'common.delete'
    },
    COPY: {
        key: 'COPY',
        text: 'common.copy'
    },
    DETAIL: {
        key: 'DETAIL',
        text: 'common.detail'
    },
    CANCEL: {
        key: 'CANCEL',
        text: 'common.cancel'
    },
    PRINT_BPOR: {
        key: 'PRINT_BPOR',
        text: 'bpor.print_bpor'
    }

}

export const renderActionHelper = (status = '', isAllowCancel?: any) => {
    switch (status) {
        case BPOR_STATUS.draft.key:
            return {
                first: LIST_ACTION.EDIT,
                second: LIST_ACTION.DELETE,
            }
        case BPOR_STATUS.ready_to_return.key:
            return {
                first: LIST_ACTION.DETAIL,
                second: LIST_ACTION.PRINT_BPOR,
            }

        case BPOR_STATUS.processing.key:
        case BPOR_STATUS.fully_created.key:
        case BPOR_STATUS.partially_created.key:
        case BPOR_STATUS.picking.key:
        case BPOR_STATUS.packing.key:
        case BPOR_STATUS.packed.key:
        case BPOR_STATUS.handing_over.key:

            if (isAllowCancel) {
                return {
                    first: LIST_ACTION.DETAIL,
                    second: LIST_ACTION.CANCEL,
                }
            }

            return {
                first: LIST_ACTION.DETAIL,
                // second: LIST_ACTION.PRINT_BPOR,
            }

        default:
            return {
                first: LIST_ACTION.DETAIL,
                // second: LIST_ACTION.COPY,
            }
    }
}


export const renderActionMobileHelper = (status = '', isAllowCancel?: any) => {
    switch (status) {
        case BPOR_STATUS.draft.key:
            return {
                list: [LIST_ACTION.EDIT, LIST_ACTION.DELETE]
            }
        case BPOR_STATUS.ready_to_return.key:
            return {
                list: [LIST_ACTION.DETAIL, LIST_ACTION.PRINT_BPOR]
            }

        case BPOR_STATUS.processing.key:
        case BPOR_STATUS.fully_created.key:
        case BPOR_STATUS.partially_created.key:
        case BPOR_STATUS.picking.key:
        case BPOR_STATUS.packing.key:
        case BPOR_STATUS.packed.key:
        case BPOR_STATUS.handing_over.key:

            if (isAllowCancel) {
                return {
                    list: [LIST_ACTION.DETAIL, LIST_ACTION.CANCEL]
                }
            }

            return {
                list: [LIST_ACTION.DETAIL,]

            }

        default:
            return {
                list: [LIST_ACTION.DETAIL,]
            }
    }

}
