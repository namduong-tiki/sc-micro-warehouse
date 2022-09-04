import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';
import React from 'react';
import { isQiankun } from '@/constants';

export const useFormatMessage = () => {
  return useIntl().formatMessage;
};

export const formatMessage = (
  descriptor: MessageDescriptor,
  values?: Record<string, any>,
) => {
  return <FormattedMessage id={descriptor.id} values={values} defaultMessage={descriptor.defaultMessage} />;
};


export const getDefaultLocale = () => {
  if (!isQiankun) return 'vi';

  const locale = localStorage.getItem('umi_locale');

  return locale === 'vi-VN' ? 'vi' : 'en';
};

interface FormatHtmlMessageProps {
  id: string,
  values?: any,
  defaultMessage?: string

}

export const FormatHtmlMessage: React.FC<FormatHtmlMessageProps> = ({id,values,defaultMessage = ''}) => {
  return (
    <FormattedMessage id={id} values={{
      ...values,
      b: (...chunks:any) => <b >{chunks}</b>
    }} defaultMessage={defaultMessage} />
  );
};