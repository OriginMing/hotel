import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "u-reset.css";
import  filter  from './components/filter/filter';
import axios from 'axios'

Vue.use(ElementUI);
Vue.prototype.$http=axios;
Vue.config.productionTip = false
 Object.keys(filter).forEach(ele=>{
   Vue.filter(ele,filter[ele]);
 })
new Vue({
  router,
  //局部组件
  render: h => h(App),
}).$mount('#app')
