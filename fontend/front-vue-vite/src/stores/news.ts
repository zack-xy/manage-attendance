import http from '@/utils/http';
import { ref } from 'vue';
import { defineStore } from 'pinia';

type GetRemind = {
  userid: unknown
}

type PutRemind = {
  userid: unknown
  approver?: boolean
  applicant?: boolean
}

type Info = {
  [index: string]: unknown
}

export const useNewStore = defineStore('news', () => {
  const infos = ref<Info>({})
  function getRemindAction(payload: GetRemind) {
    return http.get('/news/remind', payload)
  }
  function putRemindAction(payload: PutRemind) {
    return http.put('/news/remind', payload)
  }
  function updateInfo(payload: Info) {
    infos.value = payload
  }

  return {
    infos,
    getRemindAction,
    putRemindAction,
    updateInfo
  }
})
