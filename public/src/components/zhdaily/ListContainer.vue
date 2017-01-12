<template>
    <div class="list-container">
        <section class="zhi-list">
            <div class="list-date">{{date}}</div>
            <arctive class="list-item" v-for="storie in stories">
                <div class="item-preview" :style="{backgroundImage:'url('+ storie.images +')'}"></div>
                <p class="item-title">{{storie.title}}</p>
            </arctive>
        </section>
        <button class="more-btn" v-on:click="laodmore()">更多2</button>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        date: '',
        stories: '[]'
      }
    },
    created () {
        this.$http.get('http://news.at.zhihu.com/api/4/news/before/20170112', {}, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          emulateJSON: true
        }).then(function (response) {
          this.date = response.data.date
          this.stories = response.data.stories
        },function (response) {
          console.log(response)
        })
      },
      methods: {
        loadmore: function () {
          console.log(1)
        }
      }
    }
</script>

<style>
    .zhi-list {
        position: relative;
        padding: 0;
        padding-top: 5rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #ececec;
    }
    .list-date {
        position: absolute;
        font-size: 2rem;
        text-align: center;
        top: 2rem;
        left: 1rem;
        color: #b2bac2;
        font-weight: 500;
    }
    .list-item {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        background-color: #fff;
        width: 18.5rem;
        padding: 14rem 1rem 1rem;
        margin: .5rem;
        text-align: left;
    }
    .item-preview {
        position: absolute;
        height: 14rem;
        width: 100%;
        top: 0;
        left: 0;
        background-size: cover;
    }
    .item-title {
        font-size: 1.6rem;
        height: 4rem;
        padding: .5rem;
        margin: 0;
        line-height: 1.6;
        overflow: hidden;
    }
    .more-btn {
        font-size: 1.5rem;
        padding: 1rem 0;
        width: 100%;
        border: 0;
        color: #fff;
        background-color: #252e39;
        border: none;
        margin: 10px 0;
        border-radius: .5rem;
        outline: none;
        cursor: pointer;
    }
    .more-btn:hover {
        background-color: #455569;
    }
</style>