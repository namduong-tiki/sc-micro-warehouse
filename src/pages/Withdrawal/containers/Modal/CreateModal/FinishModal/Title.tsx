import { Row,Col } from 'antd'
import React from 'react'
import { CheckCircleFilled } from '@ant-design/icons';
import { useFormatMessage } from '@/utils/locale';
import { HeadTitle1 } from '@/components/Text';

interface Props {
  total: any
}

const Title:React.FC<Props> = ({total = 0}) => {
  const formatMessage = useFormatMessage()
    return(
      <Row
        style={{
        display: 'flex',
        alignItems:'center',
        flexDirection:'row'
      }}
        gutter={12}
      >
        <Col style={{marginRight:'12px'}}>
          <CheckCircleFilled style={{fontSize:18, marginRight:10, color:'#52C41A'}} />
          <HeadTitle1 size="20px">
            {formatMessage({id:'Có n phiếu gửi hàng mới được tạo thành công'},{value:total})}
          </HeadTitle1>
        </Col>
      </Row>
    )
}

export default Title
