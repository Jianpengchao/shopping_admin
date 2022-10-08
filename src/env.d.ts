
interface ImportMetaEnv {
    readonly VITE_APP_DEV: string
    readonly VITE_APP_BASE_URL: string
    // 更多环境变量...
}

declare global {
    interface ResponseSuccess<T> {
        status: number
        msg: string
        data: T
    }
}

export {}