<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/imgs/logo.png" alt="">
    </div>
    <div class="opera">
      <a href="javascript:;" @click="router.push('/manage/message')" style="position: relative;">
        <img src="@/assets/imgs/tips-none.png" alt="">
        <strong class="dot" v-if="unreadMessageTotal > 0">{{ unreadMessageTotal > 99 ? '99+' : unreadMessageTotal }}</strong>
      </a>
      <span>|</span>
      <a href="javascript:;">
        <img src="@/assets/imgs/wallet-icon.png" alt="" class="t-i">
        <span class="t-t">{{ addressCut(userInfo.tnEthAccount) }}</span>
      </a>
      <span>|</span>
      <a href="javascript:;" @click="logout">
        <img src="@/assets/imgs/logout.png" alt="">
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EventBus from '@/libs/eventbus'
import { addressCut } from '@/libs/utils'
import { message } from 'ant-design-vue'
import { getUserInfo, getMessageList } from '@/api'

const router = useRouter()

const logout = () => {
  router.push({ path: '/' })
  localStorage.removeItem('tn_jwt')
}

const userInfo = ref<any>({})
const unreadMessageTotal = ref(0)
onMounted(async () => {
  const user = await getUserInfo()
  if(user.code === '-5') {
    message.error(user.error)
    logout()
  }else {
    userInfo.value = user.result
  }

  // get messages total
  const mRes = await getMessageList(1, 1, '1')
  if(mRes.code === '0') unreadMessageTotal.value = mRes.result.total

  EventBus.on('onMessageRead', async v => {
    if(v === 'yes') {
      const mRes = await getMessageList(1, 1, '1')
      if (mRes.code === '0') unreadMessageTotal.value = mRes.result.total
    }
  })
})
</script>

<style lang="less" scoped>
.header {
  height: 48px;
  display: flex;
  z-index: 1;
  position: relative;
  align-items: center;
  justify-content: space-between;
  background-color: #252A3D;

  .logo {
    color: #CED0D9;
    margin-left: 12px;

    img {
      height: 24px;
    }
  }

  .opera {
    color: #CED0D9;
    padding-right: 24px;

    a {
      color: #CED0D9;
      text-decoration: none;

      .t-i {
        top: -2px;
        position: relative;
        margin-right: 5px;
      }
      .t-t {
        padding: 0;
      }

      img {
        width: 16px;
        vertical-align: bottom;
      }
    }

    span {
      padding: 0 15px;
    }

    .dot {
      top: -8px;
      right: -10px;
      color: #fff;
      padding: 4px 6px;
      font-size: 12px;
      font-weight: normal;
      position: absolute;
      border-radius: 10px;
      background-color: red;
      transform: scale(.6);
    }
  }
}
</style>