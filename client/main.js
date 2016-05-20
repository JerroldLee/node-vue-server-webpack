﻿'use strict';
import "babel-polyfill"
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCm from './lib/cm-plugin'

//懒加载路由 只有访问这个路由才会加载js
Vue.use(VueRouter);
Vue.use(VueCm);

var router = new VueRouter({
    history: true, //html5模式 去掉锚点
    saveScrollPosition: true //记住页面的滚动位置 html5模式适用
})

//定义路由
router.map({
    '/': {
        component: function(resolve){
            require.ensure([], function() {
                let route = require('./states/index/route').default;
                resolve(route);
            })
        }
    },
    '/search/:keyword': {
        component: function(resolve){
            require.ensure([], function() {
                let route = require('./states/search/route').default;
                resolve(route);
            })
        },
        subRoutes: {
            '/': {
                component: function(resolve){
                    require.ensure([], function() {
                        let route = require('./states/search/panda/route').default;
                        resolve(route);
                    })
                }
            },
            '/panda': {
                component: function(resolve){
                    require.ensure([], function() {
                        let route = require('./states/search/panda/route').default;
                        resolve(route);
                    })
                }
            },
            // 其他子路由
        }
    },
    '/video': {
        component: function(resolve){
            require.ensure([], function() {
                let route = require('./states/video/route').default;
                resolve(route);
            })
        }
    },
})
router.redirect({
    '*': '/'
})

var App = Vue.extend({})

//启动APP
router.start(App, '#app')