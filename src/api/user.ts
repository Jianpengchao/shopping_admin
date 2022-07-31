import server from "../utils/request";
import { ILogin } from "../views/login/types";

type IRegister = {
	confirm: string
} & ILogin

/**
 * 登录
 */
export const Login = (form: ILogin) => server.post("/exemption/login", form)

export const Register = (form: IRegister) => server.post("/exemption/register", form)