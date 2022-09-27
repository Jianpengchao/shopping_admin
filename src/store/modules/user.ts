import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'

import { Login } from '../../api/user'
import { ILogin } from '../../views/login/types'
import { setStorage, removeStorage } from '../../utils/authStorage'
import { ACCESS_TOKEN } from '../../utils/constants'

const useUserStore = defineStore('user', {
  state: () => {
    return {
			avatar: '',
			username: '',
			token: ''
		}
  },

  actions: {
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

						this.username = result.data.username
						this.avatar = result.data.avatar
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