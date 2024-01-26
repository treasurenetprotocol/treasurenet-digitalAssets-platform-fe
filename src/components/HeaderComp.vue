<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/imgs/logo.png" alt="">
    </div>
    <div class="opera">
      <a href="javascript:;">
        <img src="@/assets/imgs/tips-none.png" alt="">
      </a>
      <span>|</span>
      <a href="javascript:;">
        {{ addressCut('0xdgfdgdfgfdgdfgdfgg') }}
      </a>
      <span>|</span>
      <a href="javascript:;">
        <img src="@/assets/imgs/logout.png" alt="">
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { Button } from 'ant-design-vue'
import { addressCut } from '@/libs/utils'
</script>

<style lang="less" scoped>
.header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #252A3D;

  .logo {
    color: #CED0D9;
    margin-left: 12px;

    img {
      height: 24px;
    }
  }

  .opera {
    color: #CED0D9;
    padding-right: 24px;

    a {
      color: #CED0D9;
      text-decoration: none;

      img {
        width: 16px;
        vertical-align: bottom;
      }
    }

    span {
      padding: 0 15px;
    }
  }
}
</style>