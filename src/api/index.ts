import axios from "@/api/request";

/**
 * 获取热榜分类数据
 * @param {string} type 热榜分类名称
 * @param {boolean} isNew 是否拉取最新数据
 * @param {object} params 请求参数
 * @returns
 */
export const getHotLists = (type: string, isNew = false, params: any) => {
    return axios({
        method: "GET",
        url: `/${type}`,
        params: {
            cache: !isNew,
            ...params,
        },
    });
}