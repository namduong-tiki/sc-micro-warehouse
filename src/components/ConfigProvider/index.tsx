import React, { useEffect, useState } from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ROOT_NAME } from '@/constants';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/slices/lang/selectors';
import { LOCALE_LIB } from '@/constants/lang';

interface Props {
  children: React.ReactNode
}

const ConfigProvider: React.FC<Props> = ({ children }) => {
  const getPopupContainer = () => {
    const container = document.getElementById(ROOT_NAME);
    return (container ?? document.body) as HTMLElement;
  };
  const [locale, setLocale] = useState(LOCALE_LIB.vi);
  const lang = useSelector(selectLanguage);

  useEffect(() => {
    setLocale(LOCALE_LIB[lang]);
  }, [lang]);

  return (
    <AntdConfigProvider getPopupContainer={getPopupContainer} locale={locale}>
      {children}
    </AntdConfigProvider>
  );
};

export default ConfigProvider;
