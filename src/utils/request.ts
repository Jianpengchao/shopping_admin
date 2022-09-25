/**
 * 基于 axios 封装的请求模块
 */
import axios from "axios"

// import router from '../router'
// import { getToken, removeToken } from './auth'

const server = axios.create({
	baseURL: '/sapi', // 基本URL路径,
	timeout: 5000 // 设置请求超时，5秒
})


// 请求拦截，每次发送请求都会经过这里
server.interceptors.request.use(config => {

	return config
})


// 响应拦截，每次后端返回信息都会经过这里
server.interceptors.response.use(response => {

	// 成功，去掉原本的data，返回真正的后端数据
	return response.data

}, error => {
	/*
	 // 任何超出 2xx 的响应码都会进入这里
	 const status = error.response.status
	 if (error.response && status === 401) {
		 // 删除本地存储的错误token
		 removeToken()
		 // 跳转登录页面
		 router.push('/login')
	 } else if (status >= 403) {
		 Message.error('没有操作权限')
	 } else if (status >= 400) {
		 Message.error('请求参数错误，请检查参数')
	 } else if (status >= 500) {
		 Message.error('服务端内部异常，请稍后重试')
	 }
	 return Promise.reject(error)
	 */
})

export default server