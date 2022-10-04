/**
 * 基于 axios 封装的请求模块
 */
import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

import router from '@/routes'
import { getStorage, removeStorage } from './authStorage'
import { ACCESS_TOKEN } from './constants'


const url = import.meta.env.VITE_APP_BASE_URL

const baseURL = import.meta.env.VITE_APP_DEV === 'development' ? `/sapi` : url

const server = axios.create({
	baseURL, // 基本URL路径,
	timeout: 5000 // 设置请求超时，5秒
})

// 请求拦截，每次发送请求都会经过这里
server.interceptors.request.use((config: AxiosRequestConfig) => {

	const TOKEN  = getStorage(ACCESS_TOKEN)

	if (TOKEN) {
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${TOKEN}`
		}
	}
	else {
		router.replace({ path: '/login' })
	}

	return config
})


// 响应拦截，每次后端返回信息都会经过这里
server.interceptors.response.use(response => {

	// 成功，去掉原本的data，返回真正的后端数据
	return response.data

}, error => {
		const status = error.response.status

		if (error.response && status === 401) {
			// 删除本地存储的错误token
			removeStorage(ACCESS_TOKEN)
			// 跳转登录页面
			router.replace({ path: '/login' })
		}
		else if (status >= 400 && status < 403) {
			ElMessage.error('请求参数错误，请检查参数')
		}
		else if (status >= 403 && status < 500) {
			ElMessage.error('没有操作权限')
		}
		else if (status >= 500) {
			ElMessage.error('服务端内部异常，请稍后重试')
		}

		return Promise.reject(error)
})

export default server
