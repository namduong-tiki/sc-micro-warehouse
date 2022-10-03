import React  from 'react';
import Barcode from 'react-barcode';
import { Divider, Spin, Table } from 'antd';

import dayjs from 'dayjs';
import { usePrintBPOR } from './printBPORHook';

const SizedBox = ({ height }: any) => {
  return (
    <div
      style={{
        height,
      }}
    />
  );
};

const Text0 = ({ children, style, size }: any) => {
  return (
    <span
      style={{
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: size || '14px',
        color: '#262626',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

const Title1 = ({ children, style, size }: any) => {
  return (
    <span
      style={{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: size || '14px',
        color: '#262626',
        ...style,
      }}
    >
      {children}
    </span>
  );
};
const SubTitle1 = ({ children, style, size }: any) => {
  return (
    <span
      style={{
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: size || '14px',
        color: '#8C8C8C',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

const HeaderChild = ({ children, style }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const InfoChild = ({ children, style }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Field = ({ title, content }: any) => {
  return (
    <span style={{ display: 'block' }}>
      <Title1>{title}</Title1>: <Text0>{content ? content : 'Không tìm thấy dữ liệu'}</Text0>
    </span>
  );
};
const FieldNote = ({ content }: any) => {
  return (
    <span style={{ display: 'block' }}>
      <Text0 style={{ fontStyle: 'italic', color: '#8C8C8C' }}>({content})</Text0>
    </span>
  );
};

const SignContainer = ({ title }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        margin: 5
      }}
    >
      <Title1>{title}</Title1>
      <span>Ngày......tháng......năm......</span>
      <SubTitle1 style={{ marginBottom: 8 }}>(ký & ghi rõ họ tên)</SubTitle1>
      <div
        style={{
          height: '100px',
          width: '250px',
          border: '1px solid #d9d9d9',
        }}
      />
    </div>
  );
};
const columns = [
  {
    title: 'Mã sản phẩm',
    width: '15%',
    dataIndex: 'code',
    render: (_: any, record: any) => <Text0>{record?.product_unit}</Text0>,
  },
  {
    title: 'SKU',
    width: '15%',
    dataIndex: 'sku',
    render: (_: any, record: any) => <Text0>{record?.product_sku}</Text0>,
  },
  {
    title: 'Tên sản phẩm',
    width: '30%',
    dataIndex: 'name',
    render: (_: any, record: any) => <Text0>{record?.product_name}</Text0>,
  },
  {
    title: 'Số lượng',
    width: '15%',
    dataIndex: 'name',
    render: (_: any, record: any) => <Text0>{record?.expected_qty}</Text0>,
  },
  {
    title: 'Ghi chú',
    width: '20%',
    dataIndex: 'name',
    render: (_: any, record: any) => <Text0>{record?.note}</Text0>,
  },
];

const PrintBPOR = ({printCpnRef}:any) => {
  const { isLoading, detail, sellerInfo, warehouseInfo } = usePrintBPOR();
  const dataSource = detail?.items || [];
  return (
    <>
      <Spin tip="Loading..." spinning={isLoading}>
        <div
          style={{
            padding: '0 24px',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          key="print-preview"
          id="print-preview"
          ref={printCpnRef}
        >
          <div
            style={{
              // width: '1000px',
                            width: '1000px',
              height: '100%',
            }}
          >
            <div
              style={{
                height: '164px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <HeaderChild>
                <img src='https://uat.tikicdn.com/ts/ims/98/aa/ac/202946fb86a36ad1e8da9b1a18931225.png' alt="" style={{ width: 95, height: 66 }} />
              </HeaderChild>
              <HeaderChild style={{ alignItems: 'center' }}>
                <Title1 size="20px">{'Phiếu rút hàng'}</Title1>
                <Barcode value={detail?.code} height={60} />
              </HeaderChild>
            </div>
            <Divider />

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <InfoChild>
                <Field title={'Id nhà cung cấp'} content={detail?.seller_id} />
                <Field title={'Nhà cung cấp'} content={sellerInfo?.store_name} />
                <Field title={'Tên công ty/HKD'} content={sellerInfo?.tax_name} />
                <Field
                  title={'Tên người đại diện trên HĐ'}
                  content={sellerInfo?.business_representative}
                />
                <Field title={'Mã số thuế'} content={sellerInfo?.tax_code} />
                <Field title={'Số điện thoại'} content={sellerInfo?.contact_phone} />
                <Field title={'Email'} content={sellerInfo?.contact_email} />
              </InfoChild>
              <InfoChild>
                <Field title={'Mã BPOR'} content={detail?.code} />
                <Field
                  title={'Ngày tạo'}
                  content={
                    detail?.created_at ? dayjs.unix(detail?.created_at).format('DD/MM/YYYY') : ''
                  }
                />
                <Field
                  title={'Ngày nhận hàng dự kiến'}
                  content={
                    detail?.sla_pickup ? dayjs.unix(detail?.sla_pickup).format('DD/MM/YYYY') : ''
                  }
                />
                <Field
                  title={'Ngày sẵn sàng nhận hàng'}
                  content={
                    detail?.sla_pickup ? dayjs.unix(detail?.sla_pickup).format('DD/MM/YYYY') : ''
                  }
                />
              </InfoChild>
              <InfoChild>
                <Field
                  title={'Địa chỉ nhận hàng'}
                  content={`Kho ${warehouseInfo?.name}: ${warehouseInfo?.address}`}
                />
                <FieldNote content={warehouseInfo?.contact_withdrawal} />
                <Field title={'Ghi chú'} content={detail?.note ? detail?.note : ' '} />
              </InfoChild>
            </div>
            <SizedBox height="20px" />

            <div
              style={{
                margin: '20px 0px',
              }}
            >
              <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
            </div>

            <Text0 style={{ fontStyle: 'italic' }}>
              **Lưu ý: Đối với gian hàng là công ty, cần phải có dấu mộc tròn (mộc đỏ) trên phiếu
              rút hàng.
            </Text0>
            <SizedBox height="20px" />

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <SignContainer title={'Người rút hàng'} />

              <SignContainer title={'Người nhập phiếu (dành cho D2D)'} />

              <SignContainer title={'Kho Tiki'} />
            </div>
            <SizedBox height="40px" />
          </div>
        </div>
      </Spin>
    </>
  );
};

export default PrintBPOR;
