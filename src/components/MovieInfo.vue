<template>
  <div class="container" v-loading.fullscreen.lock="loading">
    <!-- 电影封面与信息 -->
    <el-row v-if="!this.loading" type="flex" justify="center" align="middle">
      <!-- 封面 -->
      <el-col :span="12" type="flex" align="middle">
        <el-image
          :src="this.mainImageUrl"
          fit="scale-down">
        </el-image>
      </el-col>
      <!-- 信息 -->
      <el-col :span="12">
        <h1>{{movieInfo.title}}</h1>
        <p class="title2">
          原名：{{movieInfo.original_title}}<br>
          又名：{{cutData(movieInfo.aka)}}
        </p>
        <p>导演：{{cutData(getPersons(movieInfo.directors))}}</p>
        <p>主演：{{cutData(getPersons(movieInfo.casts))}}</p>
        <p>编剧：{{cutData(getPersons(movieInfo.writers)) || 暂无}}</p>
        <p>评分：
          <el-rate
            style="display: inline"
            :max="10"
            :value="rating"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </p>
        <p>大陆上映日期：{{movieInfo.mainland_pubdate || '未上映'}}</p>
        <p>影片类型：{{cutData(movieInfo.genres)}}</p>
        <p>制片国家/地区：{{cutData(movieInfo.countries)}}</p>
        <p>简介：</p>
        <p class="summary">{{movieInfo.summary}}</p>
      </el-col>
    </el-row>
    <!-- 分割线 -->
    <el-divider v-if="!this.loading">以下影评均为相应影片的豆瓣用户热评</el-divider>
    <!-- 影评 -->
      <ul>
        <li v-for="(review,i) in movieInfo.popular_comments" :key="i">
          <!-- 作者相关 -->
          <div class="author">
            <!-- 头像 -->
            <el-avatar
              shape="square"
              :src="review.author.avatar">
            </el-avatar>
            <span>{{review.author.name}} </span>
            <span class="smallText" style="margin-left: auto">发布日期：{{review.created_at}}</span>
            <span class="smallText">评分：⭐{{review.rating.value}}</span>
            <span class="smallText">👍 {{review.useful_count}}</span>
          </div>
          <!-- 评论内容 -->
          <p>{{review.content}}</p>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      movieInfo: [],
      mainImageUrl: '',
      loading: true,
      rating: 0
    }
  },
  methods: {
    // 数组转为字符串，“/” 隔开
    cutData: arr => {
      if (arr) {
        if (arr.length > 1) {
          return arr.join(' / ')
        }
        return arr[0]
      }
    },
    // 将数组中名字提取出来
    getPersons: arr => {
      if (arr) {
        let names = []
        arr.forEach(val => {
          names.push(val.name)
        })
        return names
      }
    }
  },
  mounted () {
    // 获取id
    this.id = this.$route.params.id

    this.$http.get(`https://douban.uieee.com/v2/movie/subject/${this.id}`)
      .then(res => {
        this.movieInfo = res.data
        // console.log(this.movieInfo)
        // 重置是否加载
        this.loading = false
        // 获取电影图片
        this.mainImageUrl = this.movieInfo.images.large
        // 获取评分
        this.rating = this.movieInfo.rating.average
      })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>
  .container{
    width: 80%;
    margin: 20px auto;
    position: relative;
  }
  .container{
    font-size: 16px;
  }
  .horizontal-center{
    position: absolute;
    margin: auto;
  }
  p{
    margin-bottom: 3px;
  }
  h1{
    font-size: 38px;
    font-weight: bolder;
  }
  .title2{
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
  }
  .summary{
    font-size: 14px;
    color: #666;
    text-indent: 2em;
  }
  .el-divider{
    background-color: #444;
  }
  .el-divider__text{
    background-color: #e4dace;
  }
  /* 影评 */
  ul{
    padding: 0 20px;
  }
  ul li{
    margin-bottom: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid #631f16;
  }
  .author{
    margin-bottom: 10px;
    font-size: 18px;
    color: #666;
    display: flex;
    align-items: flex-end;
  }
  .smallText{
    font-size: 14px;
  }
  ul li span{
    margin-right: 10px;
  }
  ul li p{
    font-size: 16px;
    text-indent: 2em;
  }
</style>
