import React from 'react'
import { Breadcrumb,Col,Row} from 'antd';
// import { Link } from "react-router-dom";
import { formatMessage } from '@/utils/locale';

const BreadcrumbFBT = () => {
    return (
      <Row wrap={false} style={{marginBottom:1}}>
        <Col flex='auto'>
          <Breadcrumb>
            <Breadcrumb.Item>       
              <a >
                {formatMessage({id:'bpor.home'})}
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{formatMessage({id:'bpor'})}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

    );
}

export default BreadcrumbFBT


