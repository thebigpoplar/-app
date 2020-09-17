import request from './../utils/request'

/**
 * 写入新增地址的接口
 */
export function writeAdd(params){
    return request.post('/address/writeAdd',params)
}
/**
 * 更新确认订单的地址
 */
export function writeConfirmationOrder(params){
    return request.post('/address/writeConfirmationOrder',params)
}
/**
 * 更新确认订单的地址
 */
export function selectAddress(params){
    return request.post('/address/selectAddress',params)
}
/**
 * 查询确认订单的默认地址
 */
export function querDefault(params){
    return request.post('/address/querDefault',params)
}
/**
 * 查询用户的所有地址
 */
export function findAllAdd(params){
    return request.post('/address/findAllAdd',params)
}
/**
 * 获取支付的二维码
 */
export function payment(params){
    return request.get('/pay/payment',{params})
}