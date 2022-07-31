<script setup lang="ts">
	import { reactive } from "vue"
	import { IconUser, IconLock } from '@arco-design/web-vue/es/icon'
	import { ValidatedError } from '@arco-design/web-vue/es/form/interface'
	import { Login } from "../../../api/user"

 	interface iForm {
    username: string;
    password: string;
  }

  const form = reactive<iForm>({
    username: '',
    password: ''
  })

	const submitLogin = async ({
		errors,
		values
	}: {
		errors: Record<string, ValidatedError> | undefined;
		values: Record<string, string>
	}) => {
		if(!errors) {
			console.log(values.username)
			console.log(values.password)
			
			let res = await Login({
				username: values.username,
				password: values.password
			})
			console.log('请求返回数据：', res)

		} else {
			console.log(errors)
		}
	}

</script>

<template>
	<div class="form-title">登 录</div>
	<a-form :model="form" @submit="submitLogin" :style="{width:'90%'}">
		<a-form-item 
			field="username" 
			label="账号"
			:rules="[
				{required:true,message:'请输入账号'},
			]"
			:validate-trigger="['change', 'blur']"
		>
			<a-input v-model="form.username" placeholder="请输入账号">
				<template #prefix>
					<icon-user />
				</template>
			</a-input>
		</a-form-item>
		<a-form-item
			field="password"
			label="密码"
			:rules="[
				{required:true,message:'请输入密码'},
			]"
			:validate-trigger="['change', 'blur']"
		>
			<a-input v-model="form.password" placeholder="请输入密码">
				<template #prefix>
					<icon-lock />
				</template>
			</a-input>
		</a-form-item>
		<a-form-item>
			<a-button html-type="submit" type="primary" :style="{width: '100%'}">登录</a-button>
		</a-form-item>
	</a-form>
</template>

<style scoped lang="less">
.form-title {
	text-align: center;
	font-size: 26px;
	font-weight: 600;
	margin-bottom: 20px;
}
</style>