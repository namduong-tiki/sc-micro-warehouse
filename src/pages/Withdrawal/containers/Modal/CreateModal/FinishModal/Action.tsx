

import React from 'react'
import { Input, Row, Col } from 'antd';
import { useFormatMessage } from '@/utils/locale';
import SizedBox from '@/components/SizedBox';

const Action = ({
  code,
  note,
  onChangeCode,
  onChangeNote,
}:any) => {
  const formatMessage = useFormatMessage()
  return (
    <>

      <Row gutter={[12, 12]} style={{ marginTop: 12, padding: 0 }}>
          <Col span={24} style={{ marginRight: '12px', padding: 0 }}>
            <Input
              style={{
                width: '100%',
              }}
              value={code}
              onChange={onChangeCode}
              placeholder={formatMessage({ id: 'Nhập mã phiếu rút Nhà bán (không bắt buộc)' })}
            />
            <SizedBox height="7px" />
            <Input
              style={{
                width: '100%',
              }}
              value={note}
              onChange={onChangeNote}
              placeholder={formatMessage({ id: 'Nhập ghi chú (không bắt buộc)' })}
            />
          </Col>
    
      </Row>

    </>

  )
}

export default Action

