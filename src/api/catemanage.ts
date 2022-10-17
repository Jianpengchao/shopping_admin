import server from '../utils/request'
import { ICate } from '@/views/market/types'

/**
 * 获取所有商品分类
 * @returns 
 */
export const GetCates = () => server.get<unknown, ResponseSuccess<ICate[]>>('/goodscate/getall')

/**
 * 获取单个商品分类
 * @param id 商品分类ID
 * @returns 
 */
export const GetCate = (id: number) => server.get<unknown, ResponseSuccess<ICate[]>>('/goodscate/getsingle', { params: { id }})

/**
 * 添加商品分类
 * @param data 
 * @returns 
 */
export const AddCate = (data: {name: string, alias: string}) => server.post<unknown, ResponseSuccess<null>>('/goodscate/add', data)

/**
 * 修改商品分类
 * @param data ICate
 * @returns 
 */
export const UpdateCate = (data: ICate) => server.post<unknown, ResponseSuccess<null>>('/goodscate/update', data)

/**
 * 删除单个商品分类
 * @param id 商品分类ID
 * @returns 
 */
export const DeleteCate = (id: number) => server.delete<unknown, ResponseSuccess<null>>('/goodscate/delete', { params: { id }})

/**
 * 批量删除商品分类
 * @param ids 商品分类ID数组
 * @returns 
 */
export const BatchDelCate = (ids: number[]) => server.delete<unknown, ResponseSuccess<null>>('/goodscate/batchdelete', { data: { ids }})
