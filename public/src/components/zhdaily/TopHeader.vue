<template>
    <header>
        <nav class="cov-nav">
            <div class="nav-tab" v-for="item in navTba">{{item}}</div>
        </nav>
    </header>
</template>

<script>
  export default {
    data () {
      return {
        navTba: ['首页', '主题日报', '关于']
      }
    }
  }
</script>

<style scoped>
    .cov-nav {
        position: fixed;
        height: 6rem;
        width: 100%;
        background-color: #252e39;
        top: 0;
        left: 0;
        z-index: 2;
        font-size: 1.5rem;
        color: #fff;
    }
    .nav-tab {
        display: inline-block;
        height: 6rem;
        line-height: 6rem;
        text-align: center;
        min-width: 8rem;
        cursor: pointer;
    }
</style>