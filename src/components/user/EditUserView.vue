<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {baseImgURL, baseURL} from "@/utils/service.ts";
import {Plus} from "@element-plus/icons-vue";
import type {UploadUserFile} from "element-plus";
import {getCity} from "@/api";
import {useRoute} from "vue-router";
import {getUserInfoApi, getUserTypes, updateUserInfo} from "@/api/user";
import {getUserStatusCache} from "@/utils/cache/common";

const {params} = useRoute();

const value = ref("")
const state = ref('')

const editUser = reactive({
  userId: params.id,
  username: "",
  email: "",
  phone: "",
  gender: "",
  cityId: "",
  identityId: "",
  birthDay: new Date(),
  avatar: "",
  statusId: "",
})


const placeholderUser = ref({
  userId: params.id,
  username: "张三",
  email: "",
  phone: "",
  gender: "",
  location: "",
  cityId: "",
  identityId: "",
  birthDay: new Date(),
  avatar: "",
  statusId: "",
})

const userTypes = ref(<any[]>[])
const fileList = ref<UploadUserFile[]>([])
const statusOptions = [
  {
    value: 1,
    label: "正常",
    disabled: true,
  }
]

const uploadSuss = (res) => {
  if (res.code == 200) {
    const avatar = res.data as string;
    console.log(avatar)
    editUser.avatar = avatar.replace("my-bucket/", "")
  }
}

const restaurants = ref([])
const createFilter = (queryString: string) => {
  return (restaurant) => {
    // let name:string = restaurant.name
    let name: string = restaurant.extName
    return name.indexOf(queryString) > -1
  }
}
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
      ? restaurants.value.filter(createFilter(queryString))
      : restaurants.value
  // call callback function to return suggestions
  console.log("resultsLength:", results.length)
  cb(results)
}
const handleSelect = (item: RestaurantItem) => {
  editUser.cityId = item.id
}

const cpuIdentity = computed(() => {
  return userTypes.value.find(item => item.id == placeholderUser.value.identityId)?.name || "未设置"
})

const cpuStatus = computed(() => {
  return userStatus.value.find(item => item.code == placeholderUser.value.statusId)?.description
})
const userStatus = ref(<any[]>[])

onMounted(() => {
  getData()
})

const getData = async () => {
  const data = await getCity()
  if (data.code == 200) {
    // const cities = converse(data.data)
    let values = Object.values(data.data);
    for (let value1 of values) {
      value1["value"] = value1["extName"]
    }
    restaurants.value.push(...values)

  }
  const userData = await getUserInfoApi(editUser.userId)
  placeholderUser.value = userData.data
  editUser.birthDay = userData.data.birthDay
  placeholderUser.value.birthDay = userData.data.birthDay

  const adata = await getUserTypes()
  userTypes.value = adata.data
  try {
    const cityId = placeholderUser.value.cityId
    state.value = restaurants.value.filter(item => item.id == cityId)[0]?.extName
  } catch (err) {
    console.log(err)
  }
  const userStatusCache = getUserStatusCache()
  userStatus.value = userStatusCache || []
}

const submit = async () => {
  let birthDay = editUser.birthDay == placeholderUser.value.birthDay ? null : editUser.birthDay
  birthDay = birthDay?.getTime()
  let o = {
    ...editUser,
    birthDay
  }
  let temp = Object.keys(o)

  temp.forEach(item => {
    if (o[item] == "" || o[item] == null) {
      delete o[item]
    }
  })
  if (Object.keys(o).length <= 1) {
    alert("你没有修改任何东西")
    return
  }
  const data = await updateUserInfo(o)
  console.log(data)
  if (data.code == 200) {
    alert("修改成功")
  } else {
    alert("修改失败")
  }
}
</script>

<template>
  <div class="container">
    <div class="item">
      <span>用户Id</span>
      <span>{{ editUser.userId }}</span>
    </div>
    <div class="item">
      <span>用户昵称</span>
      <input class="edit-input" type="text" name="username"
             :placeholder="placeholderUser.username"
             v-model="editUser.username"/>
    </div>
    <div class="item">
      <span>用户邮箱</span>
      <input class="edit-input" type="text" name="email"
             :placeholder="placeholderUser.email"
             v-model="editUser.email">
    </div>
    <div class="item">
      <span>手机号码</span>
      <input class="edit-input" type="text" name="phone"
             :placeholder="placeholderUser.phone"
             v-model="editUser.phone">
    </div>
    <div class="item">
      <span>性别</span>
      <input class="edit-input" type="text" name="gender"
             :placeholder="placeholderUser.gender == 1 ? '男' : '女'"
             v-model="editUser.gender">
    </div>
    <div class="item">
      <span>账号所属地</span>
      <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-50"
          placeholder="Please Input"
          @select="handleSelect"
      />
    </div>
    <div class="item">
      <span>社会身份</span>
      <el-select v-model="editUser.identityId" :placeholder="cpuIdentity" style="width: 240px">
        <el-option
            v-for="item in userTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
      </el-select>
    </div>
    <div class="item">
      <span>出生日期</span>
      <el-date-picker
          v-model="editUser.birthDay"
          type="date"
          placeholder="选择出生日期"
          size="default"
      />
    </div>
    <div class="item">
      <span>头像</span>
      <img :src="baseImgURL + placeholderUser.avatar" alt="用户头像" class="avatar">
      <el-upload
          class="avatar-uploader"
          v-model:file-list="fileList"
          :action="baseURL+'common/upload'"
          list-type="picture-card"
          :on-success="uploadSuss"
      >
        <el-icon class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </div>
    <div class="item">
      <span>状态</span>
      <el-select v-model="value" :placeholder="cpuStatus" style="width: 240px">
        <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
        />
      </el-select>
    </div>
  </div>
  <div class="submit-container">
    <div class="submit" @click="submit">提交</div>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  column-gap: 10%;
  row-gap: 60px;
  flex-wrap: wrap;

}

.item {
  width: 200px;
  font-size: 16px;

  span {
    &:first-child {
      &:after {
        content: ":";
        margin: 0 10px 0 5px;
      }
    }
  }

  .edit-input {
    font-size: initial;
    padding: 5px;
    border-radius: 5px;
    width: 160px;
  }

  :deep(.el-upload--picture-card) {
    --el-upload-picture-card-size: 14px;
    width: 60px !important;
    height: 60px !important;
  }
}

.submit-container {
  width: 100%;

  .submit {
    padding: 5px;
    margin: 60px auto;
    width: 100px;
    height: 25px;
    line-height: 25px;
    background-color: #1691e3;
    color: white;
    text-align: center;
    border-radius: 7px;
    font-size: 16px;

    &:active {
      background-color: #0f85d6;
    }
  }
}

.avatar {
  width: 60px;
  height: 60px;
}

.avatar-uploader {
  position: relative;
  top: -50%;
  left: 70%;

  :deep(.el-upload--picture-card) {
    width: 100px;
    height: 100px;
  }
}
</style>