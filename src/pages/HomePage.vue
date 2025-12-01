<script setup lang="ts">
    import HotItem from '@/components/HotItem.vue'
    import { defaultNewsArr } from '@/scripts/hotList'
    import HomeHeader from '@/components/HomeHeader.vue'
    import HomeFooter from '@/components/HomeFooter.vue'
</script>

<template>
    <section class="app-page page-home">
        <HomeHeader />
        <main class="main-grid">
            <HotItem v-for="(item, index) in defaultNewsArr.filter((item) => item.show)" :key="index" :style="{ animationDelay: index / 10 + 0.2 + 's' }" :item="item"/>
        </main>
        <HomeFooter v-if="defaultNewsArr.length !== 0"/>
    </section>
</template>

<style lang="scss" scoped>
@import url("./style/HomePage.scss");
</style>