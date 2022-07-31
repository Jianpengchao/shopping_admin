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
	
</template>

<style scoped lang="less">
.form-title {
	text-align: center;
	font-size: 26px;
	font-weight: 600;
	margin-bottom: 20px;
}
</style>