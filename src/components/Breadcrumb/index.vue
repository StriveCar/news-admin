<script setup>
import { ref, watch,nextTick, reactive, computed } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import pathToRegexp from 'path-to-regexp'

const router = useRouter()
const route = useRoute()

const levelList = computed(()=>{
  let matched = route.matched.filter((item) => item.meta && item.meta.title)

  const first = matched[0]

  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
  }

  return matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
})
const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title)

  const first = matched[0]

  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
  }

  levelList = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
  console.log(levelList[0].meta.title);
}

const isDashboard = (route) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const pathCompile = (path) => {
  const { params } = route
  var toPath = pathToRegexp.compile(path)
  return toPath(params)
}

const handleLink = (item) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}

// watch(route, () => {
//   getBreadcrumb()
// })
</script>

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path" :to="{ path: item?.path }">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
