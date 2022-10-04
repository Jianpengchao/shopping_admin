<script setup lang="ts">
  import { ref } from 'vue'
  
  import LoginForm from './components/LoginForm.vue'
  import RegisterForm from './components/RegisterForm.vue'

  let isLogin = ref<boolean>(true)

  const onToggle = () => {
    isLogin.value = !isLogin.value
  }
</script>

<template>
  <div class="login">
    <div class="login-container">
      <div :class="['login-form', isLogin ? 'login-form' : 'register-form']">
        <component :toggleMode="onToggle" :is="isLogin ? LoginForm : RegisterForm"></component>
      </div>
      <div :class="['toggle-mode', isLogin ? 'login-mode' : 'register-mode']">
        <div class="toggle-btn" @click="onToggle">{{isLogin ? '去注册' : '去登录'}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  
  &-container {
    position: relative;
    background: rgba(220, 221, 220, 0.4);
    width: 584px;
    height: 382px;
  }
}

.login-form {
  position: absolute;
  width: 62%;
  height: 100%;
  transition: all 1s;
  background-color: whitesmoke;
  z-index: 333;
  box-sizing: border-box;
  padding: 30px 50px;
}
.login-form {
  top: 0;
  left: 0;
}
.register-form {
  top: 0;
  left: 38%;
}
.toggle-mode {
  position: absolute;
  z-index: 444;
  width: 38%;
  height: 100%;
  transition: all 2s;
  background-color: lightpink;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-mode {
  top: 0;
  left: 62%;
}
.register-mode {
  top: 0;
  left: 0;
}

.toggle-btn {
  font-size: 20px;
  font-weight: 600;
  color: lightcyan;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 20px;
  background: linear-gradient(to right, rgb(37, 61, 201), rgb(113, 235, 252));
}
</style>
