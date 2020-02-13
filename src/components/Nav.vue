<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#631f16"
    text-color="#498eaf"
    active-text-color="#e5bb4b"
    router>
      <el-menu-item index="/" style="margin-left: 50px">KUYA movie 🎬</el-menu-item>
      <el-menu-item index="/best">口碑榜 🏆</el-menu-item>
      <el-menu-item index="/newest">新片榜 🏆</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
