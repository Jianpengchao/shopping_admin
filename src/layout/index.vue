
<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'

const getsda = () => {
  console.log('fds')
  axios.get('/sapi/user/gettest', {
    params: {
      id: ['100', '200', '300'],
      name: '杜甫'
    }
  }).then(res => {
    console.log(res.data)
  })
}

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="common-layout-aside">Aside</el-aside>
      <el-container>
        <el-header class="common-layout-header">Header</el-header>
        <el-main class="common-layout-main">

          <div @click="getsda">GET Request</div>
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