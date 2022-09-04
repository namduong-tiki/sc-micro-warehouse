import React from 'react';
// import { createRoot, Root } from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from '@/App';
import reportWebVitals from '@/reportWebVitals';
import '@/public-path';
import '@tikivn/sc-frontend-common/dist/index.css'
import { defaultConfig } from '@tikivn/sc-frontend-common';
import { ContainerInterface } from './types';
import { ROOT_NAME } from './constants';
import './index.css';

// Init dayjs
import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import dayjs from 'dayjs';
dayjs.locale('vi');

// Initialize @tikivn/sc-frontend-common
defaultConfig({
  env: {
    DEVELOPMENT: process.env.REACT_APP_DEVELOPMENT,
    PRODUCTION: process.env.REACT_APP_PRODUCTION,
    API_ACP: process.env.REACT_APP_API_ACP,
    API_SC: process.env.REACT_APP_API_SC,
    JANUS_HOST:process.env.REACT_APP_JANUS_HOST,
    APP_CDN:process.env.REACT_APP_CDN,
    HOST_API:process.env.REACT_APP_HOST_API,
    
  },
});

/**
 * The mount method is called every time the application enters,
 * usually we trigger the application's rendering method here.
 */
// let root: Root;
// export async function mount(props: ContainerInterface) {
//   const container = props.container
//     ? props.container.querySelector(`#${ROOT_NAME}`)
//     : document.getElementById(ROOT_NAME);
//   root = createRoot(container as Element);
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }

/**
 * The bootstrap will only be called once when the child application is initialized.
 * The next time the child application re-enters, the mount hook will be called directly, and bootstrap will not be triggered repeatedly.
 * Usually we can do some initialization of global variables here,
 * such as application-level caches that will not be destroyed during the unmount phase.
 */
export async function bootstrap() {}

/**
 * The mount method is called every time the application enters,
 * usually we trigger the application's rendering method here.
 */
export async function mount(props: ContainerInterface) {
  ReactDOM.render(
    <App />,
    props.container
      ? props.container.querySelector(`#${ROOT_NAME}`)
      : document.getElementById(ROOT_NAME)
  );
}

/**
 * Methods that are called each time the application is switched/unloaded,
 * usually in this case we uninstall the application instance of the subapplication.
 */
export async function unmount(props: ContainerInterface) {
  const container = props.container
    ? props.container.querySelector(`#${ROOT_NAME}`)
    : document.getElementById(ROOT_NAME);

  if (container == null) return;

  // root.unmount();
  ReactDOM.unmountComponentAtNode(container);
}

/**
 * Optional lifecycle，just available with loadMicroApp way
 */
export async function update() {}

if (!window.__POWERED_BY_QIANKUN__) {
  mount({});
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
