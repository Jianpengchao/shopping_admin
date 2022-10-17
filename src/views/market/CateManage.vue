<script setup lang="ts">
	import { reactive, onMounted } from 'vue'
	import { ElMessage, ElMessageBox } from 'element-plus'
  import { Edit, Delete } from '@element-plus/icons-vue'
	
	import { CateState, ICate } from './types';
	import { GetCates, DeleteCate } from '@/api/catemanage';

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
	<div>
		<div class="border-t border-gray-200">
			<div class="px-4 py-2">
				<el-table
          :data="state.data"
          highlight-current-row
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

</style>