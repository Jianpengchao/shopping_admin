<script setup lang="ts">
	import { reactive } from "vue"
	import { IconUser, IconLock } from '@arco-design/web-vue/es/icon'
	import { ValidatedError } from '@arco-design/web-vue/es/form/interface'

 	interface iForm {
    username: string;
    password: string;
		confirm: string;
  }

  const form = reactive<iForm>({
    username: '',
    password: '',
		confirm: '',
  })
	const submitRegister = ({
		errors,
		values
	}: {
		errors: Record<string, ValidatedError> | undefined;
		values: Record<string, any>
	}) => {
		console.log(values.username)
		console.log(values.password)
		console.log(values.confirm)
		console.log(errors)
	}


</script>

<template>
	<div class="form-title">注 册</div>
	<a-form :model="form" @submit="submitRegister" :style="{width:'90%'}">
		<a-form-item
			field="username"
			label="账号"
			:validate-trigger="['change', 'blur']"
			:rules="[
				{required:true,message:'请输入账号'},
			]"
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
			:validate-trigger="['change', 'blur']"
			:rules="[
				{required:true,message:'请输入密码'},
			]"
			
		>
			<a-input v-model="form.password" placeholder="请输入密码">
				<template #prefix>
					<icon-lock />
				</template>
			</a-input>
		</a-form-item>
		<a-form-item
			field="confirm"
			label="密码"
			:validate-trigger="['change', 'blur']"
			:rules="[
				{required:true,message:'请确认密码'},
			]"
		>
			<a-input v-model="form.confirm" placeholder="请确认密码">
				<template #prefix>
					<icon-lock />
				</template>
			</a-input>
		</a-form-item>
		<a-form-item>
			<a-button html-type="submit" type="primary" :style="{width: '100%'}">注册</a-button>
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