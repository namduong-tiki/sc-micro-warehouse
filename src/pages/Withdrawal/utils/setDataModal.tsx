// eslint-disable-next-line prefer-const
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export let finishDataModal:any[] = []

export const setFinishDataModal = (idRequisition:any, data:any) => {
    try {
        const temp: any[] = [...finishDataModal]
        const index = findIndex(finishDataModal,((d:any) => d?.id === idRequisition))
        if(index === -1){
            temp.push({
                id: idRequisition,
                data
            })
            finishDataModal = temp
            return;
        }

        const item = temp[index];
        const tempItem = {
            ...item,
            data
        }
        temp[index] = tempItem
        finishDataModal = temp
        return;
    } catch (error) {
        // console.log(error)
        
    }
}

export const getFinishDataModal = () => finishDataModal

export const getItemFinishDataModal = (idRequisition:any) => {
    const index = findIndex(finishDataModal,((d:any) => d?.id === idRequisition))
    return index === -1 ? {} : get(finishDataModal,[index,'data'],{})
}




export const clearFinishDataModal = () => {
    finishDataModal = []
}
