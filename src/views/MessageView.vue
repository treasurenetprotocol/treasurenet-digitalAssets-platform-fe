<template>
  <main class="card message">
    <div class="header-title">
      <h2>System messages</h2>
      <div class="opa">
        <Checkbox v-model:checked="isHide" @change="hideRead">Hide read</Checkbox>
        <span @click="readAll">
          <MailOutlined />
          Mark all as read
        </span>
      </div>
    </div>

    <Collapse v-model:activeKey="activeKey" :bordered="false" style="background: rgb(255, 255, 255)" accordion>
      <template #expandIcon="panel">
        <CaretRightOutlined :rotate="panel?.isActive ? 90 : 0" />
      </template>

      <Collapse.Panel v-for="m in msgList" :key="m.msgID" :header="m.title" :class="m.status === 0 ? 'read' : 'unread'">
        <div class="content">
          <p class="title">From: Treasurenet</p>
          <pre>{{ m.content }}</pre>
        </div>
        <template #extra>
          <span class="extra-text">{{ formatDate(m.timestamp) }}</span>
        </template>
      </Collapse.Panel>
    </Collapse>

    <div style="text-align: right;">
      <Pagination
        show-size-changer
        v-model:current="page"
        v-model:page-size="pageSize"
        :total="total"
        :show-total="(total, range) => `Total of ${total} messages`"
        @change="(page: number, pageSize: number) => getList(page, pageSize)"
      />
    </div>

    <div class="loading-box" v-show="listLoading">
      <Spin :indicator="indicator" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { h, ref, onMounted } from 'vue'
import { formatDate } from '@/libs/utils'
import { getMessageList, setMessageStatus } from '@/api'
import { Collapse, Pagination, Spin, Checkbox, message } from 'ant-design-vue'
import { CaretRightOutlined, LoadingOutlined, MailOutlined } from '@ant-design/icons-vue'

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '40px',
  },
  spin: true,
})

const activeKey = ref([])
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const listLoading = ref(false)
const msgList = ref<any[]>([])
const getList = async (page: number, pageSize: number, status?: string) => {
  listLoading.value = true
  const list = await getMessageList(page, pageSize, status)
  total.value = list.result.total
  msgList.value = list.result.list
  listLoading.value = false
}

const readAll = async () => {
  const ids = msgList.value.map((l) => l.msgID)
  const rqs: Promise<any>[] = []
  ids.forEach((id) => {
    rqs.push(setMessageStatus(id, '0'))
  })
  await Promise.all(rqs)
  message.success('message set successfully')
  await getList(page.value, pageSize.value)
}

const isHide = ref(false)
const hideRead = async () => {
  console.log(isHide.value)
  await getList(page.value, pageSize.value, isHide.value ? '1' : '0')
}

onMounted(async () => {
  await getList(page.value, pageSize.value)
})
</script>

<style lang="less" scoped>
.message {
  position: relative;
}

.opa {
  >span {
    color: #225BFC;
    cursor: pointer;
    margin-left: 40px;
    font-weight: 500;
    font-size: 16px;
  }

  >label {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0,0,0,0.65);
  }
}

.loading-box {
  top: 200px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
}

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

  pre {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  }
}
</style>