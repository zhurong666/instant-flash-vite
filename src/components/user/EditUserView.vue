<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {baseURL} from "@/utils/service.ts";
import {Plus} from "@element-plus/icons-vue";
import type {UploadUserFile} from "element-plus";
import {getCity} from "@/api";

const value = ref("")
const state1 = ref('')

const editUser = reactive({
  userId: 1,
  username: "",
  email: "",
  phone: "",
  gender: "",
  cityId: "",
  identityId: "",
  brithDay: "",
  avatar: "",
  statusId: "",
})


const placeholderUser = reactive({
  userId: 1,
  username: "张三",
  email: "",
  phone: "",
  gender: "",
  location: "",
  cityId: "",
  identityId: "",
  brithDay: "",
  avatar: "",
  statusId: "",
})
const fileList = ref<UploadUserFile[]>([])
const statusOptions = [
  {
    value: 1,
    label: "正常",
    disabled: true,
  }
]

const uploadSuss = (res) => {
  console.log(res)
  if (res.code == 200) {
    uploadObj1[fileList.value.length - 1].imgUrl = res.data
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
  console.log("results:", results)
  cb(results)
}
const handleSelect = (item: RestaurantItem) => {
  console.log(item)
}

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
             :placeholder="placeholderUser.username"
             v-model="editUser.email">
    </div>
    <div class="item">
      <span>手机号码</span>
      <input class="edit-input" type="text" name="phone"
             :placeholder="placeholderUser.username"
             v-model="editUser.phone">
    </div>
    <div class="item">
      <span>性别</span>
      <input class="edit-input" type="text" name="gender"
             :placeholder="placeholderUser.username"
             v-model="editUser.gender">
    </div>
    <div class="item">
      <span>账号所属地</span>
      <el-autocomplete
          v-model="state1"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-50"
          placeholder="Please Input"
          @select="handleSelect"
      />
    </div>
    <div class="item">
      <span>社会身份</span>
      <input class="edit-input" type="text" name="identityId"
             :placeholder="placeholderUser.username"
             v-model="editUser.identityId">
    </div>
    <div class="item">
      <span>出生日期</span>
      <el-date-picker
          v-model="editUser.brithDay"
          type="date"
          placeholder="Pick a day"
          size="default"
      />
    </div>
    <div class="item">
      <span>头像</span>
      <img :src="placeholderUser.avatar" alt="用户头像" srcset="">
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
      <el-select v-model="value" placeholder="Select" style="width: 240px">
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
    <div class="submit">提交</div>
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
  width: max-content;
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

  .el-upload--picture-card {
    --el-upload-picture-card-size: 14px;
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

</style>