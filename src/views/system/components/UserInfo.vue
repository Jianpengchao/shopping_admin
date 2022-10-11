<script setup lang="ts">
import { IUser } from '../types';

	defineProps<{
		visible: boolean
		info: IUser | Record<string, unknown>
		close: () => void
	}>()

</script>

<template>
	<!-- eslint-disable-next-line vue/no-mutating-props -->
	<el-drawer v-model="visible" size="35%" title="用户信息" @close="close">
		<p class="text-4xl font-semibold">{{info.username}}</p>
		<p class="no-underline leading-loose">余额：{{info.wallet}}</p>
		<p class="no-underline leading-loose">昵称：{{info.nickname}}</p>
		<p class="no-underline leading-loose">电话：{{info.phone}}</p>
		<p class="no-underline leading-loose">邮箱：{{info.email}}</p>
		<p class="no-underline leading-loose">地址：{{info.address}}</p>
	</el-drawer>
</template>

<style lang="less" scoped>

</style>