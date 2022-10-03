import { formatMessage } from '@/utils/locale';
import { Select, SelectProps, Spin } from 'antd';
import React from 'react';
import { useCanSelectSeller, useSellers } from '../hooks';

interface SellerSelectProps extends SelectProps {
  sellerId: string | number;
  onSelect: (sellerId: number | undefined) => void;
}

const SellerSelect: React.FC<SellerSelectProps> = ({ sellerId, onSelect, ...props }) => {
  const { sellers, fetching, onSearch } = useSellers(sellerId);
  const canSelectSeller = useCanSelectSeller();

  const onSelectSeller = (id: number | undefined) => {
    onSelect(id);
  };

  if (!canSelectSeller) return null;
  const value = sellerId && Number(sellerId);
  return (
    <Select
      value={value}
      placeholder={formatMessage({ id: 'input.please-select-seller' })}
      onChange={onSelectSeller}
      showSearch
      onSearch={onSearch}
      loading={fetching}
      filterOption={false}
      allowClear
      notFoundContent={
        fetching ? <Spin size="small" spinning /> : formatMessage({ id: 'common.result-not-found' })
      }
      {...props}
    >
      {!fetching &&
        sellers.map((seller) => (
          <Select.Option key={seller.id} value={seller.id}>
            {seller.name}
          </Select.Option>
        ))}
    </Select>
  );
};

export default SellerSelect;
