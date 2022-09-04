import { notification, message } from 'antd';
import { formatMessage } from './locale';

export const showErrorGeneral = (title = '', messageParam = '') => {
    notification.error(
        {
            message: title || formatMessage({ id: 'Có lỗi xảy ra' }),
            description: messageParam || formatMessage({ id: 'Vui lòng thử lại sau' })
        })
}

export const showSuccessGeneral = (title = '', messageParam = '') => {
    notification.success(
        {
            message: title || formatMessage({ id: 'Thông báo' }),
            description: messageParam || formatMessage({ id: 'Đã hoàn thành' })
        })
}

export const showMessageSuccessGeneral = (messageParam: any = formatMessage({ id: 'Thành công' })) => {
    message.success(messageParam);

}
