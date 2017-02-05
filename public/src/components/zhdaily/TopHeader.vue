<template>
    <header>
        <nav class="cov-nav">
            <div class="nav-tab">
                <router-link :to="{path: '/home'}">首页</router-link>
                <router-link :to="{path: '/theme'}">主题日报</router-link>
                <router-link :to="{path: '/about'}">关于</router-link>
            </div>
        </nav>
    </header>
</template>


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
    .nav-tab a{
        display: inline-block;
        height: 6rem;
        line-height: 6rem;
        text-align: center;
        min-width: 8rem;
        cursor: pointer;
        text-decoration: none;
        color: #fff;
    }
    .nav-tab a:visited{
        color: #607D8B;
    }
    .nav-tab a:hover {
        color: #039be5;
    }
    .nav-tab a.router-link-active {
        color: #039be5;
    }
</style>