<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { Plus, Edit, Delete } from '@element-plus/icons-vue'

  import useStore from '@/store'
  import { IRows } from './types'
  import { GetUsers, deleteUser } from '@/api/user'

  const { userStore } = useStore()

  const input3 = ref('')
  const drawer = ref(false)
  let data = reactive({
    visible: false,
    tableData: []
  })

  const fetchUsers = async () => {
    const result = await GetUsers()

    if (result.status === 2000) {
      data.tableData = result.data
    }
  }

  const onEdit = (row: any) => {
    console.log(row.date)
  }

  const onDelete = (id: number): void => {
    ElMessageBox.confirm(
      '确定删除改用户吗？',
      '温馨提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    .then(() => {
      deleteUser(id).then(() => {
        ElMessage({ type: 'success', message: '删除成功！' })
        fetchUsers()
      },
      () => {
        ElMessage({ type: 'error', message: '删除失败！' })
        }
      )
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
  }
  
  onMounted(() => {
    fetchUsers()
  })

  const rows: IRows[] = [
    {label: '用户名', prop: 'username', width: '140' },
    {label: '昵称', prop: 'nickname', width: '140' },
    {label: '余额', prop: 'wallet', width: '140' },
    {label: '电话', prop: 'phone', width: '140' },
    {label: '邮箱', prop: 'email', width: '200' },
    {label: '角色', prop: 'role', width: '140' },
    {label: '地址', prop: 'address', width: '220' },
  ]

</script>

<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
		<div class="px-4 py-3 sm:px-6 flex" style="justify-content: space-between;">
			<div class="flex-10">
				<el-button :icon="Plus" link type="primary" text>增加</el-button>
				<el-button :icon="Delete" link type="danger" text :disabled="userStore.role !== 'admin'">批量删除</el-button>
			</div>
			<el-input
				v-model="input3"
				placeholder="请输入用户名称"
				class="input-with-select"
			>
				<template #append>
					<el-button>搜索</el-button>
				</template>
			</el-input>
		</div>
		<div class="border-t border-gray-200">
			<div class="px-4 py-2">
				<el-table :data="data.tableData" style="width: 100%">
					<el-table-column type="selection" width="45" />

					<el-table-column
						align="center"
						:prop="row.prop"
						:label="row.label"
						:width="row.width || ''"
						:key="row.prop"
						v-for="row in rows"
					>
            <template #default="scope" v-if="row.prop === 'username'">
              <el-link type="primary" @click="drawer = true">{{ scope.row[row.prop] }}</el-link>
						</template>
            <template #default="scope" v-else-if="row.prop === 'role'">
							<el-tag class="ml-2" :type="scope.row[row.prop] === 'admin' ? '': 'info'">
                {{scope.row[row.prop] === 'admin' ? '管理员' : '普通用户'}}
              </el-tag>
						</template>
						<template #default="scope" v-else>
							{{ scope.row[row.prop] }}
						</template>
					</el-table-column>

					<el-table-column fixed="right" align="center" label="操作" width="130">
						<template #default="scope">
							<el-button
                link
                size="small"
                type="primary"
                :icon="Edit"
                @click="onEdit(scope.row)"
                :disabled="userStore.role !== 'admin'"
							>编辑</el-button
							>
							<el-button
                link
                size="small"
                type="danger"
                :icon="Delete"
                :disabled="userStore.role !== 'admin'"
                @click="onDelete(scope.row.id)"
              >删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

    <el-drawer v-model="drawer" title="用户信息">
      <span>Hi there!</span>
    </el-drawer>
	</div>
</template>

<style lang="less" scoped>
.input-with-select {
	width: 280px;
}
</style>