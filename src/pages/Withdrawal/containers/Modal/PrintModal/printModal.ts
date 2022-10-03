import { AppContext } from "@/pages/Withdrawal/contexts/AppContext"
import { useContext, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

export const usePrintModal = () => {
    const {
        printModalData, setPrintModalData,
    } = useContext(AppContext)

    const [isPrinting, setIsPrinting] = useState(false)
    const printCpnRef = useRef<any>()
    const handlePrint = useReactToPrint({
      content: () => printCpnRef.current,
    });
    const isVisible = printModalData?.isVisible
    const name = printModalData?.name


    const onClosePrintModal = () => {
        setPrintModalData({ isVisible: false })
    }

    const onPrint = async () => {
      // setIsPrinting(true)
      // if (document.getElementById('printingIframe') === null) {
      //   const iframe:any = document.createElement('iframe');
      //   iframe.id = 'printingIframe';
      //   iframe.style = 'height: 0px; width: 0px; position: absolute';
      //   document.body.appendChild(iframe);
      // }
      // const frame: any = document?.getElementById('printingIframe')
      // const pri: any = frame?.contentWindow;
      // pri.document.open();
      // pri.document.write(document?.getElementById('print-preview')?.innerHTML);
      // pri.document.close();
      // setIsPrinting(false)
      // pri.focus();
      // pri.print();
      try {
        setIsPrinting(true)
        handlePrint()
      } catch (error) {
        
      }finally{
        setIsPrinting(false)
      }

  };

    return {
        isVisible,
        name,
        onClosePrintModal,
        isPrinting,
        onPrint,
        printCpnRef
    }
}