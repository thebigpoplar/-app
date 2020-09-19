import request from './../utils/request'

/**
 * 写入商品分类
 */
export function allCategories(params){
    return request.post('/search/allCategories',params)
}
/**
 * 写入商品的分类的品牌
 */
export function commodityBrand(params){
    return request.post('/search/commodityBrand',params)
}
/**
 * 写入商品的品牌获取相同品牌的商品
 */
export function sameBrand(params){
    return request.post('/search/sameBrand',params)
}
/**
 * 商品的区间查询
 */
export function priceRange(params){
    return request.post('/search/priceRange',params)
}
/**
 * 搜索
 */
export function fuzzySearch(params){
    return request.post('/search/fuzzySearch',params)
}