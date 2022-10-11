<script setup lang="ts">
	import { ref, reactive, watchEffect } from 'vue'
  import { ElMessage } from 'element-plus'
  import type { FormInstance, FormRules } from 'element-plus'
  import { AddUser, UpdateUser } from '@/api/user'
  import { IUser } from '../types'

  const userFormRef = ref<FormInstance>()
	const formLabelWidth = '68px'

  const props = defineProps<{
    visible: boolean
    type: string
    user?: IUser
    close: () => void
    success: () => void
  }>()

	const form = reactive({
		username: '',
		nickname: '',
		phone: '',
		password: '',
		role: '',
		email: '',
    address: ''
	})

  const echoing = (): void => {
    form.username = props.user?.username as string
    form.password = props.user?.password as string
    form.nickname = props.user?.nickname as string
    form.phone = props.user?.phone as string
    form.role = props.user?.role as string
    form.email = props.user?.email as string
    form.address = props.user?.address as string
  }

  const clear = (): void => {
    form.username = ''
      form.password = ''
      form.nickname = ''
      form.phone = ''
      form.role = ''
      form.email = ''
      form.address = ''
  }

  watchEffect(() => {
    if (props.visible && props.type === 'EDIT') {
      echoing()
    } else if (props.visible && props.type === 'ADD') {
      clear()
    }
  })

  const addUser = async () => {
    try {

      if (props.type === 'ADD') {
        const result = await AddUser(form)

        if (result.status === 2000) {
          props.success()
        }
      } else {
        const id = props.user?.id
        const {username, nickname, phone, role, email, address} = form
        const result = await UpdateUser({username, nickname, phone, role, email, address, id})

        if (result.status === 2000) {
          props.success()
        }
      }      
    }
    catch {
      ElMessage.error(`${props.type === 'ADD' ? '添加' : '编辑'}用户失败！`)
    }
  }

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
      await formEl.validate((valid) => {
        if (valid) {
          addUser()
        }
      })
  }

  const rules = reactive<FormRules>({
    username: [
      {required: true, message: '请输入账号', trigger: 'blur'},
      { min: 5, max: 20, message: '请输入5-20位的账号', trigger: ['blur', 'change'] }
    ],
    nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
    phone: [
      {required: true, message: '请输入号码', trigger: 'blur'},
      { type: 'regexp', pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '请输入正确的号码', trigger: ['blur', 'change']},
    ],
    password: [
      {required: true, message: '请输入密码', trigger: 'blur'},
      {type: 'regexp', pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,  message: '请输入包含字母和数字的密码', trigger: 'blur'},
    ],
    role: [{required: true, message: '请选择角色', trigger: 'blur'}],
    email: [
      {required: true, message: '请请输入邮箱', trigger: 'blur'},
      { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change']}
    ],
    address: [{required: true, message: '请请输入地址', trigger: 'blur'}],
  })

</script>

<template>
	<!-- eslint-disable-next-line vue/no-mutating-props -->
	<el-dialog v-model="props.visible" :before-close="props.close" :title="`${props.type === 'ADD' ? '添加' : '编辑'}用户`">
    <el-form ref="userFormRef" :model="form" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="账号：" :label-width="formLabelWidth" prop="username">
            <el-input v-model="form.username" autocomplete="off" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="昵称：" :label-width="formLabelWidth" prop="nickname">
            <el-input v-model="form.nickname" autocomplete="off" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item label="电话：" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="form.phone" autocomplete="off" placeholder="请输入电话" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码：" :label-width="formLabelWidth" :prop="props.type === 'ADD' ? 'password' : ''">
            <el-input v-model="form.password" type="password" autocomplete="off" :disabled="props.type === 'EDIT'" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="email">
            <el-input v-model="form.email" autocomplete="off" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="角色：" :label-width="formLabelWidth" prop="role">
            <el-select v-model="form.role" style="width: 100%;" placeholder="请选择角色">
              <el-option label="管理员" value="admin" />
              <el-option label="普通用户" value="plain" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地址：" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off" placeholder="请输入地址" />
        </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="props.close">取 消</el-button>
        <el-button @click="submitForm(userFormRef)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>

</style>