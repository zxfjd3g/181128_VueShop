<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在获取中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>

      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysList" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>
<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'

  import ShopList from '../../components/ShopList/ShopList.vue'

  export default {
    mounted() {

      // 获取商家列表和分类列表
      this.$store.dispatch('getShops')
      this.$store.dispatch('getCategorys')
      /*  不太好
      setTimeout(() => {
        // 创建时机: 在数据页面显示之后创建
        new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      }, 1000)*/
    },

    computed: {
      ...mapState(['address', 'categorys']),

      /*
      根据categorys生成二维数组
      小数组最大长度是8
       */
      categorysList() {
        const bigArr = []
        let smallArr = []
        // 遍历一维数组
        this.categorys.forEach(c => {

          // 将小数组保存到大数组(只需要添加1次)
          if (smallArr.length === 0) {
            bigArr.push(smallArr)
          }

          // 将分类对象保存到小数组
          smallArr.push(c)

          // 如果当前小数组已满, 创建一个新的小数组(用来保存后面分类对象)
          if (smallArr.length === 8) {
            smallArr = []
          }

        })


        return bigArr
      }
    },

    /*
    解决swiper对象创建后轮播有问题?
    原因: 创建swiper太早(应该在列表数据显示之后)
    解决:
        watch: 列表状态数据更新了(有数据)
        $nextTick: 列表界面更新显示了
    */
    watch: {
      // 状态数据变化: 立即同步执行监视的回调, 异步更新界面
      categorys(value) { //categorys变为有数据的数组

        /*
        将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
        $nextTick(): 在状态数据更新之后立即执行(界面还没有更新)
        回调函数: 由这次数据更新导致界面更新完成后执行
         */
        this.$nextTick(() => {
          // 创建时机: 在数据页面显示之后创建
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })

      }
    },

    components: {
      ShopList
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .msite //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>