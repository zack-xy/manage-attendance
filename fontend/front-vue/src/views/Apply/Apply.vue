
<template>
  <div class="apply-title">
    <el-button type="primary" @click="handleOpen">添加审批</el-button>
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
  <div class="apply-table">
    <el-table :data="pageApplyList" style="width: 100%" border>
      <el-table-column prop="applicantname" label="申请人" width="180"></el-table-column>
      <el-table-column prop="reason" label="审批事由" width="180"></el-table-column>
      <el-table-column prop="time" label="时间">
        <template #default="scope">
          {{ scope.row.time.join(' ~ ') }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column prop="approvername" label="审批人" width="180"></el-table-column>
      <el-table-column prop="state" label="状态" width="180"></el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next, total" :total="applyList.length" :page-size="pageSize" @current-change="handleChange"></el-pagination>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="添加审批"
    width="500"
    :before-close="handleClose"
  >
  <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
    <el-form-item label="审批人" prop="approvername">
      <el-select v-model="ruleForm.approvername" placeholder="请选择">
        <el-option v-for="item in approver" :key="(item._id as string)" :value="(item.name as string)" :label="(item.name as string)"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="审批事由" prop="reason">
      <el-select v-model="ruleForm.reason" placeholder="请选择">
        <el-option value="年假" label="年假"></el-option>
        <el-option value="事假" label="事假"></el-option>
        <el-option value="病假" label="病假"></el-option>
        <el-option value="外出" label="外出"></el-option>
        <el-option value="补签卡" label="补签卡"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="时间" prop="time">
      <el-date-picker
        v-model="ruleForm.time"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="备注" prop="note">
      <el-input
        v-model="ruleForm.note"
        :autosize="{ minRows: 4, maxRows: 6 }"
        type="textarea"
        placeholder="请输入"
      ></el-input>
    </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          提 交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref, reactive } from 'vue';
import moment from 'moment';
import { ElMessage } from 'element-plus';
import type {  DateModelType, FormInstance, FormRules } from 'element-plus'
import { useStore } from '@/store';
defineComponent({
  name: 'ApplyView'
})

interface ApplyList {
  applicantid: string,
  applicantname: string,
  approverid: string,
  approvername: string,
  note: string,
  reason: string,
  time: [DateModelType, DateModelType]
}

const store = useStore()
const defaultType = '全部'
const approverType = ref(defaultType)
const searchWord = ref('')
const userInfos = computed(() => store.state.users.infos)
const approver = computed(() => userInfos.value.approver as {[index: string]: unknown}[])
const dialogVisible = ref(false)
const applyList = computed(() => store.state.checks.applyList.filter(v => (v.state === approverType.value || defaultType === approverType.value) && (v.note as string).includes(searchWord.value)))
const pageSize = ref(5)
const pageCurrent = ref(1)

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive<ApplyList>({
  applicantid: '',
  applicantname: '',
  approverid: '',
  approvername: '',
  note: '',
  reason: '',
  time: ['','']
})

const validatorTime = (rule: unknown, value: [DateModelType, DateModelType], callback: (arg?: Error) => void) => {
  if(!value[0] && !value[1]) {
    callback(new Error('请选择审批时间'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  approvername: [
    { required: true, message: "请选择审批人", trigger: 'blur' },
  ],
  reason: [
    { required: true, message: "请选择审批事由", trigger: 'blur' },
  ],
  time: [
    { validator: validatorTime, trigger: 'blur' },
  ],
  note: [
    { required: true, message: "请填写备注", trigger: 'blur' },
  ],
})

const pageApplyList = computed(() => 
  applyList.value.slice((pageCurrent.value - 1)*pageSize.value, pageCurrent.value*pageSize.value)
)

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ruleForm.applicantid = userInfos.value._id as string
      ruleForm.applicantname = userInfos.value.name as string
      ruleForm.approverid = (approver.value.find(v => v.name === ruleForm.approvername) as {[index: string]: unknown})._id as string
      ruleForm.time[0] = moment(ruleForm.time[0]).format('YYYY-MM-DD hh:mm:ss')
      ruleForm.time[1] = moment(ruleForm.time[1]).format('YYYY-MM-DD hh:mm:ss')
      store.dispatch('checks/postApply', ruleForm).then(res => {
        if(res.data.errcode === 0) {
          store.dispatch('checks/getApply', { applicantid: userInfos.value._id }).then(res => {
            if(res.data.errcode === 0) {
              store.commit('checks/updateApplyList', res.data.rets)
            }
          })
          ElMessage.success('添加审批成功')
          resetForm(ruleFormRef.value)
          handleClose()
        } else {
          ElMessage.error(res.data.errmsg)
        }
      })
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if(!formEl) return
  formEl.resetFields()
}

const handleChange = (value: number) => {
  pageCurrent.value = value
}

const handleClose = () => {
  dialogVisible.value = false
}

const handleOpen = () => {
  dialogVisible.value = true
}

</script>

<style scoped lang="scss">
.apply-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.apply-table {
  margin: 10px;
  .el-pagination {
    float: right;
    margin: 10px;
  }
}
</style>
