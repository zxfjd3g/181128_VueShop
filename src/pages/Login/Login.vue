<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isShowSms}" @click="isShowSms=true">短信登录</a>
          <a href="javascript:;" :class="{on: !isShowSms}" @click="isShowSms=false">密码登录</a>
        </div>
      </div>

      <div class="login_content">
        <form>
          <div :class="{on: isShowSms}">
            <section class="login_message">
              <input type="text" maxlength="11" placeholder="手机号2222" v-model="phone"
                  name="phone" v-validate="'required|mobile'">
              <button :disabled="!isRightPhone || computeTime>0" class="get_verification"
                      :class="{right_phone_number: isRightPhone}" @click.prevent="sendCode">
                {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}
              </button>

              <span style="color: red">{{errors.first('phone')}}</span>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code"
                     name="code" v-validate="{required: true, regex: /^\d{6}$/}">
              <span style="color: red">{{errors.first('code')}}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isShowSms}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="用户名" v-model="name"
                       name='name' v-validate="'required'">
                <span style="color: red">{{errors.first('name')}}</span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwd? 'text' : 'password'" maxlength="8" placeholder="密码"
                       v-model="pwd" name="pwd" v-validate="{required: true}">

                <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd=!isShowPwd">
                  <div class="switch_circle" :class="{right: isShowPwd}"></div>
                  <span class="switch_text">
                    {{isShowPwd ? 'abc' : ''}}
                  </span>
                </div>
                <span style="color: red">{{errors.first('pwd')}}</span>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha"
                       name="captcha" v-validate="{required: true, regex: /^.{4}$/}">
                <img ref="captcha" class="get_verification" src="http://localhost:5000/captcha" alt="captcha" @click="updateCaptcha">
                <span style="color: red">{{errors.first('captcha')}}</span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
  import {
    reqCode,
    reqPwdLogin,
    reqSmsLogin
  } from '../../api'
  import {RECEIVE_USER} from '../../store/mutation-types'
  export default {

    data () {
      return {
        isShowSms: true, // 短信登陆, false: 密码登陆
        phone: '', // 手机号
        code: '', // 一次性短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '', // 一次性图片验证码
        computeTime: 0, // 倒计时剩余的时间
        isShowPwd: false, // 是否原样显示密码
      }
    },

    computed: {
      // 判断phone是否是正确的手机号格式: 使用正则
      isRightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods: {
      /*
      发送短信验证
       */
      async sendCode () {
        // alert('----')
        this.computeTime = 30
        // 启动循环定时器, 每隔1s, 将计时减1
        const intervalId = setInterval(() => {
          // 一旦变为了0, 停止计时
          if(this.computeTime===0) {
            clearInterval(intervalId)
          } else {
            this.computeTime--
          }

        }, 1000)

        // 请求发送验证码
        const result = await reqCode(this.phone)
        if(result.code===0) { // 成功
          alert('发送短信验证码成功')
        } else { //失败
          // 停止计时
          // clearInterval(this.intervalId)
          this.computeTime = 0
          alert('发送短信验证码失败')
        }
      },

      /*
      登陆
       */
      async login () {
        // 进行前台表单验证, 如果不通过, 提示令牌
        const {phone, code, name, pwd, captcha, isShowSms, isRightPhone} = this
        let result

        const validateNames = isShowSms ? ['phone', 'code'] : ['name', 'pwd', 'captcha']
        // 进行整体表单验证
        const success = await this.$validator.validateAll(validateNames)
        if(success) { // 验证成功
          if (isShowSms) { // 如果是短信登陆
            // 全部通过了, 发短信登陆的请求
            result = await reqSmsLogin({phone, code})

          } else { // 如果是密码登陆
            // 全部通过了, 密码信登陆的请求
            result = await reqPwdLogin({name, pwd, captcha})
            // 如果失败了, 更新图形验证码
            if(result.code!==0) {
              this.updateCaptcha()
              this.captcha = ''
            }
          }

          // 根据结果做相应处理
          if(result.code===0) { // 成功了
            const user = result.data
            // 保存user(vuex的state中)
            this.$store.commit(RECEIVE_USER, user) // 查找所有vuex模块中的mutation调用
            // 跳转到个人中心
            this.$router.replace('/profile')
          } else { // 失败了
            alert(result.msg)
          }
        } else { // 验证失败
          alert('验证失败')
        }
      },

      /*
      更新图片验证码
       */
      updateCaptcha () {
        // 一旦给<img>指定新的src属性, 浏览器就会自动重新请求并更新显示(携带一个时间戳参数)
        this.$refs.captcha.src = 'http://localhost:5000/captcha?time' + Date.now()
      }
    },

    /*
    在进行当前组件前调用
    在回调函数调用时, 组件对象还没有创建, this不是组件对象
     */
    beforeRouteEnter (to, from, next) {
      // next(callback): 回调函数在组件对象创建后调用callback
      next((comp) => {
        // 如果当前用户已经登陆, 自动跳转到个人中心
        if (comp.$store.state.user.user._id) {
           next('/profile')
        } else {
          // 否则放行
          next()
        }
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color: black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>