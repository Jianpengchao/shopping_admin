<script setup lang="ts">
	import { ref, onMounted, watch } from "vue"
	import { useRoute, useRouter } from "vue-router"
	import store from '@/store'
	import type { TabsPaneContext } from 'element-plus'

	const route = useRoute()
	const router = useRouter()
	const { globalStore } = store()
	const activeTab = ref('')

	const setActiveTab = (path: string) => {
		activeTab.value = path
	}
	const addNavTab = () => {
		const path = route.fullPath as string
		const title = route.meta.title as string
		
		globalStore.addTab({title, path})

		setActiveTab(path)
	}

	const removeTab = (path: string) => {
		globalStore.removeTab(path)
		if (path === route.fullPath) {
			setActiveTab(globalStore.tabs.at(-1)?.path as string)
		}

	}
	const onTab = (pane: TabsPaneContext) => {
		router.push(pane.props.name as string)
	}

	onMounted(() => {
		setActiveTab(route.fullPath)
		addNavTab()
	})

	watch(() => route.path, () => {
		addNavTab()
	})
	watch(activeTab, () => {
		router.push(activeTab.value)
	})

</script>
<template>
	<div class="tabls">
		<el-tabs
			v-model="activeTab"
			type="card"
			class="nan-tabs"
			closable
			@tab-click="onTab"
			@tab-remove="removeTab"
		>
			<el-tab-pane
				v-for="item in globalStore.tabs"
				:key="item.path"
				:label="item.title"
				:name="item.path"
			>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<style lang="less" scoped>
.tabls {
	.nan-tabs {
		height: 30px;
		border-bottom: 1px solid #eee;
		overflow: hidden;
	}
}
</style>