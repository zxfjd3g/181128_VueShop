# day01
## 1. 项目开发准备
    项目描述
    技术选型
    API接口

## 2. 开启项目开发
    使用脚手架创建项目
    安装所有依赖/指定依赖
    开发环境运行
    生产环境打包与发布

## 3. 搭建项目整体界面结构
    stylus的理解和使用
        结构化, 变量, 函数/minxin(混合)
    vue-router的理解和使用
        $router: 路由器对象, 包含一些操作路由的功能函数, 来实现编程式导航(跳转路由)
        $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params
    项目路由拆分
        确定路由组件显示的区域
        确定路由是几级路由
    底部导航组件: FooterGuide
    导航路由组件: MSite/Search/Order/Profile
    
## 4. 拆分组件
    1). 底部导航组件: FooterGuide
       编程式路由导航
       动态class

# day02
## 1. 拆分组件
    2). 导航路由组件: 
        MSite
        Search
        Order
        Profile
    3). 抽取头部组件: Header, 
        通过props向组件传递数据
        通过slot向组件传递标签
    4). 抽取商家列表组件 
        ShopList
    5). 登陆/注册的路由组件: Login
        FooterGuide的显示/隐藏: 通过路由的meta
    
## 2. 启动后台应用并测试
    运行后台项目(启动mongodb服务), 
    使用postman测试后台接口, 如果不一致, 修改接口文档
    
## 3. 异步显示数据
    1). 封装ajax: 
        promise+axios封装ajax请求的函数
        封装每个接口对应的请求函数(能根据接口文档定义)
        解决ajax的跨越域问题: 配置代理, 对代理的理解
    2). vuex编码
        创建所有相关的模块: store/index|state|mutations|actions|getters|mutation-types
        设计state: 从后台获取的数据
        实现actions: 
            定义异步action: async/await
            流程:　发ajax获取数据, commit给mutation
        实现mutations: 给状态赋值
        实现index: 创建store对象
        main.js: 配置store
    3). 组件异步显示数据
        在mounted()通过$store.dispatch('actionName')来异步获取后台数据到state中
        mapState(['xxx'])读取state中数据到组件中
        在模板中显示xxx的数据
     
## 4. 异步显示分类轮播
    通过vuex获取categorys数组(发请求, 读取)
    对数据进行整合一计算(维变为特定的二维数组)
    使用Swiper显示轮播, 如何在界面更新之后创建Swiper对象?
        1). 使用watch+$nextTick( () =>{界面更新之后立即执行})
        2). 使用回调+$nextTick()	
    使用svg图片实现loading的效果
    
    
# day03
## 1. Star组件
    创建组件, 设计组件的props
    使用组件标签, 并传入相应的标签属性
    完成组件编码: 使用计算属性
        
## 2. Login组件
### 1. 纯前台交互效果
    1). 切换登陆方式: isShowSms
    2). 手机号验证: right_phone_number + isRightPhone计算属性
    3). 倒计时效果: computeTime + setInterval()
    4). 密码显示/隐藏的切换: isShowPwd + transition
    5). 前台表单验证: 如果不通过, 提示
    
### 2. 前后台交互效果
    1). 一次性图形验证码: 
        通过<img src="url">请求后台获取验证码图片显示
        点击回调中更新img的src, 并携带时间戳参数, 更新验证码
    2). 发送短信验证码
        使用第三方短信平台接口
        请求发送验证码短信
        使用mint-ui实现对不同结果的不同提示效果
    3). 短信登陆/注册
    4). 密码登陆/注册
        发送ajax请求, 得到返回的结果
        根据结果的标识(code)来判断登陆请求是否成功
            1: 不成功, 显示提示
            0. 成功, 保存用户信息, 返回到个人中心
    5). 自动登陆
        session与cookie的理解
        后台将userid保存到session中
        App初始化过程中发请求获取user信息, 并保存到state
    6). 退出登陆
        请求退出登陆的接口, 重置state中的user
        
