import React, { useState } from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import SizedBox from '@/components/SizedBox';
import Action from './Action';
import { setFinishDataModal } from '@/pages/Withdrawal/utils/setDataModal';
import { formatMessage } from '@/utils/locale';

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
  item: any;
  index: any;
};

const Item: React.FC<Props> = ({ item = {}, index }) => {
  const [code, setCode] = useState('');
  const [note, setNote] = useState('');

  const id = item?.id;

  const onChangeCode = (input: any) => {
    const valueRaw = input?.target?.value;
    const value = valueRaw.replaceAll(' ', '');
    setFinishDataModal(id, { code: value, note });
    setCode(value);
  };

  const onChangeNote = (input: any) => {
    const value = input?.target?.value;
    setFinishDataModal(id, { code, note: value });
    setNote(value);
  };
  const time = item?.created_at ? dayjs(item?.created_at).format('DD/MM/YYYY - HH:mm:ss') : '';
  return (
    <>
     {!!(index) && <SizedBox height="12px" />}
      <>
        <TextBox style={index ? { borderTop: '1px solid #D9D9D9', paddingTop: '12px' } : {}}>
          <Title>BPOR nháp - {time}</Title> <Tag>{formatMessage({id:'bpor.status'})}: Nháp</Tag>
        </TextBox>
      </>

      <Action
        note={note}
        code={code}
        onChangeCode={onChangeCode}
        onChangeNote={onChangeNote}
        item={item}
      />
    </>
  );
};

export default Item;
