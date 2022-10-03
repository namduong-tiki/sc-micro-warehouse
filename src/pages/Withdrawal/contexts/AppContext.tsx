import { useSelector } from '@/app/hooks';
import { userSellerDetailSelector } from '@/slices/user/selectors';
import { isValidScope, removeNullPropertyObject } from '@/utils';
import useRouter from '@/hooks/useRouter';
import React, { createContext, useEffect, useState } from 'react';
import get from 'lodash/get';
import useRouteParams from '@/hooks/useRouteParams';
import { TAB_NAME } from '../constants/tab';
import { stringify } from 'qs';
import { getListBPOR, getListBPORDraft } from '@/pages/Withdrawal/services';
import { showErrorGeneral } from '@/utils/message';
import checkIsUseV2EndPoint from '../utils/checkIsUseV2EndPoint';
import { checkStatusParam } from '../utils/checkStatusParam';
import useMediaQuery from '../hook/mediaQueyHook';

interface Props {
  children: React.ReactNode;
  data: any;
}

export const AppContext = createContext<any | null>(null);

const AppContextProvider: React.FC<Props> = ({ children, data }) => {
  const state = useAppContext(data);
  return (
    <>
      <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
    </>
  );
};

export default AppContextProvider;

const initQuery = {
  sellerId: null,
  page: 1,
  limit: 20,
  referenceCode: null,
  code: null,
  status: null,
  warehouseCode: null,
  expectedPickupDate: null,
  selectedId: null,
};

const useAppContext = (data: any) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { params } = useRouteParams();
  const { replace } = useRouter();
  const user = useSelector(userSellerDetailSelector);

  const isAdmin = isValidScope(user.permissions, ['Administrator']);
  const sellerIds = user.sellerIds;
  const hasOnlyOneSeller = Array.isArray(sellerIds) && sellerIds.length === 1 && !isAdmin;
  const currentSellerId = get(user, ['currentUser', 'seller_id']);

  const [isLoading, setIsLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [listingInfo, setListingInfo] = useState({});

  const [createModalData, setCreateModalData] = useState({});
  const [detailModalData, setDetailModalData] = useState({});
  const [printModalData, setPrintModalData] = useState({});


  const [query, setQuery] = useState({
    ...initQuery,
    page: params?.page,
    limit: params?.limit || initQuery.limit, 
    sellerId: hasOnlyOneSeller ? sellerIds[0] : params.sellerId,
    // sellerSelected: sellerId || params?.seller_ids,
    tab: params?.tab ? params.tab : TAB_NAME.PROCESSING,
    expectedPickupDate: params?.expectedPickupDate,
    status: params?.status,
    warehouseCode: params?.warehouse_code,
    code: params?.code,
    referenceCode: params?.referenceCode,
    selectedId: params?.selectedId,
    shippingMethod: params?.shippingMethod,
    needWithdraw: params?.needWithdraw,
    // statusPickup: params?.status_pickup ? params?.status_pickup.replace('in|', '') : '',
    // type: params?.type ? params?.type.replace('in|', '') : '',
  });

  const {
    sellerId,
    tab,
    shippingMethod,
    status,
    warehouseCode,
    code,
    referenceCode,
    expectedPickupDate,
    limit,
    page,
    selectedId,
    needWithdraw
  } = query;

  // replace url
  useEffect(() => {
    const obj = {
      limit: limit || initQuery.limit,
      page,
      sellerId,
      tab,
      shippingMethod,
      expectedPickupDate,
      status,
      warehouseCode,
      code,
      referenceCode,
      selectedId,
      needWithdraw,
    };
    const route = removeNullPropertyObject(obj);
    replace({
      pathname: '',
      query: route,
    });
  }, [
    sellerId,
    replace,
    tab,
    shippingMethod,
    status,
    warehouseCode,
    code,
    referenceCode,
    expectedPickupDate,
    limit,
    page,
    selectedId,
    needWithdraw
  ]);

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const obj = {
        limit: limit || initQuery.limit,
        page,
        seller_ids: sellerId,
        shipping_method: shippingMethod,
        expected_pickup_date: expectedPickupDate,
        status: checkStatusParam({ tab, status }),
        warehouse_code: warehouseCode,
        code,
        reference_code: referenceCode,
        sla_pickup_remain_days: needWithdraw ? 10 : ''
      };
      const params = stringify(removeNullPropertyObject(obj));
      const isCallV2Api = checkIsUseV2EndPoint(tab);

      if (isCallV2Api) {
        const response = await getListBPOR(params);
        if ('error' in response) {
          throw new Error(response?.error?.message);
        }
        setListing(response?.data);
        setListingInfo(response?.paging);
      } else {
        const response = await getListBPORDraft(params);
        if ('error' in response) {
          throw new Error(response?.error?.message);
        }
        setListing(response?.data);
        setListingInfo(response?.paging);
      }
    } catch (error: any) {
      setListing([]);
      setListingInfo({});
      showErrorGeneral('', error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch list
  useEffect(() => {
    fetchList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sellerId,
    replace,
    tab,
    shippingMethod,
    status,
    warehouseCode,
    code,
    referenceCode,
    expectedPickupDate,
    limit,
    page,
    needWithdraw,
  ]);

  // open modal detail is mount
  useEffect(() => {
    if (selectedId) {
      setDetailModalData({
        isVisible: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...data,
    listing,
    listingInfo,
    isLoading,
    setIsLoading,
    query,
    setQuery,
    createModalData,
    setCreateModalData,
    detailModalData,
    setDetailModalData,
    printModalData,
    setPrintModalData,
    currentSellerId,
    fetchList,
    isMobile
  };
};
