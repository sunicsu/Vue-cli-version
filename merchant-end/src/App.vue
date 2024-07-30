<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        ModifyOrder
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">

    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	#app {
    height: 100vh;
  }
</style>
