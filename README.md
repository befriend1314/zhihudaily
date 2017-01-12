# 仿知乎日报 vue 单页应用 

##环境是webpack  +  express 搭建的

###### 在public 目录里就是整个项目，dist 是生成的静态文件

###### 怎么运行呢？ 需要开两个终端
###### 1.在zhdaily 目录下 npm install （终端1）
###### 2.新开一个终端，再进到public 目录下 npm install  （终端2）
###### 3.在终端1，也就是zhdaily 目录下 npm start
###### 4.在终端2， 也就是public 目录下 npm run dev zhdaily  

###### 完成上面四步，浏览器就会自动打开一个新窗口，localhost:3001 
###### 然后自行在后面加上生成的静态页的地址，比如 http://localhost:3001/dist/zhdaily.html

###### 因为有跨域，所以还要处理跨域。
###### 跨域是很头疼的，当然也有好几个方法处理跨域，这里推荐一个工具，用了它就能肆意的用你喜欢的API而不怕跨域了
###### 这个神器就是 electron,它的官网 http://electron.atom.io

###### 下面就是安装的方法，如果install 没反应，推荐大家用淘宝NPM镜像

###### Clone the Quick Start repository
###### $ git clone https://github.com/electron/electron-quick-start

###### Go into the repository
###### $ cd electron-quick-start

###### Install the dependencies and run
###### $ npm install && npm start

###### npm start 之后就会启动一个环境，我们把项目中生成的在/dist/zhdaily.html 拖到上面，就能处理完所有跨域了

###### ！！！