<template>
  <main class="card account">
    <div class="title">
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
          <Tag bgColor="#FBE9D4" iconColor="#EF903C">Aasas</Tag>
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
    status: 1
  },
  {
    key: '3',
    account: '0x27f2Eeed8a0d43eAd5DDc6eB41c172DF91740B03',
    type: 1,
    network: 1,
    status: 1
  },
]
</script>

<style lang="less" scoped>
.account {
  .title {
    display: flex;
    margin-bottom: 18px;
    align-items: center;
    justify-content: space-between;

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
      color: #1E1E1E;
      line-height: 1;
    }
  }
  .n-btn {
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    border-radius: 4px;
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