## 3. cookie与session
    cookie:
    	会话cookie: 保存在浏览器的运行时内存中, 关闭浏览器数据不存在了
    	持久化cookie: 保存在浏览器管理的文件中, 关闭浏览器数据还存在了
    
    sesion:
    	会话(浏览器端):　从浏览器打开到关闭整体过程都是一个会话
    	session对象(服务器端): 用来存储数据的容器, 
    			这个对象一旦产生, 服务器会自动向浏览返回一个对应的cookie, 用来保存session的ID: connect.sid=sessionID
    			在服务器通过req.session获取session对象
    				1. 从req中取出以connect.sid为key的cookie值
    				2. 如果有, 找到对应的session对象
    				3. 如果没有, 创建新的session对象
    	目标: 关闭浏览器, 再打开还是同一个会话?
    		让connect.sid的cookie设置成为一个持久化cookie
    
# day04

## 1. 使用vee-validate进行前台表单验证
    vee-validate使用.md
    
## 2. 搭建商家整体界面
    1). 拆分界面路由: 嵌套路由
    2). 路由的定义/配置|使用
    
## 3. 模拟(mock)数据/接口
    1). 前后台分离的理解
        区别前后台分离的应用和前后台不分离的应用
        区别一般的HTTP请求和ajax请求
    2). json数据设计的理解
        json数据的类型: 对象/数组/字符串/数值/布尔值
        json数据的组成: 结构(名称和类型)和值
    3). mockjs的理解和使用
        用来提供mock数据接口的库
        生成随机数据, 拦截ajax请求
        
## 4. vuex的多模块编码
    1). 设计多个模块
        msite
        user
        shop
    2). 将state拆分到对应的模块中, 确定整个state的结构
    3). 将mutation和action拆分到对应的模块中
    4). 在组件中通过mapState读取特定模块的状态数据
        ...mapState({user: state => state.user.user})
        
## 5. ShopHeader组件
    1). 异步显示数据效果的编码流程
        ajax
          ajax请求函数
          接口请求函数
        vuex
          modules/shop.js
        组件
          dispatch(): 异步获取后台数据到vuex的state
          mapState(): 从vuex的state中读取对应的数据
          模板中显示
    2). 初始显示异常
        情况: Cannot read property 'xxx' of undefined"
        原因: 初始值是空对象, 内部没有数据, 而模板中直接显示3层表达式
        解决: 使用v-if指令
    3). vue transition动画
        <transition name="xxx">
        xxx-enter-active / xxx-leave-active
          transition
        xxx-enter / xxx-leave-to
          隐藏时的样式
          
# day05
## 1. 基本滑动
    使用better-scroll
    new BScroll(wrapDiv, {})
    创建BScroll对象的时机
      watch + $nextTick()
    better-scroll禁用了原生的dom事件, 使用的是自定义事件
    
## 2. 滑动右侧列表, 左侧的当前分类会变化
    1). 设计一个计算属性: currentIndex代表当前分类的下标
    2). 相关数据
      滚动的y坐标: scrollY---> 给右侧列表绑定一个滚动的监听
      右侧分类<li>的top数组: tops-->列表第一次显示之后统计
    3). 计算的逻辑
       scrollY>=top && scrollY<nextTop
    4). 在列表显示之后确定tops
    5). 绑定scroll/scrollEnd监听, 在回调中设置scrollY值
    6). 关于滑动
        1). 触发滚动回调的时机
            实时: 高频触发
            非实时: 低频触发
        2). 触发滚动的方法
            触摸
            惯性
            编码
            
## 3). 点击左侧分类项, 右侧列表滑动到对应位置
    1). 绑定点击监听
    2). 通过rightScroll滚动到对应的位置: scroll.scrollTo(0, -tops[index])
    3). 立即更新scrollY

## 4. 如何保证当前分类项总是可见?
    一旦当前分类变化了, 让左侧列表滑动当前分类处
    如何判断变化了?
    scroll.scrollToElement(li)
    
# day06
## 1. Food组件
    1). 父组件调用子组件的方法: this.$refs.child.method()
    
