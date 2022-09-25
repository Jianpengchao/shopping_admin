/**
 * 此路由文件是 Layout 的子路由，生成菜单的路由
 */

import type { RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'

const layoutRoutes: RouteRecordRaw[] = [
	{
    path: '/',
    name: 'layout',
    component: Layout,
		redirect: '/dashboard',
		meta: { title: '首页' },
		children: [
			{
				path: '/dashboard',
				name: 'dashboard',
				component: () => import('../views/dashboard/index.vue'),
				meta: { title: '首页', icon: 'House' }
			}
		]
  },
	{
		path: '/marketmanage',
		name: 'marketmanage',
		component: Layout,
		meta: { title: '市场管理', icon: 'Discount' },
		children: [
			{
				path: '/marketmanage/catemanage',
				name: 'catemanage',
				component: () => import('../views/market/CateManage.vue'),
				meta: { title: '分类管理' }
			},
			{
				path: '/marketmanage/goodsmanage',
				name: 'goodsmanage',
				component: () => import('../views/market/GoodsManage.vue'),
				meta: { title: '商品管理' }
			}
		]
	}
]

export default layoutRoutes