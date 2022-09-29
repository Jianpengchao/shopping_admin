
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElNotification, } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { Register } from "@/api/user"
import { ILogin } from '../types'

const props = defineProps<{toggleMode: () => void}>()

type IRegister = {
	checkPass: string
} & ILogin

const registerFormRef = ref<FormInstance>()

const registerForm = reactive<IRegister>({
	username: '',	
  password: '',
  checkPass: '',
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (registerForm.checkPass !== '') {
      if (!registerFormRef.value) return
      registerFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error("密码不一致"))
  } else {
    callback()
  }
}


const rules = reactive({
	username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      Register({
				username: registerForm.username,
				password: registerForm.password
			}).then(res => {
				if (res.status === 2000) {
					ElNotification({
						title: '温馨提示',
						message: '注册成功，请登录！',
						type: 'success',
					})
					props.toggleMode()
				} else {
					ElNotification({
						title: '温馨提示',
						message: '注册失败！',
						type: 'error',
					})
				}
			},
			fail => {
				console.log(fail)
			})
    } else {
      console.log('error submit!')
    }
  })
}

</script>

<template>
	<div class="form-title">注 册</div>
  <el-form
    ref="registerFormRef"
    :model="registerForm"
    status-icon
    :rules="rules"
    class="register-form"
  >
		<el-form-item label="" prop="username">
      <el-input v-model="registerForm.username" type="text" placeholder="请输入账号">
				<template #prefix>
          <el-icon class="el-input__icon"><User /></el-icon>
        </template>
			</el-input>
    </el-form-item>

    <el-form-item label="" prop="password">
      <el-input v-model="registerForm.password" type="password" placeholder="请输入密码">
				<template #prefix>
          <el-icon class="el-input__icon"><Lock /></el-icon>
        </template>
			</el-input>
    </el-form-item>
    <el-form-item label="" prop="checkPass">
      <el-input v-model="registerForm.checkPass" type="password"  placeholder="请确认密码">
				<template #prefix>
          <el-icon class="el-input__icon"><Lock /></el-icon>
        </template>
			</el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="width: 100%;" @click="submitForm(registerFormRef)">
				注 册
			</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="less">

	.form-title {
		text-align: center;
		font-size: 26px;
		font-weight: 600;
		line-height: 100px;
	}
	.register-form {
		width: 100%;
	}
</style>