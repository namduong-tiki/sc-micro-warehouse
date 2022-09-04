import { apiGet, apiPost, apiPut } from "@/utils/request";
import {
  GetListProductBySellerIdParams,
  GetListWarehouseParams,
  CreateBPORParams,
  UpdateBPORParams,
  ImportFileParams
} from "../types";

export const getTotalByStatus = () => {
  return apiGet(
    `${process.env.REACT_APP_API_SC}/seller/v2/outbound_shipments/count`,
    {},
    {
      hasResponseServerMessage: true,
      fullpath: true,
    }
  );
}

export const getListBPORDraft = (params: string) => {
  return apiGet(
    `${process.env.REACT_APP_API_SC}/seller/v2/inventory_withdrawals?${params}`,
    {},
    {
      hasResponseServerMessage: true,
      fullpath: true,
    }
  );
}

export const getListBPOR = (params: string) => {
  return apiGet(
    `${process.env.REACT_APP_API_SC}/seller/v2/outbound_shipments?${params}`,
    {},
    {
      hasResponseServerMessage: true,
      fullpath: true,
    }
  );
}

export const getDetailBPORDraft = (id: any) => {
  return apiGet(
    `${process.env.REACT_APP_API_SC}/seller/v2/inventory_withdrawals/${id}?include=items`,
    {},
    {
      hasResponseServerMessage: true,
      fullpath: true,
    }
  );
}


export const getDetailBPOR = (id: any) => {
  return apiGet(
    `${process.env.REACT_APP_API_SC}/seller/v2/outbound_shipments/${id}`,
    {},
    {
      hasResponseServerMessage: true,
      fullpath: true,
    }
  );
}


export const updateBPOR = (params: UpdateBPORParams,id:any) => {
  return apiPut(
    `${process.env.REACT_APP_API_SC}/seller/v2/inventory_withdrawals/${id}`,
    {
      body: params
    },
    {
      hasResponseServerMessage: true,
      fullpath: true,
    }
  );
}

export const getHistoriesDetail = (id: any) => {
  return apiGet(
    `${process.env.REACT_APP_API_SC}/seller/v2/outbound_shipments/${id}/histories`,
    {},
    {
      hasResponseServerMessage: true,
      fullpath: true,
    }
  );
}


export const getListProductBySellerId = (params: GetListProductBySellerIdParams) => {
  const { cursor, dataPayload, limit = 20 } = params
  // https://api.tala.xyz/janus-query
  const query = cursor ? `limit=${limit}&cursor=${cursor}` : `limit=${limit}`
  const endpoint = `sc/products?${query}&include=common,attributes,inventory`;
  return apiPost(
    `${process.env.REACT_APP_JANUS_HOST}/${endpoint}`,
    {
      body: {
        status: [
          1, 2
        ],
        entity_type: 'seller_simple',
        inventory_type_id: 1,
        ...dataPayload
      },
      headers: {
        'Content-Type': 'application/json',
        'x-source': `janus-query-${process.env.REACT_APP_PRODUCTION ? 'prod' : 'dev'}`,
      }
    },
    {
      fullpath: true,
      hasResponseServerMessage: true
    }
  );

}

export const getListWarehouse = (params: GetListWarehouseParams) => {
  return apiPost(
    `${process.env.REACT_APP_API_SC}/seller/v2/inventory_withdrawals/guidance`,
    {
      body: params
    },
    {
      fullpath: true,
      hasResponseServerMessage: true
    }
  );

}

export const getTikiReturnWarehouse = () => {

  return apiGet(
    `${process.env.REACT_APP_API_SC}/seller/v2/inventory_withdrawals/warehouses`,
    {},
    {
      hasResponseServerMessage: true,
      fullpath: true,
    }
  );
};

export const getBPORBusiness = (id: any) => {

  return apiGet(
    `${process.env.REACT_APP_API_SC}/seller/v2/sellers/${id}/registrations`,
    {},
    {
      hasResponseServerMessage: true,
      fullpath: true,
    }
  );
};

export const onCreateBPOR = (params: CreateBPORParams) => {
  return apiPost(
    `${process.env.REACT_APP_API_SC}/seller/v2/inventory_withdrawals`,
    {
      body: params
    },
    {
      fullpath: true,
      hasResponseServerMessage: true
    }
  );

}

export const importFileProduct = (params: ImportFileParams) => {
  const endpoint = 'seller/v2/inventory_requisitions/extractions';
  return apiPost(
    `${process.env.REACT_APP_API_SC}/${endpoint}`,
    {
      body: params,
    },
    {
      fullpath: true,
      hasResponseServerMessage: true
    }
  );
}