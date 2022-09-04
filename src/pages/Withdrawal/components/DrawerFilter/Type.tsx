import { Divider, Checkbox, Row, Col } from 'antd';
import React from 'react'
import { formatMessage } from '@/utils/locale';
import { STOCK_TYPE } from '../../constants/stockType';

import TitleField from './TitleField'
import SizedBox from '@/components/SizedBox';

interface TypeProps {
  type? :any,
  onChangeType?: any
}

const Type: React.FC<TypeProps> = ({
  type,
  onChangeType
}) => {
  const valuesType = type ? type.split(',') : []
  const onClear = () => onChangeType(null)
  const arr = [STOCK_TYPE.backorder, STOCK_TYPE.instock]

  const onCheck = (rawValue:any) => {
    return onChangeType([...rawValue])
  }

  return (
    <>
      <TitleField title={formatMessage({ id: 'Loại phiếu gửi' })} action={onClear} />
      <SizedBox height='10px' />
      <Checkbox.Group 
        value={valuesType}
        style={{ width: '100%' }}
        onChange={onCheck}
      >
        <Row gutter={[0, 8]}>
          {arr.map(option => {
            return (
              <Col span={12} key={option.key}>
                <Checkbox 
                  value={option.key}
                >
                  {formatMessage({ id: option.name })}
                </Checkbox>
              </Col>
            )
          })}
        </Row>
      </Checkbox.Group>
      <Divider style={{ margin: '16px 0px' }} />


    </>
  )
}

export default Type;
