<script setup>
import { useUserStore } from '@/store/user'
import { computed } from 'vue'
import config from "@/common/sys-config";

const userStore = useUserStore()
const props = defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})
const userInfo = computed(()=> userStore.state.userInfo)

</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="props.collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img alt="logo" v-if="config.logo" :src="config.logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">
          {{ userStore ? '欢迎您，' + userInfo.username : '请登录' }}
        </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img alt="logo" v-if="config.logo" :src="config.logo" class="sidebar-logo" />
        <h1 class="sidebar-title">
          {{ userInfo ? '欢迎您，' + userInfo.username : '请登录' }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  //background: #263446;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
      margin-left: 6px;
      border-radius: 5px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
