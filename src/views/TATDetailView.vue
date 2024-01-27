<template>
  <div class="pool">
    <img src="@/assets/imgs/tat-product-img.png" alt="" class="product-img">

    <h4>
      <img src="@/assets/imgs/assets-calc.png" alt="">
      <span>Cumulative Minted TAT</span>
    </h4>

    <h3>337,240.00325678</h3>

    <div class="mint-num">
      <span>
        Minted by BTC:
        <b>2,356.48947528</b>
        <span>TAT</span>
      </span>
      <span>
        Minted by ETH:
        <b>2,356.48947528</b>
        <span>TAT</span>
      </span>
    </div>
  </div>

  <main class="card tat">
    <div class="header-title">
      <h2>TAT Details</h2>
      <div class="choose">
        <div class="item">
          <span>Date:</span>
          <Select style="width: 105px" v-model:value="date">
            <Select.Option value="0">All</Select.Option>
            <Select.Option value="1">2023/3/30</Select.Option>
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
        <template v-else-if="column.key === 'event'">Minted by {{ eventMaps[record.event] }}</template>
        <template v-else-if="column.key === 'amount'">{{ numFormat(record.amount) }}</template>
      </template>
    </Table>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { realDate, numFormat } from '@/libs/utils'
import { Table, Select } from 'ant-design-vue'

const eventMaps: { [k: string]: string } = {
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

const data = [
  {
    key: '1',
    date: 1706321291210,
    event: 1,
    amount: 6789
  },
  {
    key: '2',
    date: 1706321291210,
    event: 2,
    amount: 6789
  },
  {
    key: '3',
    date: 1706321291210,
    event: 1,
    amount: 6789
  },
]

// filter
const date = ref('0')
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