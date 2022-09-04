import { formatMessage } from '@/utils/locale';

// export const REQUISITION_STATUS = {
//   draft: {
//     key: 'draft',
//     color: '#2DB7F5',

//     // value: 'Đang chỉnh sửa',
//     // colorTag:'processing',

//     value: 'Nháp',
//     colorTag:'processing',
//   },
//     waiting_for_items: {
//       key: 'waiting_for_items',
//       color: '#666666',

//       // value: 'Chờ nhận hàng',
//       // colorTag:'default'
//       value: 'Chờ nhập kho',
//       colorTag:'warning'
//     },
//     waiting_for_supplementation: {
//       key: 'waiting_for_supplementation',
//       value: 'Chờ bổ sung',
//       color: '#FA8C00',
//       colorTag:'warning',

//     },

//     done: {
//       key: 'done',
//       value: 'Đã hoàn tất',
//       colorTag:'success',
//       color: '#87D068'

//     },
//     denied: {
//       key: 'denied',
//       color: '#F50000',

//       // value: 'Từ chối',
//       // colorTag:'error',

//       value: 'Bị từ chối',
//       colorTag:'error'
//     },
//     canceled: {
//       key: 'canceled',
//       color: '#F50000',

//       // value: 'Hủy',
//       // colorTag:'error',
//       value: 'Đã huỷ',
//       colorTag:'default'
//     },
//     deleted: {
//       key: 'deleted',
//       value: 'Đã xoá',
//       colorTag:'error',
//       color: '#F50000'
//     }
//   };


  export const REQUISITION_STATUS = {
    draft: {
      key: 'draft',
      value: 'Nháp',
      colorTag:'processing',
    },
    waiting_for_items: {
      key: 'waiting_for_items',
      value: 'Chờ nhập kho',
      colorTag:'warning'
    },
    waiting_for_supplementation: {
      key: 'waiting_for_supplementation',
      value: 'Chờ bổ sung',
      colorTag:'warning',
    },
    done_partially: {
      key: 'done_partially',
      value: 'Nhập kho một phần',
      colorTag:'success'
    },
    done: {
      key: 'done',
      value: 'Nhập kho toàn bộ',
      colorTag:'success'
    },
    denied: {
      key: 'denied',
      value: 'Bị từ chối',
      colorTag:'error'
    },
    canceled: {
      key: 'canceled',
      value: 'Đã huỷ',
      colorTag:'default'
    },
 
  };




  export const HISTORY_REQUISITION_STATUS = {
    cancelled_po: {
      key: 'cancelled',
      value: 'Đã hủy',
      color: 'red'
    },
    cancelled_picking: {
      key: 'cancelled',
      value: 'Đã hủy',
      color: 'red'
    },
    received_picking: {
      key: 'received',
      value: 'Đã nhận',
      color: 'green'
    },
    reject_picking: {
      key: 'reject_picking',
      value: 'Kho tạm từ chối',
      color: 'yellow'
    }
  };

  export const STOCK_TYPE = {
    instock: {
      key: 'instock',
      name_tiki: 'Instock',
      name_seller: 'FBT - Hàng lưu kho Tiki',
      displayForSeller: true,
      isDisable: true,
      isTiki: true,
      value: 'FBT',
      description: 'Hàng lưu kho Tiki',
      name:'Phiếu gửi FBT'
    },
    backorder: {
      key: 'backorder',
      name_tiki: 'Backorder',
      name_seller: 'ODF - Hàng lưu kho nhà bán',
      displayForSeller: true,
      isDisable: false,
      isTiki: true,
      value: 'ODF',
      description: 'Hàng lưu kho nhà bán',
      name:'Phiếu gửi ODF'

    },
    seller_backorder: {
      key: 'seller_backorder',
      name_tiki: 'Fulfillment By Seller',
      name_seller: 'SD - Nhà bán tự vận hành',
      displayForSeller: true,
      isDisable: false,
      isTiki: true,
      value: 'SD',
      description: 'Nhà bán tự vận hành',
    },
    virtual: {
      key: 'virtual',
      name_tiki: 'eDelivery',
      name_seller: 'E-Delivery - Giao hàng điện tử',
      displayForSeller: true,
      isDisable: false,
      isTiki: true,
      value: 'E-Delivery',
      description: 'Giao hàng điện tử',
    },
    virtual_backorder: {
      key: 'virtual_backorder',
      name_tiki: 'eDelivery + Backorder',
      name_seller: 'E-Voucher & Voucher giấy',
      displayForSeller: true,
      isDisable: false,
      isTiki: true,
      value: 'E-Voucher & Voucher giấy',
      description: '',
    },
    cross_border: {
      key: 'cross_border',
      name_tiki: 'CrossBorder',
      name_seller: 'CrossBorder',
      displayForSeller: true,
      isDisable: false,
      isTiki: true,
      value: 'CrossBorder',
      description: '',
    },
    upcoming: {
      key: 'upcoming',
      name_tiki: 'Upcoming',
      name_seller: 'Upcoming',
      displayForSeller: false,
      isDisable: false,
      isTiki: true,
      value: 'Upcoming',
      description: '',
    },
    discontinued: {
      key: 'discontinued',
      name_tiki: 'Discontinued',
      name_seller: 'Discontinued',
      displayForSeller: false,
      isDisable: false,
      isTiki: true,
      value: 'Discontinued',
      description: '',
    },
    preorder: {
      key: 'preorder',
      name_tiki: 'Preorder',
      name_seller: 'Preorder',
      displayForSeller: false,
      isDisable: false,
      isTiki: true,
      value: 'Preorder',
      description: '',
    },
    multi_channels: {
      key: 'multi_channels',
      name_tiki: 'Multi Channels',
      name_seller: 'Multi Channels',
      displayForSeller: true,
      isDisable: false,
      isTiki: true,
      value: 'Multi Channels',
      description: '',
    },
    dropship: {
      key: 'dropship',
      name_tiki: 'Dropship',
      name_seller: 'Dropship - Nhà bán tự đóng gói, Tiki nhận hàng đi giao',
      displayForSeller: true,
      isDisable: false,
      isTiki: true,
      value: 'Dropship',
      description: 'Nhà bán tự đóng gói, Tiki nhận hàng đi giao',
    },
  };

  export const DELIVERY_TYPE = {
    seller:{
      key: 'self_delivery',
      value: formatMessage({id:'fbt.po.delivery_type.shipping_seller'}),
    },
    tiki:{
      key: 'carrier_pickup',
      value: formatMessage({id:'fbt.po.delivery_type.shipping_tiki'}),
    },
  }


  export const PICKUP_STATUS = {
    waiting: {
      key: 'waiting',
      value: 'Chờ VC xác nhận',
      color: '2DB7F5'
    },
    picking: {
      key: 'picking',
      value: 'VC đang lấy hàng',
      color: '2DB7F5'
    },
    canceled: {
      key: 'canceled',
      value: 'Lấy thất bại',
      color: 'F50000'
    },
    completed: {
      key: 'completed',
      value: 'Lấy thành công',
      color: '2DB7F5'
    },
    returning: {
      key: 'returning',
      value: 'Đang trả hàng Seller',
      color: '2DB7F5'
    },
    returned: {
      key: 'returned',
      value: 'Đã trả hàng Seller',
      color: '2DB7F5'
    },
    receiving_erp: {
      key: 'receiving_erp',
      value: 'Đang nhập kho',
      color: '2DB7F5'
    },
    received_erp: {
      key: 'received_erp',
      value: 'Hoàn thành nhập kho',
      color: '2DB7F5'
    },
     waiting_for_picking_up: {
      key: 'waiting_for_picking_up',
      value: 'Chờ để lấy hàng',
      color: '2DB7F5'
    },
    ready_for_picking_up: {
      key: 'ready_for_picking_up',
      value: 'Sẵn sàng để lấy hàng',
      color: '2DB7F5'
    },
    in_transit: {
      key: 'in_transit',
      value: 'Đang luân chuyển',
      color: '2DB7F5'
    },
    arrived_at_transit_hub: {
      key: 'arrived_at_transit_hub',
      value: 'Đang lưu kho VC',
      color: '2DB7F5'
    },
    storing: {
      key: 'storing',
      value: 'Đang lưu kho VC',
      color: '2DB7F5'
    },
    packed_in_masterbox: {
      key: 'packed_in_masterbox',
      value: 'Đang lưu kho VC',
      color: '2DB7F5'
    },
    arrived_at_destination_hub: {
      key: 'arrived_at_destination_hub',
      value: 'Đang lưu kho VC',
      color: '2DB7F5'
    },
    return_to_sender_triggered: {
      key: 'return_to_sender_triggered',
      value: 'Yêu cầu hoàn hàng',
      color: '2DB7F5'
    },
     onhold: {
      key: 'onhold',
      value: 'Tạm dừng',
      color: '2DB7F5'
    },
     requested_to_continue: {
      key: 'requested_to_continue',
      value: 'Tiếp tục xử lý',
      color: '2DB7F5'
    },
     delivering: {
      key: 'delivering',
      value: 'Đang giao hàng',
      color: '2DB7F5'
    },
    transferred_to_3pl: {
      key: 'transferred_to_3pl',
      value: 'Bàn giao đối tác',
      color: '2DB7F5'
    },
    successful_delivery: {
      key: 'successful_delivery',
      value: 'Giao hàng thành công',
      color: '2DB7F5'
    },
    pickup_failed: {
      key: 'pickup_failed',
      value: 'Lấy hàng không thành công',
      color: '2DB7F5'
    },
     failed_pickup_many_times: {
      key: 'failed_pickup_many_times',
      value: 'Lấy hàng không thành công nhiều lần',
      color: '2DB7F5'
    },
     successful_pickup: {
      key: 'successful_pickup',
      value: 'Lấy hàng thành công',
      color: '2DB7F5'
    },
     returning_by_3pl: {
      key: 'returning_by_3pl',
      value: 'Đang trả hàng bởi đối tác',
      color: '2DB7F5'
    },
  };
  

  export const PICKUP_METHOD = {
    manual: {
      key: 'manual',
      value: 'Tiki tự lấy hàng'
    },
    supplier: {
      key: 'supplier',
      value: 'Nhà cung cấp tự vận chuyển'
    },
    seller_delivery: {
      key: 'seller_delivery',
      value: 'Nhà cung cấp giao trực tiếp cho khách hàng'
    },
    cross_border: {
      key: 'cross_border',
      value: 'Vận chuyển quốc tế'
    },
    dropship: {
      key: 'dropship',
      value: 'Giao thẳng từ nhà bán'
    },
  };

  export const REQUISITION_BOOKING_TYPE = {
    by_number: {
      key: 1,
      value: 'Bốc số',
      description: 'Nhà bán sẽ đến trực tiếp kho nhập hàng và thực hiện bốc số thứ tự tại kho',
      titleInput: 'Bốc số vào',
    },
    by_time_frame: {
      key: 0,
      value: 'Chọn khung giờ gửi hàng',
      description: 'Nhà bán sẽ phải đem hàng đến kho nhập hàng đúng với khung giờ đã chọn',
      titleInput: 'Theo khung giờ',
    },
  };

