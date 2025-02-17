import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/login'
import RestaurantInfo from '@/components/RestaurantInfo'
import Menu from '@/components/Menu'
import Order from '@/components/Order'
import QRcode from '@/components/QRcode'
import comment from '@/components/comment'

// import tablerender from '@/components/tablerender'
import OrderDishes from '@/components/OrderDishes'
import Cart from '@/components/Cart'
import ModifyOrder from '@/components/ModifyOrder'
import AddDish from "../components/AddDish";
import OrderPrint from "../components/OrderPrint";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name: 'Login',
      component:Login
    },
    {
      path: '/home',
      component: Home,
      // meta: {
      //   keepAlive: true,
      // },
      children: [
      	{
      		path: 'restaurantinfo',
      		component: RestaurantInfo,
          meta: {
            keepAlive: false, //此组件不需要被缓存
          }
      	},
      	{
      		path: 'menu',
      		component: Menu
      	},
        {
          path: 'generate_qrcode',
          component: QRcode
        },
      	{
      		path: 'order',
      		component: Order,
      	},
        {
          path: 'comment',
          component: comment
        },
        {
          path: 'OrderDishes',
          component: OrderDishes,
          meta: {
            keepAlive: true, //此组件需要被缓存
          }
        },
        {
          path: 'Cart',
          component: Cart,
        },
        {
          path: 'modifyorder',
          name: "modifyorder",
          component: ModifyOrder,
          // meta: {
          //   keepAlive: true, //此组件需要被缓存
          //   isBack:false, //用于判断上一个页面是哪个
          // }
        },
        {
          path: 'OrderPrint',
          component: OrderPrint,
        },

        {
          path: 'adddish',
          name: "adddish",
          component: AddDish,
          // meta: {
          //   keepAlive: true, //此组件需要被缓存
          //   isBack:false, //用于判断上一个页面是哪个
          // }
        }
      ]
    },
    {
    	path:'*',
    	redirect: '/'
    }
  ]
})
