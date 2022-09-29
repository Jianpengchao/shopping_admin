<script setup lang="ts">
	import { reactive } from 'vue'
	import { useRoute } from 'vue-router'
	import layoutRoutes from '@/routes/layoutRoutes'
	import MenuItem from './MenuItem.vue'

	// 当前路由
	const route = useRoute()

	// 菜单路由
	const routes = reactive(layoutRoutes)

</script>

<template>
	<div class="layout-aside">
		<h5 class="luyout-logo no-underline">黄超超市后台管理</h5>
		<el-menu
			router
			:default-active="route.fullPath"
			class="el-menu-vertical-demo"
		>
        <MenuItem :routes="routes"/>
      </el-menu>
	</div>
</template>

<style lang="less" scoped>
.layout-aside {
	height: 100%;
}
.luyout-logo {
	color: #333;
	font-size: 18px;
	font-family: alimama;
	height: 44px;
	line-height: 44px;
	text-align: right;
	padding: 0 20px;
	overflow: hidden;
	box-sizing: border-box;
}
</style>