
<script lang="ts" setup>
import { ref } from 'vue'

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="common-layout-aside">Aside</el-aside>
      <el-container>
        <el-header class="common-layout-header">Header</el-header>
        <el-main class="common-layout-main">

          main
          <router-view />

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.common-layout {
  height: 100vh;

  &-aside {
    background-color: antiquewhite;
  }

  &-main {
    background-color: #eee;
  }

  &-header {
    background-color: aqua;
  }
}
</style>