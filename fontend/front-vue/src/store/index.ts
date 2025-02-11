import { createStore, useStore as baseUseStore } from 'vuex'
import type { Store } from 'vuex'
import users from './modules/users'
import checks from './modules/checks'
import news from './modules/news'
import signs from './modules/signs'
import type { UsersState } from './modules/users'
import type { ChecksState } from './modules/checks'
import type { NewsState } from './modules/news'
import type { SignsState } from './modules/signs'
import type { InjectionKey } from 'vue';

export interface State {

}

export interface StateAll extends State {
  users: UsersState
  checks: ChecksState
  news: NewsState
  signs: SignsState
}

export function useStore() {
  return baseUseStore(key)
}

export const key: InjectionKey<Store<StateAll>> = Symbol()

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
    checks,
    signs,
    news
  }
})
