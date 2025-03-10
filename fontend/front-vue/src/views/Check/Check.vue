
<template>
  <div class="check-title">
    <el-space>
      <el-input v-model="searchWord" placeholder="请输入搜索关键词"></el-input>
      <el-button type="primary" icon="search">搜索</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-radio-group v-model="approverType">
        <el-radio-button label="全部" value="全部"></el-radio-button>
        <el-radio-button label="待审批" value="待审批"></el-radio-button>
        <el-radio-button label="已通过" value="已通过"></el-radio-button>
        <el-radio-button label="未通过" value="未通过"></el-radio-button>
      </el-radio-group>
    </el-space>
  </div>
  <div class="check-table">
    <el-table :data="pageCheckList" style="width: 100%" border>
      <el-table-column prop="applicantname" label="申请人" width="180"></el-table-column>
      <el-table-column prop="reason" label="审批事由" width="180"></el-table-column>
      <el-table-column prop="time" label="时间">
        <template #default="scope">
          {{ scope.row.time.join(' ~ ') }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="success" icon="check" size="small" circle @click="handlePutApply(scope.row._id, '已通过', scope.row.applicantid)"></el-button>
          <el-button type="danger" icon="close" size="small" circle @click="handlePutApply(scope.row._id, '未通过', scope.row.applicantid)"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="180"></el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next, total" :total="checkList.length" :page-size="pageSize" @current-change="handleChange"></el-pagination>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from '@/store';
defineComponent({
  name: 'CheckView'
})

const store = useStore()
const defaultType = '全部'
const approverType = ref(defaultType)
const searchWord = ref('')

const pageSize = ref(5)
const pageCurrent = ref(1)

const usersInfos = computed(() => store.state.users.infos)

const checkList = computed(() => store.state.checks.checkList.filter(v => (v.state === approverType.value || defaultType === approverType.value) && (v.note as string).includes(searchWord.value)))

const pageCheckList = computed(() => 
checkList.value.slice((pageCurrent.value - 1)*pageSize.value, pageCurrent.value*pageSize.value)
)

const handleChange = (value: number) => {
  pageCurrent.value = value
}

const handlePutApply = (_id: string, state: '已通过' | '未通过', applicantid: string) => {
  store.dispatch('checks/putApply',  {_id, state}).then(res => {
    if(res.data.errcode === 0) {
      store.dispatch('checks/getApply', { approverid: usersInfos.value._id }).then(res => {
        if(res.data.errcode === 0) {
          store.commit('checks/updateCheckList', res.data.rets)
        }
      })
      store.dispatch('news/putRemind', { userid: applicantid, applicant: true })
      ElMessage.success('审批成功')
    }
  })
}
</script>

<style scoped lang="scss">
.check-title {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
.check-table {
  margin: 10px;
  .el-pagination {
    float: right;
    margin: 10px;
  }
}
</style>
