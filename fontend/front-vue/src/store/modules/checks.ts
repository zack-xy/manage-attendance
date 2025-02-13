import type { ActionTree, GetterTree, MutationTree } from "vuex"
import type { State } from '../index';
import http from "@/utils/http";

interface Infos {
   [index: string]: unknown
}

export interface ChecksState {
  applyList: Infos[]
}

const state: ChecksState = {
  applyList: []
}

const mutations: MutationTree<ChecksState> = {
  updateApplyList(state, payload) {
    state.applyList = payload
  }
}
const actions: ActionTree<ChecksState, State> = {
  getApply(context, payload) {
    return http.get('/checks/apply', payload)
  },
  postApply(context, payload) {
    return http.post('/checks/apply', payload)
  }
}
const getters: GetterTree<ChecksState, State> = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
