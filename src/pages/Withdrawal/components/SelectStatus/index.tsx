import React, { useState } from 'react';
import { Popover, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import { formatMessage } from '@/utils/locale';
import { DownOutlined } from '@ant-design/icons';
import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import { BPOR_STATUS } from '../../constants/status';
import SizedBox from '@/components/SizedBox';

interface ButtonProps {
  isFiltering?: Boolean;
}

interface SelectStatusProps {
  statusValue?: any;
  options?: any
  onSelectStatus: any;
}

const StyledButton = styled(Button)<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 40px;
  color: ${(props) => (props?.isFiltering ? 'black' : 'rgba(0, 0, 0, 0.25)')};
  border-color: ${(props) => props?.isFiltering && '#40a9ff'};
`;
const IconDropdown = styled(DownOutlined)`
  font-size: 12px;
  margin-top: 4px;
`;
const SelectContainer = styled.div`
  width: 292px;
  max-height: 254px;
  display: flex;
  flex-direction: column;
  justify-content: center ;
  margin-top: 5px;
`;
const SelectContent = styled.div`
  max-height: 254px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

`;
const SelectFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CheckboxStyled = styled(Checkbox)`
  margin-left: 8px;
  margin-bottom: 14px;
`;

const SelectStatus = ({ statusValue = [], onSelectStatus, options = [] }: SelectStatusProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [valueState, setValueState] = useState(statusValue);

  const onClearAll = () => {
    setIsVisible(false);
    onSelectStatus([]);
  };

  const onApply = () => {
    setIsVisible(false);
    onSelectStatus(valueState);
  };

  const onCheck = (status: any) => {
    const indexStatus = findIndex(valueState, (st) => st === status);
    if (indexStatus !== -1) {
      const temp = valueState.filter((st: any) => st !== status);
      return setValueState(temp);
    }
    return setValueState([...valueState, status]);
  };

  const isFiltering = statusValue.length > 0;
  return (
    <>
      {/* <SizedBox width={'8px'} /> */}
      <Popover
        visible={isVisible}
        placement="bottom"
        title={null}
        content={
          <SelectStatusContent
            options={options}
            onApply={onApply}
            onClearAll={onClearAll}
            onCheck={onCheck}
            valueState={valueState}
          />
        }
        onVisibleChange={(value) => {
          setIsVisible(value);
          setValueState(statusValue);
        }}
        trigger="click"
      >
        <StyledButton isFiltering={isFiltering} onClick={() => setIsVisible(true)}>
          {formatMessage({ id: 'bpor.status' })}
          <SizedBox width="12px" />
          <IconDropdown />
        </StyledButton>
      </Popover>
    </>
  );
};

export default SelectStatus;

interface SelectStatusContentProps {
  onApply: any;
  onClearAll: any;
  onCheck: Function;
  valueState: any;
  options:any;
}

const SelectStatusContent = ({
  onApply,
  onClearAll,
  onCheck,
  valueState,
  options
}: SelectStatusContentProps) => {
  return (
    <SelectContainer>
      <SelectContent>
        {options.map((item:any, key:number) => {
          return <SelectItem key={key} item={item} value={valueState} onCheck={onCheck} />;
        })}
      </SelectContent>
      <SelectFooter>
        <Button style={{ flex: 1 }} onClick={onClearAll}>
          {formatMessage({ id: 'Bỏ lọc' })}
        </Button>
        <SizedBox width="20px" />
        <Button type="primary" style={{ flex: 1 }} onClick={onApply}>
          {formatMessage({ id: 'Áp dụng' })}
        </Button>
      </SelectFooter>
    </SelectContainer>
  );
};

interface SelectItemProps {
  item: any;
  onCheck: any;
  value: any;
}

const SelectItem = ({ item, onCheck, value = [] }: SelectItemProps) => {
  const isChecked = value.includes(item?.key);
  return (
    <>
      <CheckboxStyled
        checked={isChecked}
        value={get(BPOR_STATUS, [item, 'key'])}
        onChange={() => onCheck(item?.key)}
      >
        {item?.value}
      </CheckboxStyled>
    </>
  );
};
