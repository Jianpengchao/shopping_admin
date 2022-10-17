/**
 * @id id
 * @name 商品分类名称
 * @alias 商品分类别名
 * @status 状态: 0代表正常，1代表一禁用
 */
export interface ICate {
	id: number
	name: string
	alias: string
	status: number
}

export class CateState {
	data: ICate[] = []
}