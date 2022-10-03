import React from 'react'
import { Pagination as PaginationAnt } from 'antd';
import styled from 'styled-components';
import { useFormatMessage } from '@/utils/locale';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: white;
    margin: 10px 0;
`  

const Pagination = ({listingInfo,onPageChange}: any) => {
    const formatMessage = useFormatMessage();

  return (
    <>
         <Container>
        <PaginationAnt
          defaultCurrent={listingInfo?.current_page || 1}
          current={listingInfo?.current_page || 1}
          total={listingInfo?.total}
          onChange={ (page, pageSize) => onPageChange(page, pageSize)} 
          size='small'
          showSizeChanger
          responsive
          defaultPageSize={20}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]}(${formatMessage({ id: 'bpor.sum.total' })}: ${total})`}
        />
      </Container>
    </>
  )
}

export default Pagination