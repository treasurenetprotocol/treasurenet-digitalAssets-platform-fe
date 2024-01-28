<template>
  <main class="card account">
    <div class="header-title">
      <h2>Account Management</h2>
      <a href="javascript:;" class="n-btn" @click="openBindBox">
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

  <Modal v-model:open="openBind" title="Bind account" :footer="null" centered>
    <div class="bind-item">
      <div class="item">
        <img src="@/assets/imgs/eth-icon.png" alt="">
        <h4>Ethereum system</h4>
        <span>Verification required</span>
        <div class="btn">
          <a href="javascript:;" class="n-btn" @click="openBindInfoBox('eth')">
            <span>Bind</span>
          </a>
        </div>
      </div>

      <div class="item">
        <img src="@/assets/imgs/btc-icon.png" alt="">
        <h4>Ethereum system</h4>
        <span>Verification required</span>
        <div class="btn">
          <a href="javascript:;" class="n-btn" @click="openBindInfoBox('btc')">
            <span>Bind</span>
          </a>
        </div>
      </div>
    </div>
  </Modal>

  <Modal v-model:open="openBindInfo" title="Bind account" ok-text="To verify" @ok="toSubmitBindInfo" centered>
    <div class="bind-item info-box">
      <div class="item">
        <img src="@/assets/imgs/tn-icon.png" alt="">
        <h4>TN Account</h4>
        <span>0xF5ecac…E9D5</span>
      </div>
      <img src="@/assets/imgs/switch-icon.png" alt="" class="switch-icon">
      <div class="item">
        <img src="@/assets/imgs/eth-icon.png" alt="" v-if="bindType === 'eth'">
        <img src="@/assets/imgs/btc-icon.png" alt="" v-else>
        <h4>{{ bindType === 'eth' ? 'Ethereum' : 'Bitcoin' }}</h4>
        <span>&nbsp;</span>
      </div>
    </div>
    <p class="note">
      <span>Note:</span>
      <span>You need to transfer some Tokens to the designated account to prove the authenticity of your account, and all will be returned after passing the review!</span>
    </p>
    <div class="ipt">
      <p>
        <span>*</span>
        Add Account
      </p>
      <Input v-model:value="account" placeholder="Please enter your account" />
    </div>
    <div class="transfer">
      <div class="rule">
        Transfer:
        <b>0.00001</b>
        <span>{{ bindType === 'eth' ? 'ETH' : 'BTC' }}</span>
      </div>
      <div class="ads">
        To:
        <b>{{ bindType === 'eth' ? addressCut(ethVerifyAddr) : addressCut(btcVerifyAddr) }}</b>
        <img src="@/assets/imgs/copy-icon.png" alt="" @click="copyAddress(bindType === 'eth' ? ethVerifyAddr : btcVerifyAddr)">
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import copy from 'copy-to-clipboard'
import Tag from '@/components/TagComp.vue'
import { addressCut } from '@/libs/utils'
import { Table, Tooltip, Modal, Input, message } from 'ant-design-vue'

const ethVerifyAddr = '0x1111111254EEB25477B68fb85Ed929f73A960582'
const btcVerifyAddr = 'bc1qf3uwcxaz779nxedw0wry89v9cjh9w2xylnmqc3'

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

// open bind account(choose network)
const openBind = ref<boolean>(false)
const openBindBox = () => {
  openBind.value = !openBind.value
}

// open bind account
const account = ref('')
const bindType = ref('eth')
const openBindInfo = ref(true)
const openBindInfoBox = (type: string) => {
  openBindBox()
  bindType.value = type
  openBindInfo.value = !openBindInfo.value
}

// submit bind info
const toSubmitBindInfo = () => {
  const address = account.value
  // address verify
  if(!address) {
    message.error('Please enter your account')
    return
  }

  if(bindType.value === 'eth') {
    if(!address.startsWith('0x') || address.length !== 42) {
      message.error('Please enter the correct ETH address')
      return
    }
  }

  if(bindType.value === 'btc') {
    if(address.startsWith('1') || address.startsWith('3')) {
      if(address.length !== 34) {
        message.error('Please enter the correct BTC address')
        return
      }
    }else if (address.startsWith('bc1')) {
      if(address.length !== 42) {
        message.error('Please enter the correct BTC address')
        return
      }
    }else {
      message.error('Please enter the correct BTC address')
      return
    }
  }

  // todo: submit request
  message.success('Submitted successfully, pending verification !')
}

const copyAddress = (addr: string) => {
  copy(addr)
  message.success('Copy address success!')
}
</script>

<style lang="less" scoped>
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

.bind-item {
  display: flex;
  align-items: center;
  padding: 50px 65px 120px;
  justify-content: space-between;

  &.info-box {
    padding-bottom: 16px;
  }

  .item {
    min-width: 90px;
    padding: 20px 25px;
    border-radius: 4px;
    text-align: center;
    background: #FAFBFC;
    border: 1px solid #EDEEEF;

    img {
      width: 44px;
    }

    h4 {
      font-size: 13px;
      font-weight: 500;
      color: #242526;
      margin: 5px 0 8px 0;
    }

    >span {
      font-size: 11px;
      font-weight: 400;
      color: #8C8C8C;
      line-height: 1;
      vertical-align: top;
    }

    .btn {
      margin-top: 25px;
    }
  }

  .switch-icon {
    width: 16px;
    height: 15px;
  }
}

.note {
  margin: 0 0 24px;
  font-size: 16px;
  font-weight: 400;
  color: #8C8C8C;
  line-height: 28px;
  display: flex;
  justify-content: space-between;

  >span:first-child {
    padding-right: 5px;
  }
}

.ipt {
  margin-bottom: 24px;

  >p {
    font-size: 18px;
    font-weight: 400;
    color: #242526;
    margin: 0 0 5px;

    span {
      color: #F5222D;
    }
  }
}

.transfer {
  font-size: 18px;
  font-weight: 400;
  color: #242526;

  b {
    font-weight: 500;
    color: #1E1E1E;
    padding: 0 5px;
  }

  span {
    font-size: 16px;
    color: #8C8C8C;
  }

  .ads {
    margin: 24px 0;

    img {
      width: 14px;
      cursor: pointer;
    }
  }
}
</style>
