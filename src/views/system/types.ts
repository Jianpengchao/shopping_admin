export interface IRows {
	label: string
	prop: string
	width?: string
}

export interface IAddUser {
	id?: number
	username: string
	nickname: string
	phone: string
	password?: string
	role: string
	email: string
	address: string
}

export interface IUser {
	address: string | null
	avatar: string | null
	cart: string | null
	collection: string | null
	email: string | null
	id: number
	nickname: string | null
	password: string | null
	phone: string | null
	role: string | null
	username: string | null
	wallet: number | null
}

export class UserData {
	keyword = ''
	oper = 'add'
	drawer = false
	loading = false
	addVisible = false
	selected = [] as IUser[] | []
	currentUser = {} as IUser
	tableData: IUser[] | [] = []
}