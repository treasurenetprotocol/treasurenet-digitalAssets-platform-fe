<template>
  <main class="card account">
    <div class="header-title">
      <h2>Account Management</h2>
      <a href="javascript:;" class="n-btn" @click="openBindBox">
        <img src="@/assets/imgs/userbind-icon.png" alt="">
        <span>Bind account</span>
      </a>
    </div>

    <Table :columns="columns" :data-source="accList" :pagination="false" :loading="{ indicator, spinning: listLoading }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'account'">
          <Tooltip>
            <template #title>{{ record.account }}</template>
            {{ addressCut(record.account, 12) }}
          </Tooltip>
        </template>
        <template v-else-if="column.key === 'type'">
          {{ accountTypeMaps[record.type] }}
        </template>
        <template v-else-if="column.key === 'network'">
          {{ networkMaps[record.type] }}
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag bgColor="rgba(240, 66, 108, .15)" iconColor="#F0426C" v-if="record.status === 0 || record.status === 1">
            <template #icon>
              <img src="@/assets/imgs/not-icon.png" alt="">
            </template>
            <span>Not transferred</span>
          </Tag>
          <Tag bgColor="rgba(255, 138, 27, .2)" iconColor="#FF8A1B" v-if="record.status === 2 || record.status === 3 || record.status === 4">
            <template #icon>
              <img src="@/assets/imgs/inpreview-icon.png" alt="">
            </template>
            <span>In review</span>
          </Tag>
          <Tag bgColor="rgba(28, 80, 222, .2)" iconColor="#1C50DE" v-else-if="record.status === 5">
            <template #icon>
              <img src="@/assets/imgs/reviewed-icon.png" alt="">
            </template>
            <span>Bound</span>
          </Tag>
          <Tag bgColor="rgba(116, 117, 119, .2)" iconColor="#747577" v-else-if="record.status === 6 || record.status === 7">
            <template #icon>
              <img src="@/assets/imgs/failed-icon.png" alt="">
            </template>
            <span>Failed</span>
          </Tag>
        </template>
        <template v-else-if="column.key === 'operation'">
          <a href="javascript:;" style="font-weight:500" v-if="record.status === 0 || record.status === 1" @click="transferOpen(record)">Transfer</a>
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
        @change="(page: number, pageSize: number) => getList(page, pageSize)"
      />
    </div>
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

  <Modal v-model:open="openBindInfo" title="Bind account" :maskClosable="false" centered>
    <template #footer>
      <Button @click="openBindInfo = false; transferId = ''">Cancel</Button>
      <Button type="primary" @click="toSubmitBindInfo" :loading="verifyLoading" v-if="!transferId">To verify</Button>
      <Button type="primary" @click="setStatus()" :loading="statusLoading" v-else>To verify</Button>
    </template>

    <div class="bind-item info-box">
      <div class="item">
        <img src="@/assets/imgs/tn-icon.png" alt="">
        <h4>TN Account</h4>
        <span>{{ addressCut(tnAccount) }}</span>
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
      <Input v-model:value="account" :disabled="!!transferId" placeholder="Please enter your account" />
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
import Web3 from 'web3'
import { h, ref, onMounted } from 'vue'
import copy from 'copy-to-clipboard'
import Tag from '@/components/TagComp.vue'
import { addressCut } from '@/libs/utils'
import { accountTypeMaps, networkMaps } from '@/enums'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { getAccountList, getContract, addAccount, changeAccount } from '@/api'
import { Table, Tooltip, Modal, Input, Button, Pagination, message } from 'ant-design-vue'

const web3: Web3 = new Web3((window as any).ethereum)
const tnAccount = (await web3.eth.getAccounts())[0]

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '40px',
  },
  spin: true,
})

const ethVerifyAddr = '0xc508bfC41806b79cFdf8943Fb7F35885541FA808'
const btcVerifyAddr = 'bc1p3nd562xtem0vrzu7qltljv0qmstqsx2r2yzektl834jvvtg5cvfq89g4wp'

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
  },
  {
    title: 'Operation',
    key: 'operation',
    dataIndex: 'operation',
  }
]

// open bind account(choose network)
const openBind = ref<boolean>(false)
const openBindBox = () => {
  openBind.value = !openBind.value
}

// open bind account
const account = ref('')
const bindType = ref('eth')
const openBindInfo = ref(false)
const openBindInfoBox = (type: string) => {
  openBindBox()
  account.value = ''
  bindType.value = type
  openBindInfo.value = !openBindInfo.value
}

// transfer open
const transferId = ref('')
const transferOpen = async (record: any) => {
  openBindInfo.value = true
  account.value = record.account
  transferId.value = record.uniqueId
}

// set status
const statusLoading = ref(false)
const setStatus = async (id?: string) => {
  statusLoading.value = true
  const res = await changeAccount(id || transferId.value)
  if(res.code === '0') {
    transferId.value = ''
    openBindInfo.value = false
    message.success('Submitted successfully, pending verification !')
  }else {
    message.error(res.error)
  }
  statusLoading.value = false
}

// submit bind info
const verifyLoading = ref(false)
const toSubmitBindInfo = async () => {
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
    }else if (address.startsWith('bc1q')) {
      if(address.length !== 42) {
        message.error('Please enter the correct BTC address')
        return
      }
    } else if (address.startsWith('bc1p')) {
      if (address.length !== 62) {
        message.error('Please enter the correct BTC address')
        return
      }
    } else {
      message.error('Please enter the correct BTC address')
      return
    }
  }

  transferId.value = ''
  verifyLoading.value = true

  // save account
  const addRes = await addAccount({ type: bindType.value === 'eth' ? '0' : '1', account: address })
  if(addRes.code === '0') {
    // contract addProducer
    // get contract
    const contractRes = await getContract(bindType.value === 'eth' ? 'EthProducer' : 'BtcProducer')
    if(contractRes.code === '0') {
      const { abi, address: cAddress } = contractRes.result
      const contract = new web3.eth.Contract(abi, cAddress)

      try {
        const { uniqueId } = addRes.result
        console.log(uniqueId, ['ethtest2', tnAccount, 0, 0, address])
        await contract.methods.addProducer(uniqueId, ['ethtest2', tnAccount, 0, 0, address]).call()

        // reconfirm
        Modal.confirm({
          closable: true,
          centered: true,
          title: 'Confirm',
          okText: 'Yes',
          cancelText: 'Not yet',
          content: 'You have transferred the token to the designated account.',
          async onOk() {
            await setStatus(uniqueId)
            // message.success('Submitted successfully, pending verification !')
            await getList(page.value, pageSize.value)
            openBindInfo.value = false
          },
          async onCancel() {
            message.success('Please operate in time, otherwise the binding will not be successful.')
            await getList(page.value, pageSize.value)
            openBindInfo.value = false
          }
        })
      }catch(err: any) {
        message.error(err.message)
      }
    }else {
      message.error(contractRes.error)
    }
  }else {
    message.error(addRes.error)
  }
  verifyLoading.value = false
}

const copyAddress = (addr: string) => {
  copy(addr)
  message.success('Copy address success!')
}

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const listLoading = ref(false)
const accList = ref<any[]>([])
const getList = async (page: number, pageSize: number) => {
  listLoading.value = true
  const list = await getAccountList(page, pageSize)
  total.value = list.result.total
  accList.value = list.result.list
  listLoading.value = false
}

onMounted(async () => {
  await getList(page.value, pageSize.value)
})
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
