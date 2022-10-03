import React from 'react'
import { PRINT_MODAL_NAME } from './constants';
import PrintBPOR from './PrintPBOR';


const Content = ({name, printCpnRef}:any) => {
    switch (name) {
        case PRINT_MODAL_NAME.PRINT_BPOR:
            return <PrintBPOR printCpnRef={printCpnRef}/>
    
        default:
            return <PrintBPOR printCpnRef={printCpnRef}/>
    }
}

export default Content;