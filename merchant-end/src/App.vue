<template>
  <div id="app">
<!--    <keep-alive>-->
<!--      <router-view v-if="$route.meta.keepAlive" />-->
<!--    </keep-alive>-->
<!--      <router-view v-if="!$route.meta.keepAlive" />-->
      <router-view> </router-view>
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
