<script setup lang="ts">
	import { reactive, onMounted } from 'vue'
	import { ElMessage, ElMessageBox } from 'element-plus'
  import { Plus, Edit, Delete } from '@element-plus/icons-vue'
	
	import { CateState, ICate } from './types';
	import { GetCates, DeleteCate, BatchDelCate } from '@/api/catemanage';

	const state = reactive(new CateState())

	const fetchCates = async (): Promise<void> => {
		let result = await GetCates()
		
		state.data = result.data
	}

	// 编辑
	const onEdit = ({ id }: ICate): void => {
		console.log(id)
	}

	// 删除
	const onDelete = async({ id }: ICate): Promise<void> => {
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
      const result = await DeleteCate(id)

			if (result.status === 2000) {
				fetchCates()

				ElMessage({ type: 'success', message: '删除成功！' })
			}
    }
    catch (error){
      if (error !== 'cancel') {
        ElMessage({ type: 'error', message: '删除失败！' })
      }
    }
	}

	const batchDelete = async (): Promise<void> => {
		try {
			const ids = state.selected.map(c => c.id)

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

			const result = await BatchDelCate(ids)

			if (result.status === 2000) {
				fetchCates()

				ElMessage({ type: 'success', message: '删除成功！' })
			}
		}
		catch (error) {
			if (error !== 'cancel') {
        ElMessage.info((error as Error).message)
      }
		}
	}

	const onSearch = (): void => {
		
		console.log('搜索');
		
	}

	const chnageSelect = (selection: ICate[]) => {
    state.selected = selection
  }

	onMounted(() => {
		fetchCates()
	})

	const rows = [
    {label: '名称', prop: 'name' },
    {label: '昵称', prop: 'alias' },
    {label: '状态', prop: 'status', width: '140' },
  ]
</script>

<template>
	<div class="overflow-hidden bg-white shadow sm:rounded-lg">
		<div class="px-4 py-3 sm:px-6 flex" style="justify-content: space-between;">
			<div class="flex-10">
				<el-button :icon="Plus" link type="primary" text>
          增加
        </el-button>
				<el-button :icon="Delete" link type="danger" text @click="batchDelete">
          批量删除
        </el-button>
			</div>
			<el-input v-model="state.keyword" class="input-with-select" @keyup.enter="onSearch">
        <template #prepend>
          <el-select v-model="state.keysearch" placeholder="Select" style="width: 80px">
            <el-option label="名称" value="name" />
            <el-option label="昵称" value="alias" />
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
          :data="state.data"
          highlight-current-row
          style="width: 100%"
					@selection-change="chnageSelect"
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
            <template #default="scope" v-if="row.prop === 'status'">
							<el-tag :type="scope.row[row.prop] === 0 ? '' : 'warning'">
								{{ scope.row[row.prop] === 0 ? '正常' : '禁用' }}
							</el-tag>
						</template>

						<template #default="scope" v-else>
							{{ scope.row[row.prop] }}
						</template>
					</el-table-column>

					<el-table-column fixed="right" align="center" label="操作" width="150">
						<template #default="scope">
              <el-link
                type="primary"
                :underline="false"
								@click="onEdit(scope.row)"
              >
                <el-icon :size="12"><Edit /></el-icon>
                &nbsp;编辑
              </el-link>
              <el-divider direction="vertical" />
              <el-link
                type="danger"
                :underline="false"
								@click="onDelete(scope.row)"
              >
                <el-icon :size="12"><Delete /></el-icon>
                &nbsp;删除
              </el-link>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
	
</template>

<style lang="less" scoped>
.input-with-select {
	width: 350px;
}
</style>