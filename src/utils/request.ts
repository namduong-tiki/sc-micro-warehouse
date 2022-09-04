import { initRequest } from "@tikivn/sc-frontend-common";
import { merge } from "lodash";

const request = initRequest();

type Config = {
  fullpath?: boolean; // wheather use url at full path or append url to `/api/tiki_api?path=`
  config?: {
    noAuth?: boolean; // bypass accessToken,
  };
  isNotThrowError?: boolean;
  hasResponseServerMessage?: boolean;
};

type Request = (url: string, options: object, config?: Config) => Promise<any>;

const defaultConfig: Config = {
  fullpath: true,
  config: {
    noAuth: false,
  },
  isNotThrowError: false,
  hasResponseServerMessage: false,
};

export const apiGet: Request = async (url, options, config) => {
  const mergedConfig = merge(defaultConfig, config);
  return request.apiGet(
    url,
    options,
    mergedConfig.fullpath,
    mergedConfig.config,
    mergedConfig.isNotThrowError,
    mergedConfig.hasResponseServerMessage
  );
};

export const apiPost: Request = async (url, options, config) => {
  const mergedConfig = merge(defaultConfig, config);
  return request.apiPost(
    url,
    options,
    mergedConfig.fullpath,
    mergedConfig.config,
    mergedConfig.isNotThrowError,
    mergedConfig.hasResponseServerMessage
  );
};

export const apiPut: Request = async (url, options, config) => {
  const mergedConfig = merge(defaultConfig, config);
  return request.apiPut(
    url,
    options,
    mergedConfig.fullpath,
    mergedConfig.config,
    mergedConfig.isNotThrowError,
    mergedConfig.hasResponseServerMessage
  );
};

export const apiDelete: Request = async (url, options, config) => {
  const mergedConfig = merge(defaultConfig, config);
  return request.apiDelete(
    url,
    options,
    mergedConfig.fullpath,
    mergedConfig.config,
    mergedConfig.isNotThrowError,
    mergedConfig.hasResponseServerMessage
  );
};
