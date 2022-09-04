import SizedBox from '@/components/SizedBox';
import { Search } from '@tikivn/sc-frontend-common';
import { Col, Row, Button } from 'antd';
import styled from 'styled-components';
import { useFormatMessage } from '@/utils/locale';
import { PlusOutlined } from '@ant-design/icons';
import SelectStatus from '../../components/SelectStatus';
import DatePicker from '@/components/DatePicker';
import dayjs from 'dayjs';
import DrawerFilter from '../../components/DrawerFilter';
import { useFilterHook } from './filterHook';

const Container = styled.div`
  padding: 16px 24px;
`;
const StyledButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 40px;
`;

type Props = {};

export default function Filter({}: Props) {
  const formatMessage = useFormatMessage();
  const {
    statusValue,
    onSelectDate,
    onSelectStatus,
    onOpenDrawer,
    onCloseDrawer,
    isOpenDrawer,
    expectedPickupDate,
    searchValue,
    onChangeSearch,
    optionsStatus
  } = useFilterHook();

  return (
    <>
      <DrawerFilter isVisible={isOpenDrawer} onClose={onCloseDrawer} />
      <Container>
        <Row gutter={24}>
          <Col span={12}>
            <Search
              size="large"
              id="search-1"
              placeholder={formatMessage({
                id: 'Nhập tối đa 50 mã phiếu cách nhau bằng dấu ‘ , ‘',
              })}
              value={searchValue}
              onChange={onChangeSearch}
            />
          </Col>
          <Col span={12}>
            <Row>
              <div style={{ height: 40 }}>
                <SelectStatus statusValue={statusValue} onSelectStatus={onSelectStatus} options={optionsStatus}/>
              </div>
              <SizedBox width={'8px'} />
              <DatePicker
                format="DD/MM/YYYY"
                name="start_date"
                onChange={onSelectDate}
                value={expectedPickupDate && dayjs(expectedPickupDate, 'YYYY-MM-DD')}
                defaultValue={expectedPickupDate && dayjs(expectedPickupDate, 'YYYY-MM-DD')}
                placeholder={formatMessage({ id: 'Lịch rút hàng' })}
                style={{
                  minWidth: 180,
                  borderColor: !!expectedPickupDate ? '#40a9ff' : '#d9d9d9',
                }}
              />

              <SizedBox width={'8px'} />
              <StyledButton onClick={onOpenDrawer}>
                {formatMessage({ id: 'bpor.another_filter' })}
                <SizedBox width="6px" />
                <PlusOutlined />
              </StyledButton>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
