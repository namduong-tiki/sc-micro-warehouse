import { BPOR_STATUS } from "../constants/status"
import { TAB_NAME } from "../constants/tab"


export const checkStatusParam = ({ status, tab }: any) => {
    if (tab === TAB_NAME.DRAFT) {
        return status ? `${status}` : `${BPOR_STATUS.draft.key}`
    } if (tab === TAB_NAME.PROCESSING) {
        return status ? `${status}` :
            `${BPOR_STATUS.waiting_for_tnsl_confirmation.key},${BPOR_STATUS.tnsl_preparing_stock.key}`
    } if (tab === TAB_NAME.WAITING) {
        return status ? `${status}` : `${BPOR_STATUS.ready_to_return.key}`
    } if (tab === TAB_NAME.SUCCESSFULLY) {
        return status ? `${status}` : `${BPOR_STATUS.return_successfully.key},${BPOR_STATUS.liquidated.key}`
    } if (tab === TAB_NAME.CANCELED) {
        return status ? `${status}` : `${BPOR_STATUS.liquidated.key},${BPOR_STATUS.denied.key}`

    }
    return null
}
