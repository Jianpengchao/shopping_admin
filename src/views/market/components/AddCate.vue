<script setup lang="ts">
	import { ref, reactive, watchEffect } from 'vue'
  import { ElMessage } from 'element-plus'
  import type { FormInstance } from 'element-plus'
  import { AddCate, GetCate, UpdateCate } from '@/api/catemanage'

	const props = defineProps<{
    type: string
    visible: boolean
    currentId?: null | number
    close: () => void
    success: () => void
  }>()

  const cateFormRef = ref<FormInstance>()
  const formLabelWidth = '68px'

	const cateForm = reactive({
		name: '',
    alias: '',
    status: true
	})

  const inLoading = ref(false)
  
  const feedback = async (id: number): Promise<void> => {
    let result = await GetCate(id)

    if (result.status === 2000) {
      const { data } = result

      cateForm.name = data.name
      cateForm.alias = data.alias
      cateForm.status = data.status === 0 ? true : false
    }
  }

  watchEffect(() => {
    if (props.currentId && props.type === 'EDIT') {
      feedback(props.currentId)
    }
  })

  const addCate = async () => {
    inLoading.value = true
    
    const formData = { ...cateForm, status: cateForm.status ? 0 : 1 }

    try {
      if (props.type === 'ADD') {
        const addRes = await AddCate(formData)

        if (addRes.status === 2000) {
          props.success()
        }
      } else {
        const editRes = await UpdateCate({ ...formData, id: props.currentId as number })

        if (editRes.status === 2000) {
          props.success()
        }
      }
    }
    catch {
      ElMessage.error(`${props.type === 'ADD' ? '添加' : '编辑'}商品分类失败！`)
    }

    inLoading.value = false
  }

  const onConfirm = async (formEl: FormInstance | undefined): Promise<void> => {
    if (!formEl) return

    await formEl.validate((valid) => {
      if (valid) {
        addCate()
      }
    })
  }

</script>

<template>
	<!-- eslint-disable-next-line vue/no-mutating-props -->
	<el-dialog v-model="visible" :before-close="close" :title="`${type === 'ADD' ? '添加' : '编辑'}商品分类`" width="410px">
    <el-form ref="cateFormRef" :model="cateForm">
      <el-form-item
        label="名称："
        prop="name"
        :label-width="formLabelWidth"
        :rules="{ required: true, message: '请输入分类名称',trigger: 'blur' }"
      >
        <el-input v-model="cateForm.name" autocomplete="off" placeholder="请输入分类名称"/>
      </el-form-item>
      <el-form-item
        label="昵称："
        prop="alias"
        :label-width="formLabelWidth"
        :rules="{required: true, message: '请输入分类昵称', trigger: 'blur'}"
      >
        <el-input v-model="cateForm.alias" autocomplete="off" placeholder="请输入分类昵称"/>
      </el-form-item>
      <el-form-item label="状态：" :label-width="formLabelWidth">
        <el-switch v-model="cateForm.status" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button :loading="inLoading" @click="() => onConfirm(cateFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
