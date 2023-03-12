/**
 * 后端微服务端口名
 * */
export const PORT1: string = "/hooks";
export const PORT2: string = "/geeker";

// 请求的配置
export const httpConfig: any = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（30s）
	timeout: 30000,
	// 跨域时候允许携带凭证
	withCredentials: true
};
