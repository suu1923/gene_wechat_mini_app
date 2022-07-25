import { get, post } from '../../until/request';


/**
 * 1.0.0
 */
export const queryMyNotification = () => {
    return post('/api/notification/index');
}

export const readMyNotification = (notification_id) => {
    return post('/api/notification/read', {
        id: notification_id
    })
}
