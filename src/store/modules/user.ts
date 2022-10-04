import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'

import { Login, GetUser } from '@/api/user'
import { ILogin } from '@/views/login/types'
import { ACCESS_TOKEN } from '@/utils/constants'
import { setStorage, removeStorage } from '@/utils/authStorage'

const useUserStore = defineStore('user', {
  state: () => {
    return {
			role: '',
			token: '',
			email: '',
			phone: '',
			avatar: '',
			wallet: '',
			address: '',
			nickname: '',
			username: '',
		}
  },

  actions: {
		async $getUser() {
				try {
					const result = await GetUser()

					if (result.status === 2000) {

						this.$patch(result.data)
					}
				}
				catch (error) {
					console.log((error as Error).message)
				}
		},
		// 登录
    $login(loginForm: ILogin) {
			// eslint-disable-next-line no-async-promise-executor
			return new Promise<void>(async (resolve, reject) => {
				try {
					const title = '温馨提示'
					const result = await Login(loginForm)

					if (result.status !== 2000) {

						ElNotification({ title, message: (result as any).message, type: 'error', })

					} else {
						this.token = (result as any).token
						setStorage(ACCESS_TOKEN, this.token)

						ElNotification({ title, message: '登录成功！', type: 'success' })

						resolve()
					}
				}
				catch (err){
					reject(err)
				}

			})
    },

		// 退出登录
		$logout() {
			return new Promise<void>((resolve) => {
				removeStorage(ACCESS_TOKEN)
				this.$patch({
					avatar: '',
					username: '',
					token: ''
				})
				resolve()
			})
		}
  },
})


export default useUserStore