import { defineStore } from 'pinia'

const useGlobalStore = defineStore('global', {
	state() {
		return {
			menuCollapse: false
		}
	},
	actions: {
		changeCollapse() {
			this.menuCollapse = !this.menuCollapse
		}
	}
})

export default useGlobalStore