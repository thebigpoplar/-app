import request from './../utils/request'

//获取轮播图的数据
export function getBannerlist(){
    return request.get('/banner')
}

//获取列表的数据
// export function getProlist(){
//     return request.get('/pro/list')
// }
export function getProlist(params){
    return request.get('/pro/list',{params})
}

/**
 * 获取详情页的数据
 */
export function getProDetail(params){
    return request.get('/pro/detail',{params})
}
/**
 * 获取短信验证码接口
 */
export function postUserSendCode(params){
    return request.post('/user/sendCode',params)
}
/**
 * 获取注册的接口
 */
export function postUserRes(params){
    return request.post('/user/register',params)
}
/**
 * 获取登录的接口
 */
export function postUserLogin(params){
    return request.post('/user/login',params)
}
/**
 * 获取加入购物车接口
 */
export function postCartAddCart(params){
    return request.post('/cart/addCart',params)
}
/**
 * 获取加购物车详情
 */
export function postCartList(params){
    return request.post('/cart/cartlist',params)
}
/**
 * 删除购物商品
 */
export function postCartDelete(params){
    return request.post('/cart/delete',params)
}
/**
 * 更新购物车商品数量
 */
export function postCartUpdata(params){
    return request.post('/cart/updata',params)
}
/**
 * 更新购全选状态
 */
export function postCartUpdataCheckedAll(params){
    return request.post('/cart/updataCheckAll',params)
}
/**
 * 更新购单选状态
 */
export function postCartUpdataRadioChecked(params){
    return request.post('/cart/updataRadioChecked',params)
}
/**
 * 获取购物车选中状态的商品跳转确认订单
 */
export function postCartConfirmOrder(params){
    return request.post('/order/confirmOrder',params)
}
/**
 * 获取确认订单的数据
 */
export function postConfirmPaymentData(params){
    return request.post('/order/ConfirmPaymentData',params)
}
/**
 * 删除支付的商品
 */
export function deleteCheck(params){
    return request.post('/order/deleteCheck',params)
}