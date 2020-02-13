<template>
  <div class="container">
    <h1>Kuya电影 🎬</h1>
    <el-divider></el-divider>
    <p>本项目由 vue + element-UI + axios + vue-router 完成，数据获取来自“豆瓣电影”，以上所有数据均为“豆瓣电影”提供</p>
    <p>数据通过GitHub所提供的代理API借口获取: <a href="https://github.com/zce/douban-api-docs/blob/master/docs/movie.md" target="_blank">GitHub地址</a></p>
    <el-divider></el-divider>
    <p>联系我：</p>
    <p><i class="el-icon-message"> qq1034816916@163.com</i></p>
    <p>🐧 QQ: 1034816916</p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .container{
    position: relative;
    margin: 100px 150px;
  }
  h1{
    font-size: 38px;
    font-weight: bolder;
  }
  .el-divider{
    background-color: #888;
  }
  p{
    margin: 10px 0;
  }
</style>
