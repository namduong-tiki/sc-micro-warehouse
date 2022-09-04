import { Button, Table } from 'antd';
import styled from 'styled-components';
import { DownloadOutlined } from '@ant-design/icons';
import SizedBox from '@/components/SizedBox';
import { renderColumns } from './helper';
import { useListingHook } from './mainTabHook';
import { useFormatMessage } from '@/utils/locale';

const Container = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  padding: 24px;
`;
const SupContainer = styled.div`
  background-color: white;
  width: 100%;
  padding: 24px;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
`;
const Line = styled.div`
  height: 24px;
  margin: 0px 12px;
  border: 1px solid #d9d9d9;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTable = styled(Table)`
  &&& .ant-table {
    .ant-table-container {
      border-left: 1px solid #d9d9d9;
      border-top: 1px solid #d9d9d9;
    }
    & .ant-table-thead > tr > th.ant-table-cell {
      border-bottom: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
      background-color: #f5f5f5;
    }
    & .ant-table-tbody > tr > td.ant-table-cell {
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #d9d9d9;
    }
    & .ant-table-tbody > tr > td.ant-table-cell:last-child {
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
    }
  }
`;

const MainTab: React.FC = () => {
  const { listing, listingInfo, onPageChange, limit,selected, onSelect, isAllSelected, isIndeterminate } = useListingHook();
  const formatMessage = useFormatMessage();
  return (
    <Container>
      <SupContainer>
        <Row>
          <Title>{formatMessage({id:'Phiếu rút hàng'})}: {listingInfo?.total}</Title>
          <Line />
          <Button>
            <DownloadOutlined />
            {formatMessage({id:'Xuất danh sách BPOR'})}
          </Button>
        </Row>
        <SizedBox height="24px" />
        <StyledTable
          dataSource={listing}
          columns={renderColumns({
            selected,
            onSelect,
            isAllSelected,
            isIndeterminate,
          })}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          bordered
          pagination={{
            pageSize: limit,
            current: listingInfo?.current_page || 1,
            total: listingInfo?.total,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]}(${formatMessage({ id: 'Tổng cộng' })}: ${total})`,
            onChange: (page, pageSize) => onPageChange(page, pageSize),
          }}
        />
      </SupContainer>
    </Container>
  );
};

export default MainTab;
