  step2-zhangqian
  遇到的问题：
  1：一直提示item is not a function
  2：错误提示 Cannot find module ‘xxxx’
  3：无论输入是什麽，输出都是undefind
  4：当输入的length>4时，本应该输出 please input right zipcode 但输出的是undefind
  解决办法：
1：item应该是一个object，错当function，传参方式错误
2：如果用了let xxx=require('./xx.js'),后面newItem{'#',yyy}应该是newItem{'#',xxx}，错写成newItem{'#',require('xxx')}
3: 最后main得到的应该是一个对象，而在route返回时忘记写text.xxxx
4：当返回的respond只有text属性时，忘记return