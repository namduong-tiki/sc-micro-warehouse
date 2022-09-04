import React, { useState } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useFormatMessage } from '@/utils/locale';
import { delay } from '@/utils';

const onCopy = (textParam: any) => navigator.clipboard.writeText(textParam);

interface Props {
  text: any;
}

const Copy: React.FC<Props> = ({ text }) => {
  const formatMessage = useFormatMessage();
  const [textHover, setTextHover] = useState(formatMessage({ id: 'Copy' }));
  const onClick = () => {
    onCopy(text);
    setTextHover(formatMessage({ id: 'Copied' }));
  };
  const onVisibleChange = async (visible: boolean) => {
    if (!visible) {
      await delay(300);
      setTextHover(formatMessage({ id: 'Copy' }));
    }
  };
  return (
    <Tooltip title={textHover} trigger="hover" onVisibleChange={onVisibleChange}>
      <CopyOutlined onClick={onClick} />
    </Tooltip>
  );
};

export default Copy;
