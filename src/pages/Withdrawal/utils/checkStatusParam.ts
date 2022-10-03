import { BPOR_STATUS } from "../constants/status"
import { TAB_NAME } from "../constants/tab"

const convertStatusProcessingTab = (status = '') => {
    let temp = status
    if(status.includes(BPOR_STATUS.picking.key)){
        temp = `${temp},${BPOR_STATUS.missing.key}`
    }
    if(status.includes(BPOR_STATUS.packed.key)){
        return `${temp},${BPOR_STATUS.packed_missing.key}`
    }
    return temp
}



export const checkStatusParam = ({ status, tab }: any) => {
    if (tab === TAB_NAME.DRAFT) {
        return status ? `${status}` : `${BPOR_STATUS.draft.key}`
    } if (tab === TAB_NAME.PROCESSING) {
        return status ? convertStatusProcessingTab(status) :
            `${BPOR_STATUS.processing.key},${BPOR_STATUS.fully_created.key},${BPOR_STATUS.partially_created.key},${BPOR_STATUS.picking.key},${BPOR_STATUS.packing.key},${BPOR_STATUS.packed.key},${BPOR_STATUS.handing_over.key},${BPOR_STATUS.packed_missing.key},${BPOR_STATUS.missing.key}`
    } if (tab === TAB_NAME.WAITING) {
        return status ? `${status}` : `${BPOR_STATUS.ready_to_return.key},${BPOR_STATUS.returning.key}`
    } if (tab === TAB_NAME.SUCCESSFULLY) {
        return status ? `${status}` : `${BPOR_STATUS.successfully_returned.key},${BPOR_STATUS.liquidated.key},${BPOR_STATUS.denied.key}`
    } if (tab === TAB_NAME.CANCELLED) {
        return status ? `${status}` : `${BPOR_STATUS.cancelled.key}`

    }
    return null
}
