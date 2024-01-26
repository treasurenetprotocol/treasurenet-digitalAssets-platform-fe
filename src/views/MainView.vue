<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Menu from '@/components/MenuComp.vue'
import Header from '@/components/HeaderComp.vue'
import { Layout } from 'ant-design-vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

const collapsed = ref(false)
</script>

<template>
  <Header />

  <Layout>
    <Layout.Sider v-model:collapsed="collapsed" :width="212" collapsible>
      <Menu />

      <template v-slot:trigger>
        <MenuFoldOutlined v-if="!collapsed" />
        <MenuUnfoldOutlined v-else />
      </template>
    </Layout.Sider>

    <Layout class="content-box">
      <Layout.Content class="content">
        <Suspense>
          <RouterView />
        </Suspense>
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<style lang="less">
html {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
}
</style>

<style lang="less" scoped>
.content-box {
  background: url(@/assets/imgs/content-bg.png) no-repeat right top/650px, linear-gradient(180deg, #E3EFFF 0%, #FFFFFF 100%);
}

.content {
  margin: 24px;
}
</style>
