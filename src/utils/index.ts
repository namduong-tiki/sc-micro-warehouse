import { isScAppWebView } from '@/constants';
import { authorization } from '@tikivn/sc-frontend-common';

export const getScope = (permissions: any) => {
  let scope = '';

  permissions.forEach((p:any) => {
    scope += ` ${p.name}`;
  });

  return scope;
};

export const isValidScope = (
  permissions: string,
  authority: string[],
  { deep = false, splitPermissionsByComma = false } = {}
) => {
  return authorization.isValidScope(permissions, authority, deep, splitPermissionsByComma);
};

export const openBrowserScApp = (url: string) => {
  if (typeof window.ReactNativeWebView?.postMessage === 'function') {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'OPEN_BROWSER',
        payload: {
          url,
        },
      })
    );
  }
};

export const downloadFileFromUrl = (url: string, name = null) => {
  if (url.length > 0) {
    if (isScAppWebView) {
      openBrowserScApp(url);
      return;
    }
    const fileName = name || url.substring(url.lastIndexOf('/') + 1).split('?')[0];
    const $anchor = document.createElement('a');

    $anchor.href = url;
    $anchor.download = fileName;
    $anchor.style.display = 'none';
    document.body.appendChild($anchor);
    $anchor.click();
    $anchor.remove();
  }
};


export const removeNullPropertyObject = (obj: any = {}) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        // eslint-disable-next-line no-param-reassign
        delete obj[propName];
      }
    }
    return obj
  
}

export const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms))


