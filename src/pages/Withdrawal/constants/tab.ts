
export const TAB_NAME = {
    DRAFT : 'draft',
    PROCESSING : 'processing',
    WAITING:'waiting',
    SUCCESSFULLY : 'successfully',
    // LIQUIDATED:'liquidated',
    CANCELED:'canceled',
}

export const TABS = [
    {
        value:TAB_NAME.DRAFT,
        title: 'bpor.tabs.title.draft'
    },
    {
        value:TAB_NAME.PROCESSING,
        title: 'bpor.tabs.title.processing'
    },  
    {
        value:TAB_NAME.WAITING,
        title: 'bpor.tabs.title.waiting'
    },      
    {
        value:TAB_NAME.SUCCESSFULLY,
        title: 'bpor.tabs.title.successfully'
    },
    // {
    //     value:TAB_NAME.LIQUIDATED,
    //     title: 'bpor.tabs.title.liquidated'
    // },
    {
        value:TAB_NAME.CANCELED,
        title: 'bpor.tabs.title.canceled'
    },
]
