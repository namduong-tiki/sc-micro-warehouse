import React from 'react'
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
`

export const renderWarningStep2: any = () => {
    return (
        <Row>
        <div>
          <span style={{marginRight:7,fontSize:7}}>
          &#9679;
          </span>
        </div>
        <span>
            Các sản phẩm <b>có số lượng bằng 0</b> sẽ <span style={{color:'orange'}}>tự động bị xóa</span> khỏi danh sách rút hàng của kho.
        </span>
      </Row>
      
        
    )
}