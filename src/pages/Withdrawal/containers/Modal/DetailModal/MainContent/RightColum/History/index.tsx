import React from 'react';
import { Steps } from 'antd';
import dayjs from 'dayjs';
import { HeadTitle2, Text0, Title1 } from '@/components/Text';
import { formatMessage } from '@/utils/locale';
import SizedBox from '@/components/SizedBox';

const { Step } = Steps;

interface Props {
  [key: string]: any;
}

const History: React.FC<Props> = ({ histories }) => {
  if (!histories) return null;
  const isVietSub = localStorage.getItem('umi_locale') === 'vi-VN';
  return (
    <>
      <HeadTitle2>{formatMessage({ id: 'bpor.history' })}</HeadTitle2>
      <SizedBox height="5px" />

      <Steps progressDot current={1} direction="vertical">
        {histories.map((history: any, index: number) => {
          return (
            <Step
              key={index}
              title={
                <>
                  <Title1 style={{ display: 'block' }}>
                    {isVietSub ? history?.status_vi : history?.status_en}
                  </Title1>
                  <Text0 style={{ display: 'block' }}>
                    {dayjs(history?.created_at).format('DD/MM/YYYY - HH:mm:ss')}
                  </Text0>
                </>
              }
              description={<Description history={history} />}
            />
          );
        })}
      </Steps>
    </>
  );
};

export default History;

const handleConvertDataHistory = (history: any) => {
  const data: any[] = [];
  const updateBy = history?.updated_by;
  if (updateBy) {
    data.push({ content: `Cập nhât bởi: ${updateBy}` });
  }
  return data;
};

const Description = ({ history }: any) => {
  const data = handleConvertDataHistory(history);
  return (
    <>
      {data.map((i: any, index: any) => {
        return <div key={index}>{i?.content}</div>;
      })}
    </>
  );
};
