import NProgress from 'nprogress'

import router from "./routes/index"
import { ACCESS_TOKEN } from "./utils/constants"
import { getStorage } from './utils/authStorage'

import 'nprogress/nprogress.css'

// 关闭右上角的加载圈圈
NProgress.configure({ showSpinner: false });


router.beforeEach((to, from, next) => {
	NProgress.start()

	if (to.path !== '/login') {
		if (getStorage(ACCESS_TOKEN)) {
			return next()
		} else {
			return next('/login')
		}
	}
	next()
})

router.afterEach(()=> {
	NProgress.done()
})