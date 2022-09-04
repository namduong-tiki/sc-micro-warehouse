import useMergeMessages from '@/hooks/useMergeMessages';
import { Message } from '@/locale';
import { selectLanguage } from '@/slices/lang/selectors';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

interface LanguageProviderProps {
  messages: Message;
  children: any
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, messages }) => {
  const lang = useSelector(selectLanguage);
  const mergedMessages = useMergeMessages(messages[lang]);

  return (
    <IntlProvider locale={lang} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};

export default LanguageProvider;
