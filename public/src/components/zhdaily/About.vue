<template>
    <div class="about-container">
        <div class="github-box">
            <p><span>Github:</span><a class="github-link" href="https://github.com/befriend1314/zhihudaily" target="_blank">vue-zhihudaily</a></p>
            <p>E-mail: 769970587@qq.com</p>
        </div>
    </div>
</template>

<style>
    .about-container {
        text-align: center
    }
    
    .github-box {
        position: relative;
        display: inline-block;
        background-color: #fff;
        height: 16rem;
        width: 30rem;
        border-top: 2px solid #d26911;
        padding: 2rem;
        box-sizing: border-box;
        text-align: left
    }
    
    .github-box a {
        text-decoration: blink
    }
    
    .github-link {
        font-size: 1.8rem;
        color: #4078c0
    }
    
    .github-description {
        margin: 1rem 0
    }
    
    .github-star {
        position: absolute;
        bottom: 2rem;
        text-align: center;
        right: 0;
        left: 0;
        font-size: 1.4rem
    }
</style>