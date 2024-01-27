<template>
  <main class="card account">
    <div class="header-title">
      <h2>Account Management</h2>
      <a href="javascript:;" class="n-btn">
        <img src="@/assets/imgs/userbind-icon.png" alt="">
        <span>Bind account</span>
      </a>
    </div>

    <Table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'account'">
          <Tooltip>
            <template #title>{{ record.account }}</template>
            {{ addressCut(record.account, 12) }}
          </Tooltip>
        </template>
        <template v-else-if="column.key === 'type'">
          {{ typeMaps[record.type] }}
        </template>
        <template v-else-if="column.key === 'network'">
          {{ networkMaps[record.network] }}
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag bgColor="rgba(255, 138, 27, .2)" iconColor="#FF8A1B" v-if="record.status === 1">
            <template #icon>
              <img src="@/assets/imgs/inpreview-icon.png" alt="">
            </template>
            <span>In review</span>
          </Tag>
          <Tag bgColor="rgba(28, 80, 222, .2)" iconColor="#1C50DE" v-else-if="record.status === 2">
            <template #icon>
              <img src="@/assets/imgs/reviewed-icon.png" alt="">
            </template>
            <span>Reviewed</span>
          </Tag>
          <Tag bgColor="rgba(116, 117, 119, .2)" iconColor="#747577" v-else>
            <template #icon>
              <img src="@/assets/imgs/failed-icon.png" alt="">
            </template>
            <span>Failed</span>
          </Tag>
        </template>
      </template>
    </Table>
  </main>
</template>

<script lang="ts" setup>
import Tag from '@/components/TagComp.vue'
import { addressCut } from '@/libs/utils'
import { Table, Tooltip } from 'ant-design-vue'

const typeMaps: { [k: string]: string } = {
  1: 'Ethereum system',
  2: 'Bitcoin system'
}

const networkMaps: { [k: string]: string } = {
  1: 'Ethereum',
  2: 'Bitcoin system'
}

const columns = [
  {
    title: 'Account',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Network',
    dataIndex: 'network',
    key: 'network',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  }
]

const data = [
  {
    key: '1',
    account: '0x27f2Eeed8a0d43eAd5DDc6eB41c172DF91740B03',
    type: 1,
    network: 1,
    status: 1
  },
  {
    key: '2',
    account: '0x27f2Eeed8a0d43eAd5DDc6eB41c172DF91740B03',
    type: 2,
    network: 2,
    status: 2
  },
  {
    key: '3',
    account: '0x27f2Eeed8a0d43eAd5DDc6eB41c172DF91740B03',
    type: 1,
    network: 1,
    status: 3
  },
]
</script>

<style lang="less" scoped>
.account {
  .n-btn {
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    border-radius: 6px;
    padding: 8px 16px;
    line-height: 18px;
    text-decoration: none;
    background-color: #225BFC;

    img {
      width: 14px;
      margin-right: 8px;
    }

    img,
    span {
      vertical-align: middle;
    }
  }
}
</style>
