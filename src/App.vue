<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Nav
  }
}
</script>

<style>

</style>
