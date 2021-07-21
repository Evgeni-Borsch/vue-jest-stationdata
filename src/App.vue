<template>
  <div id="app">
    <station></station>
  </div>
</template>

<script>
import station from '@/components/station.vue'

export default {
  name: 'App',
  components: {
    station
  }
}
</script>

<style>
.container {
  display: block;
  margin: 0 auto;
}

</style>
