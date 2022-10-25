<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { useRouter } from "vue-router"
	import useStore from '@/store'
	import { ElNotification } from 'element-plus'
	
	const { userStore, globalStore } = useStore()
	const circleUrl = ref('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F9680744090%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666881778&t=c6ea51246d22e3b30c87672b884fef74')
	
	const router = useRouter()

	onMounted(() => {
		userStore.$getUser()
	})

	const change = () => {
		globalStore.changeCollapse()
	}

	const onLogout = async () => {
		await userStore.$logout()

		router.replace('/login')
		ElNotification({ title: '温馨提示', message: '退出成功！', type: 'success' })

	}
</script>

<template>
	<div class="layout-header">
		<div>
			<!-- Expand -->
			<el-icon @click="change" class="collapse-icon">
				<Icon :icon="globalStore.menuCollapse ? 'Expand' : 'Fold'" />
			</el-icon>
		</div>
		<div>
			<el-dropdown>
				<span class="el-dropdown-link">
					<el-avatar :size="24" :src="userStore.avatar || circleUrl" />
					<span class="user-name">{{userStore.nickname || userStore.username}}</span>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>
							<el-icon><Icon icon="User" /></el-icon>
							个人中心
						</el-dropdown-item>
						<el-dropdown-item @click="onLogout">
							<el-icon><Icon icon="Remove" /></el-icon>
							退出登录
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<style lang="less" scoped>
.layout-header {
	height: 100%;
	padding: 0 20px;
	box-sizing: border-box;
	background-color: #fff;
	border-bottom: 1px solid #eee;

	display: flex;
	justify-content: space-between;
	align-items: center;

	.collapse-icon {
		font-size: 22px;
		margin-top: 5px;
		cursor: pointer;
	}

	.el-dropdown-link {
		line-height: 28px;
		display: flex;
		align-items: center;
		
		.user-name {
			margin-left: 8px;
			font-weight: bold;
			transform: translateY(2px);
		}
	}
}
</style>