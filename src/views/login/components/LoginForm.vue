<script setup lang="ts">
	import { reactive, ref } from "vue"
	import { useRoute, useRouter} from "vue-router"
	import { Login } from "../../../api/user"
	import { ElNotification } from 'element-plus'
	import type { FormInstance, FormRules } from 'element-plus'
	import { User, Lock } from '@element-plus/icons-vue'

	const loginFormRef = ref<FormInstance>()
	const router = useRouter();

	const loginForm = reactive<{
		username: string;
		password: string;
	}>({
		username: '',
		password: ''
	})

	const loginRules = reactive<FormRules>({
		username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
		password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
	})

	const submitForm = async (formEl: FormInstance | undefined) => {
		if (!formEl) return
		await formEl.validate((valid, fields) => {
			if (valid) {
				Login(loginForm).then(res => {
					console.log(res)
					if(res.status !== 2000) {
						ElNotification({
							title: '温馨提示',
							message: '登录失败！',
							type: 'error',
						})
					} else {
						ElNotification({
							title: '温馨提示',
							message: '登录成功！',
							type: 'success',
						})
						router.push('/')

					}
				}, fail => {
					
				})
			} else {
				console.log('error submit!', fields)
			}
		})
	}


</script>

<template>
	<div>
		<div class="form-title">登 录</div>
		<el-form
			:ref="loginFormRef"
			:model="loginForm"
			:rules="loginRules"
			class="demo-loginForm"
		>
			<el-form-item label="" prop="username">
				<el-input v-model="loginForm.username" type="text" placeholder="请输入账号">
					<template #prefix>
						<el-icon class="el-input__icon"><User /></el-icon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="" prop="password">
				<el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
					<template #prefix>
						<el-icon class="el-input__icon"><Lock /></el-icon>
					</template>
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button style="width: 100%;" @click="submitForm(loginFormRef)">
					登 录
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style scoped lang="less">
.form-title {
	text-align: center;
	font-size: 26px;
	font-weight: 600;
	line-height: 100px;
}
.demo-loginForm {
	width: 100%;
}
</style>