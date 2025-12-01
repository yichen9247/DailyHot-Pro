<script setup lang="ts">
    import { getHotLists } from '@/api'
    import { ToastType } from '@/enums/ToastType'
    import { formatTime } from '@/scripts/getTime'
    import { NewsItem, NewsResponse } from '@/types'
    import { onMounted, PropType, Ref, ref } from 'vue'
    import { openSite, showToasts } from '@/scripts/utils'
    import { Refresh, More } from '@element-plus/icons-vue'
    import HotDetailDialog from '@/dialog/HotDetailDialog.vue'
    import { DialogServiceImpl } from '@/service/impl/DialogServiceImpl'

    const loading = ref(true);
    const props = defineProps({
        item: Object as PropType<NewsItem>
    })
    const domRef = ref<HTMLElement | null>(null);
    const dataResult: Ref<NewsResponse> = ref(null);
    const dialogServiceImpl = new DialogServiceImpl();    

    const checkListShow = (): void => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    getHotListsData();
                }
            });
        });
        observer.observe(domRef.value);
    }

    const getHotListsData = async (isNew: boolean = false) => {
        loading.value = true;
        try {
            const response = await getHotLists(props.item.name, isNew, {});
            dataResult.value = response.data as NewsResponse;
        } catch (error) {
            console.log("热榜加载失败，请重试")
        } finally {
            loading.value = false;
        }
    }

    const openDetailDialog = (): void => {
        if (loading.value) return;
        if (!dataResult.value) {
            showToasts(ToastType.ERROR, "热榜加载失败，请重试");
        } else dialogServiceImpl.openCustomSwalDialog(HotDetailDialog, {
            title: props.item.label,
            props: {
                data: dataResult.value
            }
        });
    }

    onMounted((): void => checkListShow());
</script>

<template>
    <div class="app-card news-card" ref="domRef">
        <div class="card-header" @click="openDetailDialog()">
            <img class="app-logo" v-lazy="item.icon" :alt="item.label" draggable="false">
            <span class="app-name">{{ item.label }}</span>
            <el-skeleton animated :loading="loading">
                <template #default>
                    <span class="app-type">{{ dataResult ? dataResult.type : "错误" }}</span>
                </template>
                <template #template>
                    <el-skeleton-item variant="text" style="height: 20px; width: 80px;" />
                </template>
            </el-skeleton>
        </div>
        <div class="card-content">
            <el-skeleton animated :loading="loading">
                <template #default>
                    <div class="news-item" v-if="dataResult" v-for="(news, index) in dataResult.data.slice(0, 10)" :key="index" @click="openSite(news.url)">
                        <div class="item-num">
                            <span>{{ index + 1 }}</span>
                        </div>
                        <div class="item-content">
                            <p class="item-text">{{ news.title }}</p>
                        </div>
                    </div>
                    <div class="result-box" v-else>
                        <el-result icon="error" title="哎呀，加载失败了" sub-title="生活总会遇到不如意的事情">
                            <template #icon>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                                    <path fill="#FFCC4D"
                                        d="M36 18c0 9.941-8.059 18-18 18-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18">
                                    </path>
                                    <ellipse fill="#664500" cx="18" cy="27" rx="5" ry="6"></ellipse>
                                    <path fill="#664500"
                                        d="M5.999 11c-.208 0-.419-.065-.599-.2-.442-.331-.531-.958-.2-1.4C8.462 5.05 12.816 5 13 5c.552 0 1 .448 1 1 0 .551-.445.998-.996 1-.155.002-3.568.086-6.204 3.6-.196.262-.497.4-.801.4zm24.002 0c-.305 0-.604-.138-.801-.4-2.64-3.521-6.061-3.598-6.206-3.6-.55-.006-.994-.456-.991-1.005C22.006 5.444 22.45 5 23 5c.184 0 4.537.05 7.8 4.4.332.442.242 1.069-.2 1.4-.18.135-.39.2-.599.2zm-16.087 4.5l1.793-1.793c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0L12.5 14.086l-1.793-1.793c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.793 1.793-1.793 1.793c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l1.793-1.793 1.793 1.793c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414L13.914 15.5zm11 0l1.793-1.793c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0L23.5 14.086l-1.793-1.793c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.793 1.793-1.793 1.793c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l1.793-1.793 1.793 1.793c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414L24.914 15.5z">
                                    </path>
                                </svg>
                            </template>
                            <template #extra>
                                <el-button :icon="Refresh" size="large" @click="getHotListsData(true)">重新加载</el-button>
                            </template>
                        </el-result>
                    </div>
                </template>
                <template #template>
                    <el-skeleton-item variant="text" style="height: 24px; margin-bottom: 10px;" v-for="value in 10" />
                </template>
            </el-skeleton>
        </div>
        <div class="card-footer">
            <el-skeleton animated :loading="loading && !dataResult">
                <template #default>
                    <span class="app-time">{{ formatTime(dataResult.updateTime) }}</span>
                    <div class="button-list">
                        <el-icon :size="16" @click="openDetailDialog()">
                            <More />
                        </el-icon>
                        <el-icon :size="16" @click="getHotListsData(true)">
                            <Refresh />
                        </el-icon>
                    </div>
                </template>
                <template #template>
                    <el-skeleton-item variant="text" style="height: 20px; width: 100%;" />
                </template>
            </el-skeleton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import url("./style/HotItem.scss");
</style>