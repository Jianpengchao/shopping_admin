<script lang="ts" setup>
  import useStore from '@/store'
  import Aside from './components/Aside.vue'
  import Header from './components/Header.vue'
  import NavTabs from './components/NavTabs.vue'

  const { globalStore } =useStore()
</script>

<template>
    <div class="common-layout">
      <el-container style="height: 100vh;">
        <el-aside :width="globalStore.menuCollapse ? '64px' : '210px'" class="common-layout-aside"><Aside /></el-aside>
        <el-container>
          <el-header style="padding: 0;height: 44px;"><Header /></el-header>
          <NavTabs />
          <el-main class="common-layout-main">
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<style scoped lang="less">
.common-layout {
  min-height: 100vh;
  &-main {
    background-color: #f7f7f7;
  }

  &-aside {
    z-index: 999;
    transition: all .4s;
    box-shadow: 4px 0px 10px #ccc;
  }
}
</style>