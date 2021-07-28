import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "@/views/index"
import energy from "@/views/energy"
import check from '@/views/check'
import baseInfo from '@/views/baseInfo'
import archives from '@/views/archives'
import pipeline from "@/views/pipeline"
import construction from "@/views/construction"
import patrolManage from '@/views/patrolManage'
import assetsManage from '@/views/assetsManage'
import draw from '@/views/draw'
import EvacuationSimulation from '@/views/EvacuationSimulation'
import windSpeed from '@/views/windSpeed'

import bookmark from '@/views/bookmark'
import kineticAnalysis from '@/views/kineticAnalysis'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/check',
    name: 'check',
    component: check
  },
  {
    path: '/baseInfo',
    name: 'baseInfo',
    component: baseInfo
  },
  {
    path: '/construction',
    name: 'construction',
    component: construction
  },
  {
    path: '/archives',
    name: 'archives',
    component: archives
  },
  {
    path: '/energy',
    name: 'energy',
    component: energy
  },
  {
    path: '/bookmark',
    name: 'bookmark',
    component: bookmark
  },
  {
    path: '/pipeline',
    name: 'pipeline',
    component: pipeline
  },
  {
    path: '/patrolManage',
    name: 'patrolManage',
    component:patrolManage
  },
  {
    path: '/assetsManage',
    name: 'assetsManage',
    component:assetsManage
  },
  {
    path: '/draw',
    name: 'draw',
    component:draw
  },
  {
    path: '/EvacuationSimulation',
    name: 'EvacuationSimulation',
    component:EvacuationSimulation
  },
  {
    path: '/windSpeed',
    name: 'windSpeed',
    component:windSpeed
  },
  {
    path: '/kineticAnalysis',
    name: 'kineticAnalysis',
    component:kineticAnalysis
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
export default router
