import config from "@/scripts/config";
import { showToasts } from "@/scripts/utils";
import { ToastType } from "@/enums/ToastType";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

axios.defaults.timeout = 30000;
axios.defaults.baseURL = config.api;

/**
 * 请求拦截
 */
axios.interceptors.request.use(
    (request): InternalAxiosRequestConfig<any> => {
        const token = localStorage.getItem("token");
        if (token) request.headers.Authorization = token;
        return request;
    },
    (error): any => {
        showToasts(ToastType.ERROR, "请求失败，请稍后重试");
        return Promise.reject(error);
    }
);

/**
 * 响应拦截
 */
axios.interceptors.response.use(
    (response): AxiosResponse<any, any, {}> => {
        return response;
    },
    (error): any => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    showToasts(ToastType.ERROR, "请登录后使用");
                    break;
                case 301:
                    showToasts(ToastType.ERROR, "请求路径跳转");
                    break;
                case 403:
                    showToasts(ToastType.ERROR, "没有访问权限");
                    break;
                case 404:
                    showToasts(ToastType.ERROR, "资源没有找到");
                    break;
            }
        } else showToasts(ToastType.ERROR, "请求失败，请稍后重试");
        return Promise.reject(error);
    }
)

export default axios;