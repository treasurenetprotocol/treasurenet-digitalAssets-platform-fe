<template>
  <main class="card digital">
    <div class="header-title">
      <h2>Digital Amount</h2>
      <div class="choose">
        <div class="item">
          <span>Date:</span>
          <Select style="width: 105px" v-model:value="date">
            <Select.Option value="0">All</Select.Option>
            <Select.Option value="1">2023/3/30</Select.Option>
          </Select>
        </div>
        <div class="item">
          <span>Type:</span>
          <Select style="width: 60px" v-model:value="type">
            <Select.Option value="0">All</Select.Option>
            <Select.Option value="1">BTC</Select.Option>
            <Select.Option value="2">ETH</Select.Option>
          </Select>
        </div>
        <div class="item">
          <span>Status:</span>
          <Select style="width: 90px" v-model:value="status">
            <Select.Option value="0">All</Select.Option>
            <Select.Option value="1">Minted</Select.Option>
            <Select.Option value="2">Verified</Select.Option>
          </Select>
        </div>
      </div>
    </div>

    <Table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'price'">
          Price<span style="color:#8c8c8c">/$</span>
        </template>
        <template v-if="column.key === 'value'">
          Value<span style="color:#8c8c8c">/$</span>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'date'">{{ realDate(record.date) }}</template>
        <template v-else-if="column.key === 'type'">{{ typeMaps[record.type] }}</template>
        <template v-else-if="column.key === 'reward'">
          {{ record.reward }} <span style="color:#8c8c8c">{{ typeMaps[record.type] }}</span>
        </template>
        <template v-else-if="column.key === 'price'">{{ numFormat(record.price) }}</template>
        <template v-else-if="column.key === 'status'">
          <Tag bgColor="rgba(126, 211, 33, .2)" iconColor="#7ED321" v-if="record.status === 1">
            <template #icon>
              <img src="@/assets/imgs/verified-icon.png" alt="">
            </template>
            <span>Verified</span>
          </Tag>
          <Tag bgColor="rgba(28, 80, 222, .2)" iconColor="#1C50DE" v-else>
            <template #icon>
              <img src="@/assets/imgs/reviewed-icon.png" alt="">
            </template>
            <span>Minted</span>
          </Tag>
        </template>
        <template v-else-if="column.key === 'operation'">
          <a href="javascript:;" style="font-weight:500" v-if="record.status === 1" @click="openMintTAT">Mint TAT</a>
        </template>
      </template>
    </Table>
  </main>

  <Modal v-model:open="openMint" title="Mint TAT" okText="Confirm" @ok="mintTAT" centered>
    <p class="mint-text">
      You can mint:
      <b>{{ numFormat(365959.45) }}</b>
      <span>TAT</span>
    </p>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Tag from '@/components/TagComp.vue'
import { realDate, numFormat } from '@/libs/utils'
import { Table, Modal, Select, message } from 'ant-design-vue'

const typeMaps: { [k: string]: string } = {
  1: 'ETH',
  2: 'BTC'
}

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Block height',
    dataIndex: 'block',
    key: 'block',
  },
  {
    title: 'Reward',
    key: 'reward',
    dataIndex: 'reward',
  },
  {
    title: 'Price',
    key: 'price',
    dataIndex: 'price',
  },
  {
    title: 'Value',
    key: 'value',
    dataIndex: 'value',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'Operation',
    key: 'operation',
    dataIndex: 'operation',
  }
]

const data = [
  {
    key: '1',
    date: 1706321291210,
    type: 1,
    block: 6789,
    reward: 1.088,
    price: 2308.76,
    value: 10000,
    status: 1
  },
  {
    key: '2',
    date: 1706321291210,
    type: 2,
    block: 6789,
    reward: 1.088,
    price: 2308.76,
    value: 10000,
    status: 2
  },
  {
    key: '3',
    date: 1706321291210,
    type: 1,
    block: 6789,
    reward: 1.088,
    price: 2308.76,
    value: 10000,
    status: 1
  },
]

// open mint tat
const openMint = ref<boolean>(false)
const openMintTAT = () => {
  openMint.value = !openMint.value
}

// mint 
const mintTAT = () => {
  // mintSuccess()
  mintFailed()
}

// mint success
const mintSuccess = () => {
  message.success('You have successfully mint TAT !');
}
// mint error
const mintFailed = () => {
  message.error('Failed minting TAT !');
}

// filter
const date = ref('0')
const type = ref('0')
const status = ref('0')
</script>

<style lang="less" scoped>
.mint-text {
  margin: 30px 0;
  font-size: 18px;
  font-weight: 400;
  color: #242526;

  b {
    margin: 0 5px;
    color: #1E1E1E;
    font-weight: 500;
  }

  span {
    font-size: 16px;
    color: #8C8C8C;
  }
}
</style>