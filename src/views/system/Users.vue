<script setup lang="ts">
  import { reactive, onMounted } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { Plus, Edit, Delete } from '@element-plus/icons-vue'
  import AddUser from './components/AddUser.vue'
  import UserInfo from './components/UserInfo.vue'

  import useStore from '@/store'
  import { IRows, IUser, UserData } from './types'
  import { GetUsers, DeleteUser, BatchDeleteUser } from '@/api/user'

  const { userStore } = useStore()

  let data = reactive(new UserData())

  const fetchUsers = async () => {
    try {
      data.loading = true
      const result = await GetUsers({ key: data.keysearch, search: data.keyword })

      if (result.status === 2000) {
        data.tableData = result.data
      }

      data.loading = false
    }
    catch {
      data.loading = false
    }
    
  }

  const chnageSelect = (selection: IUser[]) => {
    data.selected = selection
  }

  const onSearch = () => {
    fetchUsers()
  }

  const onEdit = ({ id }: IUser) => {
    data.oper = 'EDIT'
    data.addVisible = true

    const currUser = data.tableData.find(user => user.id === id)
    data.currentUser = currUser as IUser
  }

  const onDelete = async (id: number): Promise<void> => {
    try {
      await ElMessageBox.confirm(
        '确定删除改用户吗？',
        '温馨提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )

      await DeleteUser(id)

      fetchUsers()
      ElMessage({ type: 'success', message: '删除成功！' })
    }
    catch (error){
      if (error !== 'cancel') {
        ElMessage({ type: 'error', message: '删除失败！' })
      }
    }
  }

  const batchDelete = async (): Promise<void> => {
    try {
      const ids = data.selected.map(user => user.id)

      if (ids.length < 1) {
        throw new Error('请选择要删除的用户')
      }

      await ElMessageBox.confirm(
        '确定删除改用户吗？',
        '温馨提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )

      const result = await BatchDeleteUser(ids)

      if (result.status === 2000) {
        ElMessage.success('删除成功！')
        fetchUsers()
      } else {
        throw new Error(result.msg)
      }
    }
    catch(error) {
      if (error !== 'cancel') {
        ElMessage.info((error as Error).message)
      }
    }
  }

  const showUser = (user: IUser): void => {
    data.currentUser = user
    data.drawer = true    
  }

  // 添加 / 编辑用户成功的回调
  const suCallback = (): void => {
    ElMessage.success(`${data.oper === 'ADD' ? '添加' : '编辑'}用户成功！`)

    fetchUsers()
    data.addVisible = false
  }

  onMounted(() => {
    fetchUsers()
  })

  const rows: IRows[] = [
    {label: '账号', prop: 'username', width: '140' },
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
				<el-button
          :icon="Plus" link
          type="primary" text
          @click="data.addVisible = true; data.oper = 'ADD'"
        >
          增加
        </el-button>
				<el-button
          :icon="Delete" link
          type="danger" text
          :disabled="userStore.role !== 'admin'"
          @click="batchDelete"
        >
          批量删除
        </el-button>
			</div>
			<el-input
				v-model="data.keyword"
				class="input-with-select"
				:placeholder="
        `请输入${data.keysearch === 'username'? '账号' : data.keysearch === 'nickname' ? '昵称' : '地址'}`
        "
        @keyup.enter="onSearch"
			>
        <template #prepend>
          <el-select v-model="data.keysearch" placeholder="Select" style="width: 80px">
            <el-option label="账号" value="username" />
            <el-option label="昵称" value="nickname" />
            <el-option label="地址" value="address" />
          </el-select>
        </template>
				<template #append>
					<el-button @click="onSearch">搜索</el-button>
				</template>
			</el-input>
		</div>
		<div class="border-t border-gray-200">
			<div class="px-4 py-2">
				<el-table
          :data="data.tableData"
          highlight-current-row
          v-loading="data.loading"
          @selection-change="chnageSelect"
          style="width: 100%"
        >
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
              <el-link type="primary" @click="() => showUser(scope.row)">{{ scope.row[row.prop] }}</el-link>
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
              <el-link
                type="primary"
                :underline="false"
                @click="onEdit(scope.row)"
                :disabled="userStore.role !== 'admin'"
              >
                <el-icon :size="12"><Edit /></el-icon>
                编辑
              </el-link>
              <el-divider direction="vertical" />
              <el-link
                type="danger"
                :underline="false"
                @click="onDelete(scope.row.id)"
                :disabled="userStore.role !== 'admin'"
              >
                <el-icon :size="12"><Delete /></el-icon>
                删除
              </el-link>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
    <UserInfo :visible="data.drawer" :info="data.currentUser" :close="() => data.drawer = false" />
    <AddUser
      :type="data.oper"
      :visible="data.addVisible"
      :user="data.currentUser"
      :success="suCallback"
      :close="() => data.addVisible = false"
    />
	</div>
</template>

<style lang="less" scoped>
.input-with-select {
	width: 350px;
}
</style>