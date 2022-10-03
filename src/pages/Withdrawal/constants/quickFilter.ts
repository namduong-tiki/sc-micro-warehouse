export const QUICK_FILTER_NAME = {
    OVERDUE_AND_LIQUIDATION: 'OVERDUE_AND_LIQUIDATION',
    NEED_TO_WITHDRAW_SOON: 'NEED_TO_WITHDRAW_SOON',
    TIKI_RETURN: 'TIKI_RETURN'

}

export const QUICK_FILTER = {
    TIKI_RETURN: {
        key: QUICK_FILTER_NAME.TIKI_RETURN,
        value: QUICK_FILTER_NAME.TIKI_RETURN,
        label: 'bpor.quick_filter.tiki_return'
    },
    NEED_TO_WITHDRAW_SOON: {
        key: QUICK_FILTER_NAME.NEED_TO_WITHDRAW_SOON,
        value: QUICK_FILTER_NAME.NEED_TO_WITHDRAW_SOON,
        label: 'bpor.quick_filter.need_to_withdraw'
    },
    OVERDUE_AND_LIQUIDATION: {
        key: QUICK_FILTER_NAME.OVERDUE_AND_LIQUIDATION,
        value: QUICK_FILTER_NAME.OVERDUE_AND_LIQUIDATION,
        label: 'bpor.quick_filter.liquidation'
    },

}