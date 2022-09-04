import get from 'lodash/get';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import { useFormatMessage } from '@/utils/locale';
import SizedBox from '@/components/SizedBox';
import Action from './Action';
import { setFinishDataModal } from '@/pages/Withdrawal/utils/setDataModal';

const TextBox = styled.div`
  flex-direction: row;
  align-items: center;
  display: flex;
`;
const Title = styled.span`
  color: #262626;
  font-size: 16px;
  font-weight: 700;
  margin-right: 6px;
`;
type Props = {
  item: any,
  index:any,
}


const Item:React.FC<Props> = ({ item = {} }) => {
  const [code, setCode] = useState('');
  const [note, setNote] = useState('');

  const id = item?.id

  const onChangeCode = (input: any) => {
    const valueRaw = input?.target?.value
    const value = valueRaw.replaceAll(' ', '')
    setFinishDataModal(id, { code: value, note })
    setCode(value)
  };

  const onChangeNote = (input: any) => {
    const value = input?.target?.value
    setFinishDataModal(id, { code, note: value })
    setNote(value)
  };
  const time = item?.created_at
  ? dayjs.unix(item?.created_at).format('DD/MM/YYYY - HH:mm:ss')
  : '';
  return (
    <>
      <SizedBox height="12px" />
      <>
        <TextBox style={{ borderTop: '1px solid #D9D9D9', paddingTop: '12px' }}>
          <Title>BPOR nháp - {time}</Title> <Tag>Trạng thái: Nháp</Tag>
        </TextBox>
      </>

      <Action
        note={note}
        code={code}
        onChangeCode={onChangeCode}
        onChangeNote={onChangeNote}
        item={item}
        // selectedId={selectedId}
        // timeSlotsSelected={timeSlotsSelected}
        // isNotEdit={isNotEdit}
        // referenceCode={referenceCode}
      />
    </>
  );
};

export default Item;
