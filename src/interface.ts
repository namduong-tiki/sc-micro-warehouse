// Extend Window interface
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__: any;
    ReactNativeWebView: any;
  }
}

export const _ = {};