## 2. CartControl组件
    1). 给food设计count属性, 并由actions提供更新的方法
    2). 问题: 更新状态数据, 对应的界面不变化
      原因: 给一个已有绑定的对象直接添加一个新的属性, 这个属性没有数据绑定
      解决: 
        Vue.set(obj, 'xxx', value)才有数据绑定
        this.$set(obj, 'xxx', value)才有数据绑定
    3). vue transition
    
## 3. ShopCart组件
    1). 将购物项列表数据定义到vuex的state中: cartFoods
    2). 在vuex的getters中定义: totalCount, totalPrice
    3). 解决几个功能性bug
        a. 删除所有购物项, 购物车列表还打开着
        b. 添加一个购物项, 购物车列表自动打开
        c. 购物车列表不能滑动
        d. 购物车列表中点一次添加, 会增加多项
        e. 原本可以滑动的列表, 关闭再打开后不能再滑动了

## 4. ShopRatings组件和RatingsFilter组件
    1). 使用计算属性对列表进行过滤显示
    2). vue组件间通信
        子向父: 函数props, vue自定义事件
        任意组件间: 基于vue自定义事件的bus/pubsub
    3). 自定义过滤器计算逻辑: 日期时间的格式化
    
# day07
## 1. ShopInfo组件
    1). 通过JS动态修改元素的样式宽度
    2). 解决在当前路由路径上刷新的异常问题
        在mounted()中, 判断只有当info中有数据才创建BScroll的实例
        在info的watch中, 在$nextTick()回调中创建BScroll对象
        
## 2. 优化
    1). 缓存路由组件: <keep-alive>
    2). 路由组件懒加载: () => import('路由组件'): 对路由组件进行单独打包, 只有当请求当前组件路径时才会从后台加载
    3). 在线图片懒加载: vue-lazyload
    4). 使用npm run build --report来查看打包文件组成, 优化第三方包使用, 如: moment-->date-fns
    
## 3. 打包项目运行
    1). 生成打包文件
        与后台应用同域运行:  不再存在ajax跨域问题
        与后台应用跨域运行: 由后台工程师配置代理服务器
    2). 如果路由的模式使用的history, 刷新路径时会出现404的bug
        原因: 项目根路径后的path路径会被当作后台路由路径, 会去请求对应的后台路由, 但后台没有
        解决: 使用自定义中间件去读取返回index页面展现
        
## 4. 路由导航守卫
    1). 是什么?
      vue-router提供的下面2个方面的功能
        a. 监视路由跳转
        b. 控制路由跳转
    2). 应用
      在跳转到界面前, 进行用户权限检查限制(如是否已登陆)
      在界面离开前, 做收尾工作
    3). 分类
        1). 全局守卫: 针对任意路由跳转
            a. 全局前置守卫
            b. 全局后置守卫
        2). 组件守卫: 只针对当前组件的路由跳转
            a. 进入
            b. 更新
            c. 离开
    4). next函数的使用
        next(): 放行
        next(false)/不执行: 中断路由跳转
        next(path): 强制跳转到指定的另一个路由
        next((component) => {}): 指定组件对象创建后调用回调函数传入组件对象
        
## 5. vue项目中几个典型的问题
    1). 创建Swiper/BScroll对象后, 轮播/滑动没有效果?
       原因: 创建对象太早, 得在数据显示后创建
       解决: watch + $nextTick()
       
    2). 初始显示异常
        情况1: Cannot read property 'xxx' of undefined"
        原因: 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
        解决: 使用v-if指令
        
        情况2: Cannot read property 'avatar' of null"
        原因: 初始值是null, 而模块中直接显示2层表达式
        解决: 初始值为{}
        
    3). 问题: 更新状态数据, 对应的界面不变化
        原因: 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
        解决: 
            Vue.set(obj, 'xxx', value)才有数据绑定
            this.$set(obj, 'xxx', value)才有数据绑定
            
    4). 问题: 点击添加购物项, 会1次添加多个
        原因: 创建了多个BScroll对象来管理同一个DOM元素
        解决: 只创建一个BScroll对象 
        扩展: 单例对象: 
            创建前, 先判断是否已经存在, 只有不存在才创建
            创建后, 保存创建的对象