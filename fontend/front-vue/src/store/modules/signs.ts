import type { ActionTree, GetterTree, MutationTree } from "vuex"
import type { State } from '../index';
import http from "@/utils/http";

interface Infos {
  [index: string]: unknown
}

export interface SignsState {
  infos: Infos
}

const state: SignsState = {
  infos: {}
}

const mutations: MutationTree<SignsState> = {
  updateInfos(state, payload) {
    state.infos = payload
  }
}
const actions: ActionTree<SignsState, State> = {
  getTime(context, payload) {
    return http.get('/signs/time', payload)
  },
  putTime(context, payload) {
    return http.put('/signs/time', payload)
  }
}
const getters: GetterTree<SignsState, State> = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
