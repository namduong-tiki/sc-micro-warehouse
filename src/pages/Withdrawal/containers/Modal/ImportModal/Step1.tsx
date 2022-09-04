import React from 'react'
import { Upload } from 'antd';
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import SizedBox from '@/components/SizedBox';
import { Link1, NormalText, SubTitle1, Text0 } from '@/components/Text';
import { useFormatMessage } from '@/utils/locale';

const { Dragger } = Upload;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`


const Step1 = ({
  onRemoveFile,
  onUploadFile,
  fileName,
  onDownloadSample,
  errorUploadMessage
}:any) => {
  const formatMessage = useFormatMessage()

  const props:any = {
    accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    name: 'file',
    multiple: false,

    async action(file:any) {
      onUploadFile(file)
    },
    beforeUpload(file:any) {
      const size = file?.size || 0
      if (parseInt(size, 10) > (10240000)) {
        return false
      }
      return true
    },
    showUploadList:false,
  };

  return (
    <>
      <Text0>
        {formatMessage({ id: 'Tải tập tin mẫu' })} <Link1 onClick={onDownloadSample}>{formatMessage({ id: 'tại đây' })}</Link1>
      </Text0>
      <SizedBox height='16px' />
      <div style={{height:200, width:'100%'}}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <Text0 style={{ display: 'block' }}>{formatMessage({ id: 'Nhấn hoặc kéo thả tập tin để tải lên' })}</Text0>
          <SubTitle1 style={{ display: 'block' }}>
            {formatMessage({ id: 'Chỉ chấp nhận tập tin có định dạng .xls và .xlsx tối đa 10MB' })}
          </SubTitle1>
          <SubTitle1>
            {formatMessage({ id: 'Hỗ trợ tối đa 1000 SKU mỗi tập tin' })}
          </SubTitle1>
        </Dragger>
      </div>
      {fileName &&
        <TextBox>
          <NormalText color='blue'>
            {fileName}
          </NormalText>
          <Link1
            color='red'
            onClick={onRemoveFile}
            size='15px'
          >
            <DeleteOutlined />
          </Link1>
        </TextBox>
      }
      {errorUploadMessage &&
      <TextBox>
        <NormalText color='red'>
          {errorUploadMessage}
        </NormalText>

      </TextBox>
      }

    </>
  )
}

export default Step1
