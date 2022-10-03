import { formatMessage } from '@/utils/locale';




export const BPOR_STATUS = {
    //nhap
    draft: {
        key: 'draft',
        value: formatMessage({ id: 'bpor.status.draft' }),
        colorTag: 'default'
    },
    //dang xu ly
    
    processing: {
        key: 'processing',
        value: formatMessage({ id: 'bpor.status.processing' }),
        colorTag: 'processing'
    },
    fully_created: {
        key: 'fully_created',
        value: formatMessage({ id: 'bpor.status.fully_created' }),
        colorTag: 'processing'
    },
    partially_created: {
        key: 'partially_created',
        value: formatMessage({ id: 'bpor.status.partially_created' }),
        colorTag: 'processing'
    },
    picking: {
        key: 'picking',
        value: formatMessage({ id: 'bpor.status.picking' }),
        colorTag: 'processing'
    },
    packing: {
        key: 'packing',
        value: formatMessage({ id: 'bpor.status.packing' }),
        colorTag: 'processing'
    },
    packed: {
        key: 'packed',
        value: formatMessage({ id: 'bpor.status.packed' }),
        colorTag: 'processing'
    },
    handing_over: {
        key: 'handing_over',
        value: formatMessage({ id: 'bpor.status.handing_over' }),
        colorTag: 'processing'
    },
    packed_missing: {
        key: 'packed_missing',
        value: formatMessage({ id: 'bpor.status.packed_missing' }),
        colorTag: 'processing'
    },
    missing: {
        key: 'missing',
        value: formatMessage({ id: 'bpor.status.missing' }),
        colorTag: 'processing'
    },
    

    // cho nhan hang
    returning: {
        key: 'returning',
        value: formatMessage({ id: 'bpor.status.returning' }),
        colorTag: 'warning'
    },
    ready_to_return: {
        key: 'ready_to_return',
        value: formatMessage({ id: 'bpor.status.ready_to_return' }),
        colorTag: 'warning'
    },


    // da hoan thanh
    successfully_returned: {
        key: 'successfully_returned',
        value: formatMessage({ id: 'bpor.status.successfully_returned' }),
        colorTag: 'success'
    },
    liquidated: {
        key: 'liquidated',
        value: formatMessage({ id: 'bpor.status.liquidated' }),
        colorTag: 'error'
    },
    denied: {
        key: 'denied',
        value: formatMessage({ id: 'bpor.status.denied' }),
        colorTag: 'error'
    },

    // da huy
    cancelled: {
        key: 'cancelled',
        value: formatMessage({ id: 'bpor.status.cancelled' }),
        colorTag: 'default'
    },

}


export const LIST_STATUS_TAB_DRAFT = [
    BPOR_STATUS.draft,
]

export const LIST_STATUS_TAB_PROCESSING = [
    BPOR_STATUS.processing,
    BPOR_STATUS.fully_created,
    BPOR_STATUS.partially_created,
    BPOR_STATUS.picking,
    // BPOR_STATUS.missing,
    BPOR_STATUS.packing,
    BPOR_STATUS.packed,
    // BPOR_STATUS.packed_missing,
    BPOR_STATUS.handing_over,
]

export const LIST_STATUS_TAB_WAITING = [
    BPOR_STATUS.returning,
    BPOR_STATUS.ready_to_return,
]

export const LIST_STATUS_TAB_SUCCESSFULLY = [
    // BPOR_STATUS.return_successfully,
    BPOR_STATUS.successfully_returned,
    BPOR_STATUS.liquidated,
    BPOR_STATUS.denied
]
export const LIST_STATUS_TAB_CANCELLED = [
    BPOR_STATUS.cancelled,
]

export const checkIsDraftBPOR = (status: string) => {
    const arrDraft = LIST_STATUS_TAB_DRAFT.map((i) => i?.key);
    return arrDraft.includes(status);
  };
  
  export const checkIsCancelBPOR = (status: string) => {
    const arrDraft = LIST_STATUS_TAB_CANCELLED.map((i) => i?.key);
    return arrDraft.includes(status);
  };


export const checkIncludeProcessingTab = (key: any) => {
    const index = LIST_STATUS_TAB_PROCESSING.findIndex((i: any) => i?.key === key )
    return index !== -1
}
export const checkIncludeWaitingTab = (key: any) => {
    const index = LIST_STATUS_TAB_WAITING.findIndex((i: any) => i?.key === key )
    return index !== -1
}

export const checkIsStatusPartialCreated = (key: any) => {
    return key === BPOR_STATUS.partially_created.key
}


export const checkIsStatusSuccessful = (key: any) => {
    return key === BPOR_STATUS.successfully_returned.key
}


export const checkIsStatusLiquidated = (key: any) => {
    return key === BPOR_STATUS.liquidated.key
}