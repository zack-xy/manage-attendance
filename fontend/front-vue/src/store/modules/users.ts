import type { ActionTree, GetterTree, MutationTree } from "vuex"
import type { State } from '../index';
import http from '@/utils/http';
import type { Data } from '@/utils/http';

export interface UsersState {}

const state: UsersState = {}

const mutations: MutationTree<UsersState> = {}
const actions: ActionTree<UsersState, State> = {
  login(store, payload) {
    return http.post('/users/login', payload)
  }
}
const getters: GetterTree<UsersState, State> = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
