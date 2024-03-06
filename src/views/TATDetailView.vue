<template>
  <div class="pool">
    <img src="@/assets/imgs/tat-product-img.png" alt="" class="product-img">

    <h4>
      <img src="@/assets/imgs/assets-calc.png" alt="">
      <span>Cumulative Minted TAT</span>
    </h4>

    <h3>{{ numFormat((calcData.calc / 1e18).toFixed(4)) }}</h3>

    <div class="mint-num">
      <span>
        Minted by BTC:
        <b>{{ numFormat((calcData.btc / 1e18).toFixed(4)) }}</b>
        <span>TAT</span>
      </span>
      <span>
        Minted by ETH:
        <b>{{ numFormat((calcData.eth / 1e18).toFixed(4)) }}</b>
        <span>TAT</span>
      </span>
    </div>
  </div>

  <main class="card tat">
    <div class="header-title">
      <h2>TAT Details</h2>
      <div class="choose">
        <div class="item">
          <span style="margin-right: 5px;">Date:</span>
          <RangePicker v-model:value="date" @change="dateChange" format="YYYY/MM/DD" />
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
        <template v-if="column.key === 'date'">{{ realDate(record.latest || record.timestamp) }}</template>
        <template v-else-if="column.key === 'event'">Minted by {{ eventMaps[record.type] }}</template>
        <template v-else-if="column.key === 'amount'">{{ numFormat((record.amount / 1e18).toFixed(4)) }}</template>
      </template>
    </Table>

    <div style="text-align: right;margin-top: 24px;">
      <Pagination
        show-size-changer
        v-model:current="page"
        v-model:page-size="pageSize"
        :total="total"
        :show-total="(total, range) => `Total of ${total} messages`"
        @change="(page: number, pageSize: number) => paginChange()"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs'
import { h, ref, onMounted } from 'vue'
import { getBlockList } from '@/api'
import { realDate, numFormat } from '@/libs/utils'
import { Table, Pagination, RangePicker } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
type RangeValue = [Dayjs, Dayjs]

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '40px',
  },
  spin: true,
})

const eventMaps: { [k: string]: string } = {
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
    title: 'Event',
    dataIndex: 'event',
    key: 'event',
  },
  {
    title: 'Amounts (TAT)',
    dataIndex: 'amount',
    key: 'amount',
  }
]

// filter
const date = ref<RangeValue>()
const dateArr = ref<string[]>([])
const dateChange = async (d: any, dstr: [string, string]) => {
  dateArr.value = dstr
  await getList('2', page.value, pageSize.value, +new Date(dstr[0]), +new Date(dstr[1]) + 86400000)
}

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const listLoading = ref(false)
const diaList = ref<any[]>([])
const calcData = ref<any>({ btc: 0, eth: 0, calc: 0 })
const getList = async (queryType: string, page: number, pageSize: number, dateFrom?: number, dateTo?: number) => {
  listLoading.value = true
  const ps: any = { queryType, page, pageSize }
  dateFrom && (ps.dateFrom = dateFrom)
  dateTo && (ps.dateTo = dateTo)
  const list = await getBlockList(ps)
  diaList.value = list.result.list
  total.value = list.result.total
  calcData.value.btc = list.result.minted.btcMintedAmount
  calcData.value.eth = list.result.minted.ethMintedAmount
  calcData.value.calc = list.result.minted.btcMintedAmount + list.result.minted.ethMintedAmount
  listLoading.value = false
}

const paginChange = async () => {
  await getList('2', page.value, pageSize.value, +new Date(dateArr.value[0]), +new Date(dateArr.value[1]) + 86400000)
}

onMounted(async () => {
  await getList('2', page.value, pageSize.value)
})
</script>

<style lang="less" scoped>
.pool {
  height: 200px;
  padding: 20px 24px;
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
  border: 1px solid #EAEEF4;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
  background: linear-gradient(180deg, #F4F7FF 0%, #F4F8FF 100%);

  .product-img {
    top: -58px;
    right: 94px;
    height: 398px;
    position: absolute;
  }

  h4,
  h3 {
    margin: 0;
  }

  h4 {
    >* {
      vertical-align: middle;
    }

    img {
      width: 36px;
      margin-right: 5px;
    }

    span {
      font-size: 20px;
      font-weight: 500;
      color: #1E1E1E;
    }
  }

  h3 {
    font-size: 32px;
    font-weight: 500;
    color: #1E1E1E;
    line-height: 41px;
    margin: 8px 0 40px;
  }

  .mint-num {
    font-size: 16px;
    font-weight: 400;
    color: #8C8C8C;

    span {
      &:first-child {
        margin-right: 48px;
      }

      b {
        color: #242526;
        margin-right: 5px;
      }
      span {
        font-size: 14px;
      }
    }
  }
}

.tat {
  min-height: calc(100vh - 312px);
}

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