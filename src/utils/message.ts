import { notification, message } from 'antd';

export const showErrorGeneral = (title = '', messageParam = '') => {
    notification.error(
        {
            message: title || 'Có lỗi xảy ra' ,
            description: messageParam || 'Vui lòng thử lại sau'
        })
}

export const showSuccessGeneral = (title = '', messageParam = '') => {
    notification.success(
        {
            message: title || 'Thông báo',
            description: messageParam || 'Đã hoàn thành'
        })
}

export const showMessageSuccessGeneral = (messageParam: any = 'Thành công') => {
    message.success(messageParam);

}
