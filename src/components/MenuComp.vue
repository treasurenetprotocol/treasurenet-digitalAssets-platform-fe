<template>
  <div class="menu">
    <Menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" :inlineIndent="12" @click="onMenuClick">
      <Menu.Item key="/manage/account">
        <template #icon>
          <img src="@/assets/imgs/menu-u.png" alt="" class="menu-icon" v-if="!menuKeys['/manage/account']">
          <img src="@/assets/imgs/menu-u-active.png" alt="" class="menu-icon" v-else>
        </template>
        <span>Account Management</span>
      </Menu.Item>
      <Menu.Item key="/manage/digital-amount">
        <template #icon>
          <img src="@/assets/imgs/menu-d.png" alt="" class="menu-icon" v-if="!menuKeys['/manage/digital-amount']">
          <img src="@/assets/imgs/menu-d-active.png" alt="" class="menu-icon" v-else>
        </template>
        <span>Digital Amount</span>
      </Menu.Item>
      <Menu.Item key="/manage/tat-details">
        <template #icon>
          <img src="@/assets/imgs/menu-t.png" alt="" class="menu-icon" v-if="!menuKeys['/manage/tat-details']">
          <img src="@/assets/imgs/menu-t-active.png" alt="" class="menu-icon" v-else>
        </template>
        <span>TAT Details</span>
      </Menu.Item>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Menu } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedKeys = ref<string[]>(['/manage/account'])

const menuKeys = ref<{ [k: string]: boolean }>({ '/manage/account': true, '/manage/digital-amount': false, '/manage/tat-details': false })

const setMenuKeys = (key: string) => {
  menuKeys.value['/manage/account'] = false
  menuKeys.value['/manage/digital-amount'] = false
  menuKeys.value['/manage/tat-details'] = false
  menuKeys.value[key] = true
}

const onMenuClick = ({ key }: any) => {
  setMenuKeys(key)
  router.push(key)
}

onMounted(() => {
  setMenuKeys(router.currentRoute.value.path)
  selectedKeys.value = [router.currentRoute.value.path]
})
</script>

<style lang="less" scoped>
.menu {
  .menu-icon {
    width: 14px;
  }
}
</style>