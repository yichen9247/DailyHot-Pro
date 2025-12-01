<script setup lang="ts">
    import config from '@/scripts/config'
    import favicon from "@/assets/favicon.png"
    import { defaultNewsArr } from '@/scripts/hotList'
    import AboutDialog from '@/dialog/AboutDialog.vue'
    import { Refresh, Notification } from '@element-plus/icons-vue'
    import { DialogServiceImpl } from '@/service/impl/DialogServiceImpl'

    const dialogServiceImpl = new DialogServiceImpl();

    const refreshData = (): void => {
        const oldData = [...defaultNewsArr];
        defaultNewsArr.length = 0;
        setTimeout((): any => defaultNewsArr.splice(0, defaultNewsArr.length, ...oldData), 0);
    }
</script>

<template>
    <div class="app-card home-header">
        <img class="app-logo" v-lazy="favicon" alt="DailyHot-Pro" draggable="false">
        <span class="app-title">{{ config.title }}</span>
        <div class="button-list">
            <el-button color="#606266" :icon="Refresh" plain @click="refreshData()"/>
            <el-button color="#606266" :icon="Notification" plain @click="dialogServiceImpl.openCustomSwalDialog(AboutDialog, {
                title: '关于项目'
            })"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import url("./style/HomeHeader.scss");
</style>