<template>
  <main class="card digital">
    <div class="header-title">
      <h2>Digital Amount</h2>
      <div class="choose">
        <div class="item">
          <span style="margin-right: 5px;">Date:</span>
          <RangePicker v-model:value="date" @change="dateChange" format="YYYY/MM/DD" />
        </div>
        <div class="item">
          <span>Type:</span>
          <Select style="width: 80px" v-model:value="type" @change="getList('1', type, status, page, pageSize)">
            <Select.Option value="9">ALL</Select.Option>
            <Select.Option value="1">BTC</Select.Option>
            <Select.Option value="0">ETH</Select.Option>
          </Select>
        </div>
        <div class="item">
          <span>Status:</span>
          <Select style="width: 120px" v-model:value="status" @change="getList('1', type, status, page, pageSize)">
            <Select.Option value="9">ALL</Select.Option>
            <Select.Option value="3">Minted</Select.Option>
            <Select.Option value="2">Verified</Select.Option>
          </Select>
        </div>
      </div>
    </div>

    <Table :columns="columns" :data-source="diaList" :pagination="false" :loading="{ indicator, spinning: listLoading }">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'price'">
          Price<span style="color:#8c8c8c">/$</span>
        </template>
        <template v-if="column.key === 'value'">
          Value<span style="color:#8c8c8c">/$</span>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'date'">{{ realDate(record.timestamp) }}</template>
        <template v-else-if="column.key === 'type'">{{ typeMaps[record.type] }}</template>
        <template v-else-if="column.key === 'reward'">
          {{ numFormat((record.blockReward / 1e18).toFixed(5)) }} <span style="color:#8c8c8c">{{ typeMaps[record.type] }}</span>
        </template>
        <template v-else-if="column.key === 'price'">{{ numFormat(record.price.toFixed(5)) }}</template>
        <template v-else-if="column.key === 'value'">{{ numFormat((record.amount / 1e18).toFixed(5)) }}</template>
        <template v-else-if="column.key === 'status'">
          <Tag bgColor="rgba(126, 211, 33, .2)" iconColor="#7ED321" v-if="record.status === 2">
            <template #icon>
              <img src="@/assets/imgs/verified-icon.png" alt="">
            </template>
            <span>Verified</span>
          </Tag>
          <Tag bgColor="rgba(28, 80, 222, .2)" iconColor="#1C50DE" v-else-if="record.status === 3">
            <template #icon>
              <img src="@/assets/imgs/reviewed-icon.png" alt="">
            </template>
            <span>Minted</span>
          </Tag>
        </template>
        <template v-else-if="column.key === 'operation'">
          <a href="javascript:;" style="font-weight:500" v-if="record.status === 2" @click="openMintTAT">Mint TAT</a>
        </template>
      </template>
    </Table>

    <div style="text-align: right;margin-top: 24px;" v-if="total > pageSize">
      <Pagination
        show-size-changer
        v-model:current="page"
        v-model:page-size="pageSize"
        :total="total"
        :show-total="(total, range) => `Total of ${total} messages`"
        @change="(page: number, pageSize: number) => getList('1', type, status, page, pageSize)"
      />
    </div>
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
import type { Dayjs } from 'dayjs'
import { h, ref, onMounted } from 'vue'
import { getBlockList } from '@/api'
import Tag from '@/components/TagComp.vue'
import { realDate, numFormat } from '@/libs/utils'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { Table, Modal, Select, RangePicker, Pagination, message } from 'ant-design-vue'
type RangeValue = [Dayjs, Dayjs]

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '40px',
  },
  spin: true,
})

const typeMaps: { [k: string]: string } = {
  0: 'ETH',
  1: 'BTC'
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
    dataIndex: 'blockNum',
    key: 'blockNum',
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
const date = ref<RangeValue>()
const type = ref('9')
const status = ref('9')
const dateChange = async (d: any, dstr: [string, string]) => {
  await getList('1', '9', '9', page.value, pageSize.value, +new Date(dstr[0]), +new Date(dstr[1]) + 43199000)
}

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const listLoading = ref(false)
const diaList = ref<any[]>([])
const getList = async (queryType: string, type: string, status: string, page: number, pageSize: number, dateFrom?: number, dateTo?: number) => {
  listLoading.value = true
  const ps: any = { queryType, type, status, page, pageSize }
  dateFrom && (ps.dateFrom = dateFrom)
  dateTo && (ps.dateTo = dateTo)
  const list = await getBlockList(ps)
  diaList.value = list.result.list
  total.value = list.result.total
  listLoading.value = false
}

onMounted(async () => {
  await getList('1', '9', '9', page.value, pageSize.value)
})
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