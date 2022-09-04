import { NormalText, Text0 } from '@/components/Text';
import { formatMessage } from '@/utils/locale';
import { Checkbox } from 'antd';
import dayjs from 'dayjs';
import { LIST_STATUS_TAB_DRAFT } from '../../constants/status';
import Action from './Action';
import Code from './Code';
import Note from './Note';
import Status from './Status';
import TypeAndReason from './TypeAndReason';
import Warehouse from './Warehouse';

export const renderColumns = ({ selected, onSelect, isAllSelected, isIndeterminate }: any) => {
  return [
    {
      title: () => (
        <Checkbox
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          onChange={() => onSelect()}
        />
      ),
      width: '3%',
      key: 'checkbox',
      dataIndex: 'checkbox',
      render: (_: any, record: any) => (
        <Checkbox
          checked={selected.includes(record.id)}
          onChange={() => onSelect(record?.id)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'Mã phiếu rút' })}</Text0>,
      width: '14%',
      dataIndex: 'name',
      render: (_: any, record: any) => <Code record={record} />,
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'Loại BPOR/Lý do' })}
          </Text0>
        </>
      ),
      width: '14%',
      key: 'sl',
      render: (_: any, record: any) => <TypeAndReason record={record} />,
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'Trạng thái' })}
          </Text0>
        </>
      ),
      width: '17%',
      key: 'sl',
      render: (_: any, record: any) => <Status record={record} />,
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'Kho hàng' })}/
          </Text0>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'Số lượng' })}
          </Text0>
        </>
      ),
      width: '16%',
      render: (_: any, record: any) => <Warehouse record={record} />,
    },
    {
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'Ghi chú' })}</Text0>,
      width: '14%',
      dataIndex: 'name',
      render: (_: any, record: any) => <Note record={record} />,
    },
    {
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'Lần cập nhật cuối' })}</Text0>,
      width: '9%',
      dataIndex: 'name',
      render: (_: any, record: any) => (
        <NormalText>
          {record?.updated_at ? dayjs.unix(record?.updated_at).format('DD/MM/YYYY - HH:mm:ss') : ''}
        </NormalText>
      ),
    },
    {
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'Thao tác' })}</Text0>,
      width: '13%',
      dataIndex: 'name',
      render: (_: any, record: any) => <Action record={record} />,
    },
  ];
};

export const checkIsDraftBPOR = (status: string) => {
  const arrDraft = LIST_STATUS_TAB_DRAFT.map((i) => i?.key);
  return arrDraft.includes(status);
};
