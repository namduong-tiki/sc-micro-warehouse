export const isQiankun = !!window.__POWERED_BY_QIANKUN__;
export const BASENAME = isQiankun
  ? `${process.env.REACT_APP_SC_ROOT}#/warehouse-management`
  : "/";

export const ROOT_NAME = "sc-frontend-warehouse-management";

export const isScAppWebView = Boolean(localStorage.webview_platform);
