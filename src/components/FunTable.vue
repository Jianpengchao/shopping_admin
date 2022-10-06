<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { IRows } from '@/views/system/types';

defineProps<{
  rows: IRows[]
}>()

const input3 = ref('')
const tableData = [{"id":1,"username":"李白","password":"","nickname":null,"phone":null,"email":null,"avatar":null,"address":null,"role":null,"wallet":null,"collection":null,"cart":null},{"id":2,"username":"杜甫","password":"","nickname":null,"phone":null,"email":null,"avatar":null,"address":null,"role":null,"wallet":null,"collection":null,"cart":null},{"id":3,"username":"黄琳","password":"","nickname":null,"phone":null,"email":null,"avatar":null,"address":null,"role":null,"wallet":null,"collection":null,"cart":null},{"id":4,"username":"zs","password":"","nickname":null,"phone":null,"email":null,"avatar":null,"address":null,"role":null,"wallet":null,"collection":null,"cart":null},{"id":5,"username":"hl","password":"","nickname":null,"phone":null,"email":null,"avatar":null,"address":null,"role":null,"wallet":10,"collection":null,"cart":null},{"id":6,"username":"dufu","password":"","nickname":null,"phone":null,"email":null,"avatar":null,"address":null,"role":null,"wallet":null,"collection":null,"cart":null},{"id":7,"username":"jian","password":"","nickname":null,"phone":null,"email":null,"avatar":null,"address":null,"role":null,"wallet":null,"collection":null,"cart":null},{"id":8,"username":"ll","password":"","nickname":null,"phone":null,"email":null,"avatar":null,"address":null,"role":null,"wallet":null,"collection":null,"cart":null},{"id":9,"username":"huanglin","password":"","nickname":null,"phone":null,"email":null,"avatar":null,"address":null,"role":null,"wallet":null,"collection":null,"cart":null}]

const onEdit = (row: any) => {
	console.log(row.date)
}
</script>

<template>
	<div class="overflow-hidden bg-white shadow sm:rounded-lg">
		<div class="px-4 py-3 sm:px-6 flex" style="justify-content: space-between;">
			<div class="flex-10">
				<el-button :icon="Plus" link type="primary" text>增加</el-button>
				<el-button :icon="Delete" link type="danger" text>批量删除</el-button>
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
				<el-table :data="tableData" style="width: 100%">
					<el-table-column type="selection" width="45" />

					<el-table-column
						align="center"
						:prop="row.prop"
						:label="row.label"
						:width="row.width || ''"
						:key="row.prop"
						v-for="row in rows"
					>
						<template #default="scope">
							{{ scope.row[row.prop] }}
						</template>
					</el-table-column>

					<el-table-column fixed="right" align="center" label="操作" width="130">
						<template #default="scope">
							<el-button link :icon="Edit" type="primary" size="small" @click="onEdit(scope.row)"
								>编辑</el-button
							>
							<el-button link :icon="Delete" type="danger" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.input-with-select {
	width: 280px;
}
</style>