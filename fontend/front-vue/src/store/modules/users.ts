import type { ActionTree, GetterTree, MutationTree } from "vuex"
import type { State } from '../index';
import http from '@/utils/http';
import type { Data } from '@/utils/http';

interface Infos {
  [index: string]: unknown
}

export interface UsersState {
  token: string
  infos: Infos
}

const state: UsersState = {
  token: '',
  infos: {}
}

const mutations: MutationTree<UsersState> = {
  updateToken(state, payload) {
    state.token = payload
  },
  updateInfos(state, payload) {
    state.infos = payload
  },
  clearToken(state) {
    state.token = ''
  }
}
const actions: ActionTree<UsersState, State> = {
  login(context, payload) {
    return http.post('/users/login', payload)
  },
  infos() {
    return http.get('/users/infos')
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
