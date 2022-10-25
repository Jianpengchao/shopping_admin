import { defineStore } from 'pinia'
import { ITab } from '../types'

const useGlobalStore = defineStore('global', {
	state() {
		return {
			menuCollapse: false,
			tabs: [
				{title: '首页', path: '/dashboard'}
			] as ITab[]
		}
	},
	actions: {
		changeCollapse() {
			this.menuCollapse = !this.menuCollapse
		},
		addTab(tab: ITab) {
			if (!this.tabs.some(t => t.path === tab.path)) {
				this.tabs.push(tab)
			}
		},
		removeTab(path: string) {
			if (path !== this.tabs[0].path) {
				console.log(path)
				this.tabs = this.tabs.filter(t => t.path !== path)
			}
		}
	}
})

export default useGlobalStore