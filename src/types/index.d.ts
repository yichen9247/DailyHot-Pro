export interface NewsItem {
    label: string,
    name: string,
    order: number,
    show: boolean,
    icon: string
}

export interface NewsDataItem {
    id: string,
    hot: number,
    url: string,
    desc: string,
    title: string,
    author: string,
    mobileUrl: string,
    timestamp: number
}

export interface NewsResponse {
    name: string,
    type: string,
    code: number,
    link: string,
    title: string,
    total: number,
    updateTime: string,
    description: string,
    data: NewsDataItem[]
}