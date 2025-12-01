<script setup lang="ts">
    import { PropType, ref, Ref } from 'vue'
    import { NewsResponse } from '@/types'
    import { openSite } from '@/scripts/utils'

    const pages: Ref<number> = ref(1);
    const limit: Ref<number> = ref(100);

    const props = defineProps({
        data: Object as PropType<NewsResponse>
    });
</script>

<template>
    <div class="app-dialog dialog-hot-detail">
        <div class="dialog-content">
            <div class="news-item" v-for="(item, index) in data.data.slice((pages - 1) * limit, (pages - 1) * limit + limit)" :key="index" @click="openSite(item.url)">
                <div class="item-num" :data-value="(pages - 1) * limit + index + 1">
                    <span>{{ (pages - 1) * limit + index + 1 }}</span>
                </div>
                <div class="item-content">
                    <p class="item-text">{{ item.title }}</p>
                </div>
            </div>
            <!-- <div class="pagination-box">
                <el-pagination class="pagination" background layout="prev, pager, next" :total="data.total" :default-page-size="limit" @currentChange="currentChange"/>
            </div> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url("./style/HotDetailDialog.scss");
</style>