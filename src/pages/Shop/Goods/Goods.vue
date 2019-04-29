<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: currentIndex===index}" @click="goCurrent(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <Food ref="food" :food="food"/> <!--一个组件标签就是一个组件对象: 组件标签对象就是组件对象-->
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'

  import Food from '../../../components/Food/Food.vue'

  export default {

    data() {
      return {
        scrollY: 0, // 右侧列表滑动的坐标  在右侧滑动过程中更新此值
        tops: [], // 右侧所有分类li的top值  在列表初始显示之后计算一次即可
        food: {}, // 需要显示的当前food
      }
    },

    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),

      // 当前分类的下标
      currentIndex() {
        const {scrollY, tops} = this
        /*
        findIndex(): 查找到第一个匹配元素的下标
          [0, 4, 7, 15, 19]
          7 8 14
          scrollY>=top && scrollY<nextTop
         */
        const index = tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1])

        if(index!=this.index && this.leftScroll) {
          // 保存最新的下标
          this.index = index
          // 一旦currentIndex发生改变, 将左侧列表滑动到对应的分类项(有可能达不到这个目标, 但至少是在可见范围内的)
          const li = this.$refs.leftUl.children[index]
          this.leftScroll.scrollToElement(li, 300)
        }


        return index
      }
    },

    mounted () {
      // 如果数据已经有了, 说明现在已经显示列表了, 创建Bscroll对象形成滑动
      if(this.goods.length>0) {
        this._initScroll()
        this._initTops()
      }
    },

    watch: {
      // 利用watch + nextTick 解决better-scroll不能滑动问题
      goods() { // goods数据有了
        this.$nextTick(() => { // goods列表显示了
          this._initScroll()
          this._initTops()

        })
      }
    },

    methods: {

      /*
      在列表第一次显示列表后, 统计所有右侧分类li的top并更新tops
       */
      _initTops () {
        const tops = []

        // 统计所有分类li的top
        let top = 0
        tops.push(top)
        const lis = this.$refs.rightUl.children
        Array.from(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })

        this.tops = tops
        console.log('tops', tops)
      },

      /*
      初始化滑动对象
      1). 触发滚动回调的时机
          实时: 高频触发
          非实时: 低频触发
      2). 触发滚动的方法
          触摸
          惯性
          编码
       */
      _initScroll () {
        // 创建左侧滚动对象
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true, // 开启分发自定义事件
        })
        // 创建右侧滚动对象
        this.rightScroll = new BScroll('.foods-wrapper', {
           probeType: 1, // 非实时  触摸
          // probeType: 2, // 实时 触摸
          // probeType: 3, // 实时 触摸 / 惯性 / 编码
          click: true, // 开启分发自定义事件
        })

        // 监视右侧滚动对象的scroll事件
        this.rightScroll.on('scroll', ({x, y}) => {
          console.log('scroll', x, y)
          this.scrollY = Math.abs(y)
        })

        // 监视右侧滚动对象的scrollEnd事件
        this.rightScroll.on('scrollEnd', ({x, y}) => {
          console.log('scrollEnd', x, y)
          this.scrollY = Math.abs(y)
        })
      },

      // 选择当前分类项, 右侧滑动到对应位置
      goCurrent (index) {
        // 得到目标位置的top
        const top = this.tops[index]

        // 立即更新当前分类项
        this.scrollY = top

        // 通过编码实现滑动
        this.rightScroll.scrollTo(0, -top, 300)
      },

      /*
      显示food详情界面
       */
      showFood (food) {

        // 更新food数据
        this.food = food
        // 显示food
        this.$refs.food.toggleShow()
      }
    },

    components: {
      Food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
