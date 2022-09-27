<script lang="ts" setup>
  import Aside from './components/Aside.vue'
  import Header from './components/Header.vue';
</script>

<template>
    <div class="common-layout">
      <el-container style="height: 100vh;">
        <el-aside width="210px" style="box-shadow: 4px 0px 10px #ccc;z-index: 999;"><Aside /></el-aside>
        <el-container>
          <el-header style="padding: 0;height: 44px;"><Header /></el-header>
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
}
</style>