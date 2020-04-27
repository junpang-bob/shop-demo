import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Cell, CellGroup,Tabbar,TabbarItem,PullRefresh,NavBar,Button,Col,Row,Swipe,SwipeItem,Lazyload,List,Field,Tabs,Tab,Stepper} from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton,Card } from 'vant';
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Card);
Vue.config.productionTip = false
Vue.use(Cell).use(CellGroup).use(Tabbar).use(TabbarItem).use(Stepper).use(NavBar).use(Button).use(Col).use(Row).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Tabs).use(Tab).use(PullRefresh);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
