<template>
    <div class="list-container">
        <section class="zhi-list" v-for="section in storiesObj">
            <div class="list-date">{{section.date}}</div>
            <arctive class="list-item" v-for="storie in section.stories">
                <router-link :to="{ name: 'news', params: { id: storie.id }}">
                  <div class="item-preview" :style="{backgroundImage:'url('+ storie.images +')'}"></div>
                  <p class="item-title">{{storie.title}}</p>
                </router-link>
                
              </arctive>
            
        </section>
        <button class="more-btn" v-on:click="loadmore()">更多</button>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        date: '',
        dateCount: 0,
        dateAPIStr: '',
        storiesObj: []
      }
    },
    created: function () {
      this.fetchList()
    },
    methods: {
        loadmore: function () {
          this.dateCount ++
          this.fetchList()
        },
        padNumber: function (num) {
          if(num < 10){
            return '0' + num
          }else{
            return num
          }
        },
        getApi: function (n) {
            var mydate  = new Date()
            var befminutes = mydate.getTime() - 1000 * 60 * 60 * 24 * parseInt(this.dateCount)
            mydate.setTime(befminutes)
            var sYear = mydate.getFullYear()
            var sMon = this.padNumber(mydate.getMonth() + 1)
            var sDate = this.padNumber(mydate.getDate())
            return('' + sYear + sMon + sDate)
        },
        fetchList: function () {
          this.$http.get('http://news.at.zhihu.com/api/4/news/before/' + this.getApi(this.dateCount), {}, {
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            emulateJSON: true
          }).then(function (response) {
            this.storiesObj.push(response.data)
          },function (response) {
            console.log(response)
          })
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
    .list-item a{
      text-decoration: none;
      color: #000;
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
    .list-item {
	display:inline-block;
	position:relative;
	box-sizing:border-box;
	background-color:#fff;
	width:18.5rem;
	padding:14rem 1rem 1rem;
	margin:.5rem;
	text-align:left
}
.item-preview {
	position:absolute;
	height:14rem;
	width:100%;
	top:0;
	left:0;
	background-size:cover
}
.item-title {
	font-size:1.6rem;
	height:4rem;
	padding:.5rem;
	margin:0;
	line-height:1.6;
	overflow:hidden
}
.item-description {
	text-align:left;
	font-size:1rem;
	line-height:1.6
}
@media all and (max-width:768px) {
	.list-item {
		width:100%;
		padding:1rem 6rem 1rem .5rem;
		box-sizing:border-box;
		margin:.5rem 0
	}
	.item-preview {
		position:absolute;
		width:6rem;
		right:.5rem;
		top:.5rem;
		left:inherit;
		height:6rem
	}
}

</style>