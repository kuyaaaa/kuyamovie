<template>
  <div v-loading.fullscreen.lock="loading">
    <ul style="margin-top: 10px">
      <li v-for="(movie,i) in movies" :key="i">
        <el-row>
          <!-- rank -->
          <el-col :span="2" :offset="2">
            <p class="rank">{{i+1}}</p>
            <!-- delta -->
            <p class="delta">
              <i v-if="movie.delta > 0"
                class="el-icon-arrow-up"
                style="color: red">
                {{movie.delta}}
              </i>
              <i v-if="movie.delta < 0"
                class="el-icon-arrow-down"
                style="color: green">
                {{movie.delta}}
              </i>
            </p>
          </el-col>
          <!-- 电影封面图片 -->
          <el-col :span="2">
            <router-link :to="'/movieinfo/' + movie.subject.id">
              <el-image
                style="width:70px; margin-right: 20px;"
                :src="movie.subject.images.small"
                :alt="movie.subject.title"
                fit="cover">
              </el-image>
            </router-link>
          </el-col>
          <!-- 电影信息 -->
          <el-col :span="18">
            <h1>{{movie.subject.title}}</h1>
            <span class="info">
              原名：{{movie.subject.original_title}}
              导演：{{movie.subject.directors[0].name}}<br>
              评分：{{movie.subject.rating.average}}
              首映日期：{{movie.subject.pubdates[0]}}
            </span>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      movies: [],
      loading: true
    }
  },
  methods: {
    getMovies () {
      this.$http.get('https://douban.uieee.com/v2/movie/weekly')
        .then((res) => {
          this.movies = res.data.subjects
          // console.log(this.movies)
          this.loading = false
        })
        .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getMovies()
  }
}
</script>

<style scoped>
  ul li{
    margin-bottom: 10px;
  }
  h1{
    font-size: 22px;
    margin: 10px 0;
  }
  .info{
    color: #999;
  }
  .rank{
    font-size: 32px;
    text-align: center;
    margin-top: 15px;
    position: relative;
  }
  .delta{
    text-align: center;
    font-weight: bold;
  }
</style>
