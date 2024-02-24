<template>
  <div class="container">
    <el-card>
      <div class="shell">
        <el-form :model="note" label-width="120px">
          <el-form-item label="标题">
            <el-input v-model="note.title"/>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="note.description" />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="note.type" placeholder="请选择笔记类型">
              <el-option label="文本" value="text" />
              <el-option label="图片" value="image" />
              <el-option label="视频" value="video" />
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-if="note.type === 'text'" type="textarea" v-model="note.content" />
            <el-upload
                v-if="note.type === 'image'"
                class="avatar-uploader"
                action="http://localhost:8080/media/upload"
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
                action="http://localhost:8080/media/upload"
                limit="1"
                :show-file-list="false"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
            >
              <img v-if="note.content" :src="note.content" class="avatar" alt="..."/>
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存资料</el-button>
              <el-button>取消修改</el-button>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "NotePublishPage",
  data: function () {
    return {
      note: {
        title: '无标题笔记',
        description: '',
        type: 'text',
        content: ""
      }
    }
  },
  methods: {
    handleSuccess(response) {
      console.log('handleSuccess...')
      if (response.code !== 200) {
        alert(response.msg)
        return
      }
      this.note.content = 'http://localhost:8080/static/' + response.data

    },
    beforeUpload() {
      console.log('beforeUpload...')
      return true;
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  /*background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);*/
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
  background: url("../assets/note-background.png");
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
  padding: 190px 0 0 280px;
  text-shadow: 0 0 20px #000;
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
</style>