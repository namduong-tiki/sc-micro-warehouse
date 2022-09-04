import { BPOR_STATUS } from "../../constants/status"

export const LIST_ACTION = {

    EDIT: {
        key: 'EDIT',
        text: 'Chỉnh sửa'
    },
    DELETE: {
        key: 'DELETE',
        text: 'Xoá'
    },
    COPY: {
        key: 'COPY',
        text: 'Sao chép'
    },
    DETAIL: {
        key: 'DETAIL',
        text: 'Xem chi tiết'
    },
    CANCEL: {
        key: 'CANCEL',
        text: 'Huỷ'
    },
    PRINT_BPOR: {
        key: 'PRINT_BPOR',
        text: 'In phiếu rút hàng'
    }

}

export const renderActionHelper = (status = '') => {
    switch (status) {
        case BPOR_STATUS.draft.key:
        case BPOR_STATUS.waiting_for_checking.key:

            return {
                first: LIST_ACTION.EDIT,
                second: LIST_ACTION.DELETE,
                list: [LIST_ACTION.COPY]
            }
        case BPOR_STATUS.ready_to_return.key:

            return {
                first: LIST_ACTION.EDIT,
                second: LIST_ACTION.PRINT_BPOR,
                list: [LIST_ACTION.COPY, LIST_ACTION.DELETE]
            }

        // case BPOR_STATUS.waiting_for_items.key:
        // case BPOR_STATUS.wait_transport_confirm.key:
        //     if (isODF) {
        //         return {
        //             first: LIST_ACTION.DETAIL,
        //             second: LIST_ACTION.PRINT_PO,
        //             list: [LIST_ACTION.PRINT_MINCODE,isD2D && LIST_ACTION.PRINT_SEAL]
        //         }
        //     }
        //     return {
        //         first: LIST_ACTION.DETAIL,
        //         second: LIST_ACTION.PRINT_PO,
        //         list: [LIST_ACTION.PRINT_MINCODE,isD2D && LIST_ACTION.PRINT_SEAL ,LIST_ACTION.COPY]

        //     }

        // case BPOR_STATUS.transport_confirmed.key:
        // case BPOR_STATUS.go_picking.key:
        //     if (isODF) {
        //         return {
        //             first: LIST_ACTION.DETAIL,
        //             second: LIST_ACTION.PRINT_PO,
        //             list: [LIST_ACTION.PRINT_MINCODE,isD2D && LIST_ACTION.PRINT_SEAL]
        //         }
        //     }
        //     return {
        //         first: LIST_ACTION.DETAIL,
        //         second: LIST_ACTION.PRINT_PO,
        //         list: [LIST_ACTION.PRINT_MINCODE,isD2D && LIST_ACTION.PRINT_SEAL,LIST_ACTION.COPY]
        //     }
        // case BPOR_STATUS.completed.key:
        // case BPOR_STATUS.completed_partially.key:
        // case BPOR_STATUS.canceled.key:
        // case BPOR_STATUS.rejected.key:
        default:
            return {
                first: LIST_ACTION.DETAIL,
                second: LIST_ACTION.COPY,
            }
    }


}