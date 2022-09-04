import React from 'react';
import RouteProvider from './components/RouteProvider';
import routes from '@/routes';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import LanguageProvider from '@/components/LanguageProvider';
import { messages } from './locale';
// import ThemeProvider from './components/ThemeProvider';
import ConfigProvider from './components/ConfigProvider';

function App() {
  return (
    <React.StrictMode>
      {/* <ThemeProvider> */}
        <Provider store={store}>
          <ConfigProvider>
            <LanguageProvider messages={messages}>
              <RouteProvider routes={routes} />
            </LanguageProvider>
          </ConfigProvider>
        </Provider>
      {/* </ThemeProvider> */}
    </React.StrictMode>
  );
}

export default App;
