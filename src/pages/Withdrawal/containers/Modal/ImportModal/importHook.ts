import {useState} from 'react'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import { useFormatMessage } from '@/utils/locale'
import { importFileProduct } from '@/pages/Withdrawal/services'
import { downloadFileFromUrl } from '@/utils'

export const useImport = (cbImport:any,sellerId:any) => {
    const formatMessage = useFormatMessage()
    const [currentStep, setCurrentStep] = useState(1)
  const [products, setProducts] = useState([])
  const [fileName, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorUploadMessage, setErrorUploadMessage] = useState('')



  const onUploadFile = async (file:any) => {
    try {
        setIsLoading(true)
        setErrorUploadMessage('')
        const rawData = new FormData();
        rawData.append('seller_id', sellerId);
        rawData.append('file', file);
        const rs = await importFileProduct(rawData)
        if ('error' in rs) {
            throw new Error(rs?.error?.message);
          }
        setProducts(rs?.data || [])
        setFileName(file?.name)
        setCurrentStep(2)
        setIsLoading(false)
      } catch (error:any) {
          setErrorUploadMessage(error?.message || formatMessage({id:'Có lỗi xảy ra'}))
          setIsLoading(false)
      }
  }

  const onRemoveFile = () => {
    setFileName('')
    setProducts([])
  }

  const onBack = () => {
    setCurrentStep(1)
}
    const onNext = () => {
        setCurrentStep(2)
    }

    const onSave = () => {
        cbImport(products)
    }

const onDownloadSample = () => {
  const url = 'https://salt.tikicdn.com/ts/tmp/71/89/8d/588b44a124656977d94860131dc3dfaa.xlsx'
  downloadFileFromUrl(url)
}

const isCanNext = !!fileName

const checkIsCanFinish = () => {
  let isCanFinishTemp = true;
  forEach(products, (p) => {
    const messageError = get(p, ['errors',0,'message'],'')
    if (messageError) {
      isCanFinishTemp = false;
      return false
    }
    return true
  })
  return isCanFinishTemp
}

const isCanFinish = checkIsCanFinish()

  return {
      currentStep,
      setCurrentStep,
      products,
      fileName,
      isLoading,
      onUploadFile,
      onRemoveFile,
      onBack,
      onNext,
      isCanNext,
      onSave,
      onDownloadSample,
      errorUploadMessage,
      isCanFinish
  }
}
