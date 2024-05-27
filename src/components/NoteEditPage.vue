<template>
  <div class="container">
    <el-card>
      <div class="shell">

        <div class="head">
          <div class="data">
            <div class="title1">
              知识，与你分享
            </div>
            <div class="title2">
              —— By <cite title="Source Title">Blessed One of Wisdom, Mahakusaladhamma</cite>
            </div>
          </div>
        </div>

        <el-divider />

        <div style="padding-right: 96px">
          <el-form :model="note" label-width="120px">
            <el-form-item label="标题">
              <el-input v-model="note.title" placeholder="请输入笔记标题"/>
            </el-form-item>
            <el-form-item label="描述" placeholder="请输入笔记描述">
              <el-input v-model="note.description" />
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="note.type" placeholder="请选择笔记类型">
                <el-option label="文本笔记" value="text" />
                <el-option label="图片笔记" value="image" />
                <el-option label="视频笔记" value="video" />
              </el-select>
            </el-form-item>
            <el-form-item label="标签">
              <el-autocomplete
                  style="width: 100%;"
                  v-model="note.tags"
                  :fetch-suggestions="suggestTags"
                  clearable
                  @select="handleTagSelect"
                  placeholder="多个标签时请以逗号','分隔" />
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number v-model="note.price" :precision="2" :step="1.0" :max="999" :min="0" />
            </el-form-item>
            <el-form-item label="内容">
              <el-input v-if="note.type === 'text'" type="textarea" rows="32" v-model="note.content" />
              <el-upload
                  v-if="note.type === 'image'"
                  class="avatar-uploader"
                  :action="baseURL + '/media/upload'"
                  limit="1"
                  :show-file-list="false"
                  :on-success="handleSuccess"
                  :before-upload="beforeUpload"
              >
                <img v-if="note.content" :src="note.content" class="avatar" alt="..."/>
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
              <el-upload
                  v-if="note.type === 'video'"
                  class="avatar-uploader"
                  :action="baseURL + '/media/upload'"
                  limit="1"
                  :show-file-list="false"
                  :on-success="handleSuccess"
                  :before-upload="beforeUpload"
              >
                <video v-if="note.content" :src="note.content" class="avatar"/>
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-form-item>
                <el-button type="primary" @click="publishNote">发布</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import axios from "axios";
// import {getCookie} from "@/utils/cookie";

export default {
  name: "NoteEditPage",
  data: function () {
    const baseURL = axios.defaults.baseURL
    return {
      baseURL: baseURL,
      common: {
        tags: [
          { "value": "C++" },
          { "value": "Java" },
          { "value": "Kotlin" },
          { "value": "JavaScript" },
          { "value": "Spring" },
          { "value": "SpringBoot" },
          { "value": "SpringCloud" },
          { "value": "MySQL" },
          { "value": "MongoDB" },
          { "value": "MyBatis" },
          { "value": "Html" },
          { "value": "CSS" },
          { "value": "Vue" },
          { "value": "React" },
          { "value": "NodeJs" },
          { "value": "Bootstrap" },
          { "value": "ElementUI" },
          { "value": "Windows" },
          { "value": "Linux" },
          { "value": "Android" },
          { "value": "Navicat" },
          { "value": "ApiFox" },
          { "value": "软件应用" },
          { "value": "代码编程" },
          { "value": "云计算" },
          { "value": "数据库" },
          { "value": "网页开发" },
          { "value": "即时灵感" },
        ]
      },
      note: {
        title: '无标题笔记',
        description: '',
        type: 'text',
        price: 0.0,
        tags: '',
        content: ""
      }
    }
  },
  methods: {
    suggestTags(input, execute) {
      if (input) {
        const suggestions = this.common.tags.filter((item) => item.value.toLowerCase().indexOf(input.toLowerCase()) === 0)
        execute(suggestions)
      } else {
        execute(this.common.tags)
      }
    },
    handleTagSelect() {
      console.log('handleTagSelect...')
    },
    handleSuccess(response) {
      console.log('handleSuccess...')
      if (response.code !== 200) {
        alert(response.msg)
        return
      }
      this.note.content = this.baseURL + '/static/' + response.data

    },
    beforeUpload() {
      console.log('beforeUpload...')
      return true;
    },
    publishNote() {
      if (this.note.content === '') {
        ElMessage({
          showClose: true,
          message: '请输入笔记内容',
          type: 'error',
        })
        return
      }

      this.$axios.post(
          '/note/publish',
          this.$qs.stringify({
            title: this.note.title,
            description: this.note.description,
            type: this.note.type,
            price: this.note.price,
            content: this.note.content,
            tags: this.note.tags
          }),
          {
            headers: {
              'Authorization': sessionStorage.getItem('tokenValue')
            }
          }
      ).then((res) => {
        console.log(res)
        if (res.data.code !== 200) {
          ElMessage({
            showClose: true,
            message: '发布失败！请联系工作人员',
            type: 'error',
          })
          return
        }

        ElMessage({
          showClose: true,
          message: '发布成功',
          type: 'success',
        })

        this.$router.push({ name:'note', params: { id: res.data.data.id } })
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  /*background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);*/
  margin-bottom: 128px;
}

.shell {
  width: 780px;
  background: #ffffff;
  position: relative;
}

.head {
  height: 340px;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.head::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../assets/background/8.png");
  background-size: cover;
  z-index: -1;
  transform: skewY(-4deg);
  transform-origin: 0 0;
}

.cover {
  position: absolute;
  top: 190px;
  left: 25px;
  width: 220px;
  z-index: 2;
  border-radius: 500px;
  border: 10px #fff solid;
  box-shadow: 0 5px 10px #00000065;
}

.data {
  padding: 120px 0 0 0;
  text-shadow: 0 0 20px #000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.data .title1 {
  color: white;
  font-size: 50px;
  font: 900 50px '';
  margin-bottom: 5px;
  position: relative;
}

.data .title1 span {
  position: absolute;
  top: 17px;
  margin-left: 12px;
  background: #ffe44c;
  border-radius: 5px;
  color: #000000;
  font-size: 14px;
  padding: 0px 4px;
}

.data .title2 {
  color: #fff;
  font: 500 24px '';
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

figure {
  margin-top: 64px;
  margin-bottom: 64px;
}
</style>