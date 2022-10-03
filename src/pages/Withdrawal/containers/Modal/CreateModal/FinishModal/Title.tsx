import { Row,Col } from 'antd'
import React from 'react'
import { CheckCircleFilled,CloseCircleOutlined } from '@ant-design/icons';
import { useFormatMessage } from '@/utils/locale';
import { HeadTitle1 } from '@/components/Text';

interface Props {
  total: any,
  totalError: any
}

const Title:React.FC<Props> = ({total = 0,totalError = 0}) => {
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
          {total ? <CheckCircleFilled style={{fontSize:18, marginRight:10, color:'#52C41A'}} /> : <CloseCircleOutlined style={{fontSize:18, marginRight:10, color:'red'}}  />}
          <HeadTitle1 size="20px">
            {total ? formatMessage({id:'bpor.create.finish.title'},{value:total}) : formatMessage({id:'bpor.create.finish.title.failed'},{value:totalError})}
          </HeadTitle1>
        </Col>
      </Row>
    )
}

export default Title
