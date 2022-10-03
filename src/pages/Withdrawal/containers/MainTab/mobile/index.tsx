import styled from 'styled-components';
import SizedBox from '@/components/SizedBox';
import { useListingHook } from '../mainTabHook';
import { useFormatMessage } from '@/utils/locale';
import List from './List';
import Pagination from './Pagination';

const Container = styled.div`
  background-color: white;
  width: 100%;
  padding: 0 24px;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MainTabMobile: React.FC = () => {
  const {
    listing,
    listingInfo,
    onPageChange,
    limit,
  } = useListingHook();

  const formatMessage = useFormatMessage();
  return (
    <Container>
      <Row>
        <Title>
          {formatMessage({ id: 'bpor' })}: {listingInfo?.total}
        </Title>
      </Row>
      <SizedBox height="12px" />
      <div style={{ height: 3, backgroundColor: '#f5f5f5' }} />
      <SizedBox height="12px" />
      <List dataSource={listing} />
      <SizedBox height="6px" />
      <Pagination listingInfo={listingInfo} limit={limit} onPageChange={onPageChange} />
      <SizedBox height="12px" />
    </Container>
  );
};

export default MainTabMobile;
