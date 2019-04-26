<template>
  <div>
    <router-view/>
    <FooterGuide v-show="$route.meta.isShowFooter"/>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  // import FooterGuide from '@/components/FooterGuide/FooterGuide'


  export default {

    async mounted () {
      this.$store.dispatch('getAddress')
      this.$store.dispatch('getUser')
    },

    components: {
      FooterGuide
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>