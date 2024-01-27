<template>
  <main class="card">
    <div class="header-title">
      <h2>System messages</h2>
      <!-- <a href="javascript:;" class="n-btn">
        <img src="@/assets/imgs/userbind-icon.png" alt="">
        <span>Bind account</span>
      </a> -->
    </div>

    <Collapse v-model:activeKey="activeKey" :bordered="false" style="background: rgb(255, 255, 255)" accordion>
      <template #expandIcon="panel">
        <CaretRightOutlined :rotate="panel?.isActive ? 90 : 0" />
      </template>
      <Collapse.Panel key="1" header="The oil quality has passed the review, and the validity of the white list has been increased by 365 days!">
        <div class="content">
          <p class="title">From: Liu Shanghai</p>
          <p>Text localization and its recognition in images was important for searching information in digital photo archives, video databases and web sites.Text localization and its recognition in images was important for searching information in digital photo archives, video databases and web sites.Text localization and its recognition in images was important for searching information in digital photo archives, video databases and web sites.</p>
        </div>
        <template #extra>
          <span class="extra-text">6 Days ago</span>
        </template>
      </Collapse.Panel>
      <Collapse.Panel key="2" header="The oil quality has passed the review, and the validity of the white list has been increased by 365 days!">
        <div class="content">
          <p class="title">From: Liu Shanghai</p>
          <p>Text localization and its recognition in images was important for searching information in digital photo archives, video databases and web sites.Text localization and its recognition in images was important for searching information in digital photo archives, video databases and web sites.Text localization and its recognition in images was important for searching information in digital photo archives, video databases and web sites.</p>
        </div>
        <template #extra>
          <span class="extra-text">6 Days ago</span>
        </template>
      </Collapse.Panel>
      <Collapse.Panel key="3" header="The oil quality has passed the review, and the validity of the white list has been increased by 365 days!">
        <div class="content">
          <p class="title">From: Liu Shanghai</p>
          <p>Text localization and its recognition in images was important for searching information in digital photo archives, video databases and web sites.Text localization and its recognition in images was important for searching information in digital photo archives, video databases and web sites.Text localization and its recognition in images was important for searching information in digital photo archives, video databases and web sites.</p>
        </div>
        <template #extra>
          <span class="extra-text">6 Days ago</span>
        </template>
      </Collapse.Panel>
    </Collapse>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Collapse } from 'ant-design-vue'
import { CaretRightOutlined } from '@ant-design/icons-vue'

const activeKey = ref([])
</script>

<style lang="less" scoped>
.extra-text {
  font-size: 14px;
  font-weight: 400;
  color: #8C8C8C;
}

.content {
  padding-left: 33px;

  .title {
    font-size: 14px;
    font-weight: 400;
    color: #8C8C8C;
    margin-top: 0;
  }
}
</style>