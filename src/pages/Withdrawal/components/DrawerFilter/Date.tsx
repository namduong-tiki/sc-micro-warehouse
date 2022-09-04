import { Divider } from 'antd';
import React from 'react'
import { formatMessage } from '@/utils/locale';
import moment from 'dayjs';
import TitleField from './TitleField'
import SizedBox from '@/components/SizedBox';
import DatePicker from '@/components/DatePicker';


interface DateProps {
  onSelectDate?: any,
  expectedInboundDate?: any,
}

const Date: React.FC<DateProps> = ({
    onSelectDate,
    expectedInboundDate,
}) => {
  const onClear= () => onSelectDate(null)
    return (
      <>
        <TitleField title={formatMessage({id:'Lịch nhập hàng'})} action={onClear} />
        <SizedBox height='10px' />
        <DatePicker
          inputReadOnly
          format="DD/MM/YYYY"
          name="start_date"
          onChange={onSelectDate}
          defaultValue={expectedInboundDate && moment(expectedInboundDate, 'YYYY-MM-DD')}
          value={expectedInboundDate && moment(expectedInboundDate, 'YYYY-MM-DD')}
          placeholder={'Lịch nhập hàng'}
          style={{ width: '100%' }}
        />
        <Divider style={{margin:'16px 0px'}} />
      </>
    )
}

export default Date;
