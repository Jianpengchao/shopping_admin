import server from "../utils/request";
import { ILogin } from "../views/login/types";

/**
 * 登录
 * @param form usernaem: string, password：string
 * @returns promise 
 */
export const Login = (form: ILogin) => server.post("/exemption/login", form)

/**
 * 注册
 * @param form usernaem: string, password：string
 * @returns promise
 */
export const Register = (form: ILogin) => server.post("/exemption/register", form)

/**
 * @GetUser 获取当前用户信息
 */
export const GetUser = () => server.get("/user/getuser")

/**
 * @GetUsers 获取用户列表
 * @returns 
 */
export const GetUsers = () => server.get("/user/getall")


export const deleteUser = (id: number) => server.delete("/user/delete", { params: { id }})