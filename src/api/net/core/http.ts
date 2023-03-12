import NProgress from "@/config/nprogress";
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { ResultData } from "@/api/modules/interface";
import { ResultEnum } from "@/enums/httpEnum";
import { checkStatus } from "../helper/checkStatus";
import { AxiosCanceler } from "../helper/axiosCancel";
import { setToken } from "@/redux/modules/global/action";
import { message } from "antd";
import { store } from "@/redux";

const axiosCanceler = new AxiosCanceler();

/**
 * 网络请求类
 * */
class NetHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		this.service = axios.create(config);

		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				NProgress.start();
				axiosCanceler.addPending(config);
				config.headers!.noLoading || showFullScreenLoading();
				const token: string = store.getState().global.token;
				return { ...config, headers: { ...config.headers, "x-access-token": token } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config } = response;
				NProgress.done();
				axiosCanceler.removePending(config);
				tryHideFullScreenLoading();
				//  登录失效（code == 599）
				if (data.code == ResultEnum.OVERDUE) {
					store.dispatch(setToken(""));
					message.error(data.msg);
					window.location.hash = "/login";
					return Promise.reject(data);
				}
				// 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
				if (data?.code !== ResultEnum.SUCCESS) {
					message.error(data.msg);
					return Promise.reject(data);
				}
				return data;
			},
			async (error: AxiosError) => {
				const { response } = error;
				NProgress.done();
				tryHideFullScreenLoading();
				if (error.message.indexOf("timeout") !== -1) message.error("请求超时，请稍后再试");
				if (response) checkStatus(response.status);
				if (!window.navigator.onLine) window.location.hash = "/500";
				return Promise.reject(error);
			}
		);
	}

	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}

	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}

	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}

	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
}
export default NetHttp;
