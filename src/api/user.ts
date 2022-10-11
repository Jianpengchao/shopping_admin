import { IAddUser, IUser } from '@/views/system/types';
import server from '../utils/request';
import { ILogin } from '../views/login/types';

/**
 * 登录
 * @param form usernaem: string, password：string
 * @returns promise 
 */
export const Login = (form: ILogin) => server.post('/exemption/login', form)

/**
 * 注册
 * @param form usernaem: string, password：string
 * @returns promise
 */
export const Register = (form: ILogin) => server.post('/exemption/register', form)

/**
 * 获取当前用户信息
 */
export const GetUser = () => server.get<unknown, ResponseSuccess<IUser>>('/user/getuser')

/**
 * 获取用户列表
 * @returns Promise IUser[]
 */
export const GetUsers = (search: string) => server.get<unknown, ResponseSuccess<IUser[]>>('/user/getall',{params: { search }})

/**
 * 添加用户
 * @returns 
 */
export const AddUser = (userInfo: IAddUser) => server.post<unknown, ResponseSuccess<null>>('/user/add', userInfo)

/**
 * 修改用户信息
 * @param userInfo IAddUser
 * @returns 
 */
export const UpdateUser = (userInfo: IAddUser) => server.post('/user/update', userInfo)

/**
 * 删除用户
 * @param id 用户id
 * @returns 
 */
export const DeleteUser = (id: number) => server.delete<unknown, ResponseSuccess<null>>('/user/delete', { params: { id }})

/**
 * 批量删除用户
 * @param ids number[]
 * @returns 
 */
export const BatchDeleteUser = (ids: number[]) => server.delete<unknown, ResponseSuccess<null>>('/user/batchdelete', {data: { ids }})
