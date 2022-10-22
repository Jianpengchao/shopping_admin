<script setup lang="ts">
		const props = defineProps(['routes'])
</script>

<template>
	<template :key="route.path" v-for="route in props.routes">
		<el-menu-item v-if="route.children && route.children.length === 1" :index="route.children[0].path">
      <el-icon><Icon :icon="route.children[0].meta.icon" /></el-icon>
      <template #title>{{ route.children[0].meta.title }}</template>
    </el-menu-item>

		<el-sub-menu v-else-if="route.children && route.children.length > 1" :index="route.path">
      <template #title>
        <el-icon><Icon :icon="route.meta.icon" /></el-icon>
        <span>{{route.meta.title}}</span>
      </template>
			<MenuItem :routes="route.children" />
		</el-sub-menu>

		<el-menu-item v-else :index="route.path">{{route.meta.title}}</el-menu-item>
	</template>
</template>

<style lang="less" scoped>
.el-menu .el-menu--inline .is-active {
	border-right: 2px solid #409eff !important;
}
</style>