export const SUCCESS_COLOR = '#26bc4e';
export const WARNING_COLOR = '#ffb500';
export const DANGER_COLOR = '#ff424e';
export const GREY_COLOR = '#c7c7c7';
export const INFO_COLOR = '#2db7f5';
export const WHITE_BLUE_COLOR = '#d3eeff';
export const PRIMARY_COLOR = '#1890ff';
export const LIGHT_PINK_COLOR = '#ffc6ca';
export const WHITE_COLOR = '#ffffff';

export const ORDER_STATUS = {
  processing: {
    value: 'Đặt hàng thành công',
    color: WARNING_COLOR
  },
  ban_giao_doi_tac: {
    value: 'Đang vận chuyển',
    color: WARNING_COLOR
  },
  cho_in: {
    value: 'Tiki đã tiếp nhận',
    color: WARNING_COLOR
  },
  giao_hang_thanh_cong: {
    value: 'Giao hàng thành công',
    color: SUCCESS_COLOR
  },
  complete: {
    value: 'Giao hàng thành công',
    color: SUCCESS_COLOR
  },
  holded: {
    value: 'Giao dịch bị giữ lại',
    color: WARNING_COLOR
  },
  payment_review: {
    value: 'Giao dịch đang kiểm duyệt',
    color: WARNING_COLOR
  },
  phan_cong_lay_hang: {
    value: 'Đang lấy hàng',
    color: WARNING_COLOR
  },
  len_ke: {
    value: 'Sẵn sàng giao hàng',
    color: WARNING_COLOR
  },
  canceled: {
    value: 'Đã hủy',
    color: DANGER_COLOR
  },
  da_thanh_toan: {
    value: 'Đặt hàng thành công',
    color: WARNING_COLOR
  },
  dang_lay_hang: {
    value: 'Đang lấy hàng',
    color: WARNING_COLOR
  },
  dang_van_chuyen: {
    value: 'Đang vận chuyển',
    color: WARNING_COLOR
  },
  dang_dong_goi: {
    value: 'Đang đóng gói',
    color: WARNING_COLOR
  },
  dong_goi_xong: {
    value: 'Sẵn sàng giao hàng',
    color: WARNING_COLOR
  },
  doi_thanh_toan: {
    value: 'Chờ thanh toán lại',
    color: WARNING_COLOR
  },
  closed: {
    value: 'Đã đóng',
    color: DANGER_COLOR
  },
  returned: {
    value: 'Đã trả về',
    color: DANGER_COLOR
  }
};

