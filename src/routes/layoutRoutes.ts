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
		meta: { title: '市场管理', icon: 'Connection' },
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
	},
	{
		path: '/system',
		name: 'system',
		component: Layout,
		meta: { title: '系统管理', icon: 'Setting' },
		children: [
			{
				path: '/system/users',
				name: 'users',
				component: () => import('../views/system/Users.vue'),
				meta: { title: '用户管理' }
			},
			{
				path: '/system/menu',
				name: 'menu',
				component: () => import('../views/system/Menu.vue'),
				meta: { title: '菜单管理' }
			}
		]
	}
]

export default layoutRoutes