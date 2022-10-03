import { Search } from '@tikivn/sc-frontend-common';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { LINK_CDN_IMAGE } from '@/constants/link';
import DrawerFilter from '../../components/DrawerFilter';
import { useFilterHook } from './filterHook';

const {filterIcon} = LINK_CDN_IMAGE


const Container = styled.div`
  padding: 16px 24px;
`;
type Props = {};

export default function FilterMobile({}: Props) {
  const {
    placeholderInput,
    onOpenDrawer,
    onCloseDrawer,
    isOpenDrawer,
    searchValue,
    onChangeSearch,
  } = useFilterHook();

  return (
    <>
      <DrawerFilter isVisible={isOpenDrawer} onClose={onCloseDrawer} />
      <Container>
        <Row gutter={24}>
          <Col span={22}>
            <Search
              size="large"
              id="search-1"
              placeholder={placeholderInput}
              value={searchValue}
              onChange={onChangeSearch}
            />
          </Col>
          <Col span={2} style={{display:'flex',flexDirection:'column',alignItems:'flex-end',justifyContent:'center'}}>
          <img
            onClick={onOpenDrawer}
            height={20}
            width={20}
            src={filterIcon}
            alt=''
          />
        </Col>
    
        </Row>
      </Container>
    </>
  );
}
