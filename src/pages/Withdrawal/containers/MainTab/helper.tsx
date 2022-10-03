import { NormalText, Text0 } from '@/components/Text';
import { formatMessage } from '@/utils/locale';
import { Checkbox } from 'antd';
import dayjs from 'dayjs';
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
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'bpor.code' })}</Text0>,
      width: '16%',
      dataIndex: 'name',
      render: (_: any, record: any) => <Code record={record} />,
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'bpor.type/reason' })}
          </Text0>
        </>
      ),
      width: '13%',
      key: 'sl',
      render: (_: any, record: any) => <TypeAndReason record={record} />,
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'bpor.status' })}
          </Text0>
        </>
      ),
      width: '16%',
      key: 'sl',
      render: (_: any, record: any) => <Status record={record} />,
    },
    {
      title: () => (
        <>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'bpor.warehouseCamel' })}/
          </Text0>
          <Text0 style={{ display: 'block' }} fontWeight="600">
            {formatMessage({ id: 'bpor.number' })}
          </Text0>
        </>
      ),
      width: '16%',
      render: (_: any, record: any) => <Warehouse record={record} />,
    },
    {
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'bpor.note' })}</Text0>,
      width: '13%',
      dataIndex: 'name',
      render: (_: any, record: any) => <Note record={record} />,
    },
    {
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'bpor.last_update' })}</Text0>,
      width: '9%',
      dataIndex: 'name',
      render: (_: any, record: any) => (
        <NormalText>
          {record?.updated_at ? dayjs.unix(record?.updated_at).format('DD/MM/YYYY - HH:mm:ss') : ''}
        </NormalText>
      ),
    },
    {
      title: () => <Text0 fontWeight="600">{formatMessage({ id: 'bpor.manipulation' })}</Text0>,
      width: '14%',
      dataIndex: 'name',
      render: (_: any, record: any) => <Action record={record} />,
    },
  ];
};

