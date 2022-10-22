<script setup lang="ts">
	import { reactive } from 'vue'
	import { useRoute } from 'vue-router'
	import useStore from '@/store'
	import layoutRoutes from '@/routes/layoutRoutes'
	
	import logo from '/logo.svg'
	import MenuItem from './MenuItem.vue'

	const { globalStore } = useStore()

	// 当前路由
	const route = useRoute()

	// 菜单路由
	const routes = reactive(layoutRoutes)

</script>

<template>
	<div class="layout-aside">
		<div class="aside-sign bg-blue-50">
			<img class="logo-svg" :src="logo">
			<h5
				class="luyout-logo no-underline"
				v-if="!globalStore.menuCollapse"
			>黄超超市后台管理</h5>
		</div>
		<el-menu
			router
			:collapse="globalStore.menuCollapse"
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
.aside-sign {
	height: 44px;
	display: flex;
	justify-content: center;
	align-items: center;
	// background-color: lavender;
	border-bottom: 1px solid #eee;
	
	.logo-svg {
		width: 28px;
		height: 26px;
	}

	.luyout-logo {
		color: darkturquoise;
		font-size: 18px;
		font-family: alimama;
		line-height: 44px;
		overflow: hidden;
		margin-left: 8px;
		white-space: nowrap;
		box-sizing: border-box;
		animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
	}
}

@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

</style>