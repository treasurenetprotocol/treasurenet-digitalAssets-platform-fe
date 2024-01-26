<template>
  <div class="menu">
    <Menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" :inlineIndent="12" @click="onMenuClick">
      <Menu.Item key="/account">
        <template #icon>
          <img src="@/assets/imgs/menu-u.png" alt="" class="menu-icon" v-if="!menuKeys['/account']">
          <img src="@/assets/imgs/menu-u-active.png" alt="" class="menu-icon" v-else>
        </template>
        <span>Account Management</span>
      </Menu.Item>
      <Menu.Item key="/digital-amount">
        <template #icon>
          <img src="@/assets/imgs/menu-d.png" alt="" class="menu-icon" v-if="!menuKeys['/digital-amount']">
          <img src="@/assets/imgs/menu-d-active.png" alt="" class="menu-icon" v-else>
        </template>
        <span>Digital Amount</span>
      </Menu.Item>
      <Menu.Item key="/tat-details">
        <template #icon>
          <img src="@/assets/imgs/menu-t.png" alt="" class="menu-icon" v-if="!menuKeys['/tat-details']">
          <img src="@/assets/imgs/menu-t-active.png" alt="" class="menu-icon" v-else>
        </template>
        <span>TAT Details</span>
      </Menu.Item>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedKeys = ref<string[]>(['/account'])

const menuKeys = ref<{ [k: string]: boolean }>({ '/account': true, '/digital-amount': false, '/tat-details': false })
const onMenuClick = ({ key }: any) => {
  menuKeys.value['/account'] = false
  menuKeys.value['/digital-amount'] = false
  menuKeys.value['/tat-details'] = false
  menuKeys.value[key] = true

  router.push(`/manage${key}`)
}
</script>

<style lang="less" scoped>
.menu {
  .menu-icon {
    width: 14px;
  }
}
</style>