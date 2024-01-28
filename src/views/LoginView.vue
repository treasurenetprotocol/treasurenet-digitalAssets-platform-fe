<template>
  <main class="login">
    <div class="login-box">
      <div class="logo">
        <img src="@/assets/imgs/login-logo.png" alt="">
      </div>
      <div class="box">
        <template v-if="loginStatus === 'unlogin'">
          <a href="javascript:;" @click="connect">
            <span>Connect Wallet</span>
            <img src="@/assets/imgs/metamask.png" alt="">
          </a>
          <p>After logging in with an unregistered account, it will be automatically registered.</p>
        </template>

        <template v-if="loginStatus === 'loading'">
          <div class="has-status">
            <Spin :indicator="indicator" />
            <h6>Waiting to connect</h6>
            <p>Confirm this connection in your wallet</p>
          </div>
        </template>

        <template v-if="loginStatus === 'error'">
          <div class="has-status">
            <img src="@/assets/imgs/login-error.png" alt="">
            <h6>Error connect !</h6>
            <p>The connection attempt failed. Please click tryagain and follow the steps to connect in youwalle</p>
            <a href="javascript:;" class="rewallet" @click="connect">
              <img src="@/assets/imgs/rewallet.png" alt="">
              <span>Reselect wallet</span>
            </a>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { CONNECT_WALLET } from '@/libs/web3'
import { Spin } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '80px',
  },
  spin: true,
})

const loginStatus = ref('unlogin')
const connect = async () => {
  loginStatus.value = 'loading'
  const res = await CONNECT_WALLET()

  if(res?.errmsg) {
    loginStatus.value = 'error'
  }else {
    // login success
    console.log(res)
    // todo: request sign data/sign/request login/storage auth token
    localStorage.setItem('logined', 'yes')
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(@/assets/imgs/login-bg.png) no-repeat center/cover;

  .login-box {
    width: 486px;
    height: 476px;
    background: #FFFFFF;
    box-shadow: 0px 20px 40px 0px rgba(31, 28, 44, 0.1);

    .logo {
      border-bottom: 1px dashed #999;

      img {
        width: 100%;
      }
    }

    .box {
      padding: 62px 32px 24px;
      background-color: #F7F8FA;

      >a {
        height: 56px;
        display: flex;
        color: #fff;
        font-weight: 500;
        text-align: center;
        border-radius: 12px;
        text-decoration: none;
        justify-content: center;
        align-items: center;
        background: linear-gradient(90deg, #0E3491 0%, #225BFC 100%);

        img {
          width: 26px;
          margin-left: 11px;
        }
      }

      p {
        margin-top: 64px;
        font-size: 16px;
        font-weight: 400;
        color: #8C8C8C;
        line-height: 24px;
        padding: 0 12px;
        font-family: PlusJakartaDisplay, PlusJakartaDisplay;
      }

      .has-status {
        text-align: center;

        img {
          width: 92px;
        }

        h6 {
          font-size: 20px;
          font-weight: 500;
          color: #242526;
          margin-bottom: -60px;
        }

        .rewallet {
          font-size: 16px;
          font-weight: 500;
          color: #225BFC;
          margin-top: 48px;
          text-decoration: none;

          >* {
            vertical-align: middle;
          }

          img {
            width: 16px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>