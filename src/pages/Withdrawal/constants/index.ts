export const PATH_NAME = '/payment-controller';

export const DISPLAY_DATE_FORMAT = 'DD/MM/YYYY';
export const DISPLAY_DATE_HOUR_FORMAT = 'DD/MM/YYYY HH:mm:ss';
export const BACKEND_DATE_FORMAT = 'YYYY-MM-DD';

export const PAYMENT_CONTROLLER_STATUS = {
  DRAFT: 'draft',
  PROCESSING: 'processing',
  EXCEPTION: 'exception',
  DONE: 'done',
  SYNCING: 'syncing',
  SYNCED: 'synced',
  PAID: 'paid',
  OVER_PAID: 'over_paid',
  PARTIAL_PAID: 'partial_paid',
  SYNC_FAIL: 'sync_fail',
  PAYMENT_FAIL: 'payment_fail',
  CANCELED: 'canceled',
};
