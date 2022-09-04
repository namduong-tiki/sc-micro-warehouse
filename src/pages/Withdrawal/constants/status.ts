import { formatMessage } from '@/utils/locale';




export const BPOR_STATUS = {
    draft: {
        key: 'draft',
        value: formatMessage({ id: 'bpor.status.draft' }),
        colorTag: 'default'
    },
    waiting_for_checking: {
        key: 'waiting_for_checking',
        value: formatMessage({ id: 'bpor.status.waiting_for_checking' }),
        colorTag: 'default'
    },
    waiting_for_tnsl_confirmation: {
        key: 'waiting_for_tnsl_confirmation',
        value: formatMessage({ id: 'bpor.status.waiting_for_tnsl_confirmation' }),
        colorTag: 'processing'
    },
    tnsl_preparing_stock: {
        key: 'tnsl_preparing_stock',
        value: formatMessage({ id: 'bpor.status.tnsl_preparing_stock' }),
        colorTag: 'warning'
    },
    ready_to_return: {
        key: 'ready_to_return',
        value: formatMessage({ id: 'bpor.status.ready_to_return' }),
        colorTag: 'warning'
    },
    canceled: {
        key: 'canceled',
        value: formatMessage({ id: 'bpor.status.canceled' }),
        colorTag: 'default'
    },
    return_successfully: {
        key: 'return_successfully',
        value: formatMessage({ id: 'bpor.status.return_successfully' }),
        colorTag: 'success'
    },
    liquidated: {
        key: 'liquidated',
        value: formatMessage({ id: 'bpor.status.liquidated' }),
        colorTag: 'error'
    },
    failed: {
        key: 'failed',
        value: formatMessage({ id: 'bpor.status.failed' }),
        colorTag: 'error'
    },
    denied: {
        key: 'denied',
        value: formatMessage({ id: 'bpor.status.denied' }),
        colorTag: 'error'
    },
    

}




export const LIST_STATUS_TAB_DRAFT = [
    BPOR_STATUS.draft,
]

export const LIST_STATUS_TAB_PROCESSING = [
    BPOR_STATUS.waiting_for_tnsl_confirmation,
    BPOR_STATUS.tnsl_preparing_stock
]

export const LIST_STATUS_TAB_WAITING = [
    BPOR_STATUS.ready_to_return,
]

export const LIST_STATUS_TAB_SUCCESSFULLY = [
    BPOR_STATUS.return_successfully,
    BPOR_STATUS.liquidated,

]
export const LIST_STATUS_TAB_CANCELED = [
    BPOR_STATUS.canceled,
    BPOR_STATUS.denied
]