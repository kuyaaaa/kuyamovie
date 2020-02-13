<template>
  <div v-loading.fullscreen.lock="loading" class="main">
    <!-- 前三名 -->
    <el-row
      :gutter="40"
      style="max-width: 680px; position: relative; margin: auto"
      type="flex"
      justify="center"
      align="bottom">
      <el-col
        v-for="(ottMovie,i) in ottMovies"
        :key="i"
        :span="ottMovie.span">
        <div class="rank-movies">
          <!-- 电影封面 -->
          <router-link :to="'/movieinfo/' + ottMovie.id">
            <el-image
              class="img-align"
              :src="ottMovie.images.small"
              :alt="ottMovie.title"
              fit="scale-down">
            </el-image>
          </router-link>
          <!-- 文字 -->
          <span class="rank">No.{{ottMovie.rank}}</span>
          <h1>{{ottMovie.title}}</h1>
          <span class="director">{{ottMovie.directors[0].name}}</span>
        </div>
      </el-col>
    </el-row>
    <!-- 分割线 -->
    <el-divider v-if="!this.loading"></el-divider>
    <!-- 其他名次 -->
    <el-row :gutter="4" type="flex" justify="center" align="bottom">
      <el-col :span="2" v-for="(movie,i) in otherMovies" :key="i">
        <router-link :to="'/movieinfo/' + movie.id">
          <el-image
            :src="movie.images.small"
            :alt="movie.title"
            fit="scale-down">
          </el-image>
        </router-link>
        <div class="other-movies">
          <span class="rank">{{movie.rank}}</span>
          <h1>{{movie.title}}</h1>
          <span class="director">{{movie.directors[0].name}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      movies: [],
      loading: true,
      ottMovies: [], // 前三名
      otherMovies: [] // 剩余
    }
  },
  methods: {
    getMovies () {
      this.$http.get('https://douban.uieee.com/v2/movie/new_movies')
        .then((res) => {
          this.movies = res.data.subjects
          // console.log(this.movies)
          this.loading = false
        })
        .catch(err => console.log(err))
        .then(this.processMovies)
    },
    processMovies () {
      // 添加排名属性
      this.movies.forEach(function (value, index) { value.rank = index + 1 })
      // 前三名提取，重排序
      this.ottMovies = [this.movies[2], this.movies[0], this.movies[1]]
      this.ottMovies[0].span = 6
      this.ottMovies[1].span = 10
      this.ottMovies[2].span = 8
      // console.log(this.ottMovies)
      // 其余排名
      this.otherMovies = this.movies.slice(3, this.movies.length)
      // console.log(this.otherMovies)
    }
  },
  mounted () {
    this.getMovies()
  }
}
</script>

<style scoped>
  .main{
    width: 80%;
    position: relative;
    margin: 20px auto 50px auto;
  }
  ul li{
    margin-bottom: 10px;
  }
  h1{
    font-size: 22px;
    margin: 10px 0;
  }
  ul li span{
    color: #999;
  }
  .main .rank-movies,.main .other-movies{
    text-align: center;
  }
  .rank{
    font-size: 14px;
    color: #631f16;
    font-weight: bolder;
    border-bottom: 1px solid #631f16;
  }
  .director{
    font-size: 12px;
    color: #999;
  }
  .rank-movies h1{
    margin: 10px 0 0 0;
  }
  .el-divider{
    background-color: #444;
  }

  .other-movies{
    position: relative;
  }
  .other-movies h1{
    margin: 10px 0 0 0;
    font-size: 12px;
  }
</style>
