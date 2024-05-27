<template>
  <div class="container">
    <el-card>
      <el-tabs v-model="current" tab-position="left" style="height: 720px" class="demo-tabs">
        <el-tab-pane label="审核笔记" style="margin: 36px 0 0 36px">
          <el-table :data="reviewNotes" style="width: 100%">
            <el-table-column label="标题" width="300">
              <template #default="scope">
                <span class="d-inline-block text-truncate" style="max-width: 280px;">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="作者" width="100">
              <template #default="scope">
                <span class="d-inline-block text-truncate" style="max-width: 80px;">{{ scope.row.user.profile.username }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="140">
              <template #default="scope">
                <el-tag>{{ scope.row.type === 'text' ? '文本' : scope.row.type === 'image' ? '图片' : '视频' }}</el-tag>
                <el-tag v-show="scope.row.price !== 0" type="warning">付费</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="时间" width="180">
              <template #default="scope">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 10px">{{ formatTimestamp(scope.row.updateTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="240">
              <template #default="scope">
                <el-button size="small" type="primary" @click="viewNote(scope.row.id)">查看</el-button>
                <el-button size="small" type="success" @click="approve(scope.$index, scope.row)">通过</el-button>
                <el-button size="small" type="danger" @click="reject(scope.$index, scope.row)">拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="笔记管理" style="margin: 36px 0 0 36px">
          <el-table :data="notes" style="width: 100%">
            <el-table-column label="标题" width="300">
              <template #default="scope">
                <span class="d-inline-block text-truncate" style="max-width: 280px;">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="作者" width="100">
              <template #default="scope">
                <span class="d-inline-block text-truncate" style="max-width: 80px;">{{ scope.row.user.profile.username }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="140">
              <template #default="scope">
                <el-tag>{{ scope.row.type === 'text' ? '文本' : scope.row.type === 'image' ? '图片' : '视频' }}</el-tag>
                <el-tag v-show="scope.row.price !== 0" type="warning" style="margin-left: 8px">付费</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="时间" width="180">
              <template #default="scope">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 10px">{{ formatTimestamp(scope.row.updateTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="130">
              <template #default="scope">
                <el-tag :type="scope.row.state === 1 ? 'success' : scope.row.state === 0 ? 'warning' : 'danger'">{{ scope.row.state === 1 ? '审核通过' : scope.row.state === 0 ? '审核中' : '审核未通过' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="240">
              <template #default="scope">
                <el-button size="small" type="primary" @click="viewNote(scope.row.id)">查看</el-button>
                <el-button size="small" type="warning" @click="reauditNote(scope.$index, scope.row)" :disabled="scope.row.state === 0">重审</el-button>
                <el-button size="small" type="danger" @click="deleteNote(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="订单管理" style="margin: 36px 0 0 36px">
          <el-table :data="orders" style="width: 100%">
            <el-table-column label="编号" width="160">
              <template #default="scope">
                <span class="d-inline-block text-truncate" style="max-width: 130px;">{{ scope.row.orderNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户" width="100">
              <template #default="scope">
                <span class="d-inline-block text-truncate" style="max-width: 70px;">{{ scope.row.user.profile.username }}</span>
              </template>
            </el-table-column>
            <el-table-column label="款项" width="310">
              <template #default="scope">
                <span class="d-inline-block text-truncate" style="max-width: 280px;">{{ scope.row.subject }}</span>
              </template>
            </el-table-column>
            <el-table-column label="金额" width="100">
              <template #default="scope">
                ¥ {{ scope.row.amount }}
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
              <template #default="scope">
                <el-tag :type="scope.row.status ? 'success' : 'warning'">{{ scope.row.status ? '已支付' : '未支付' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="时间" width="180">
              <template #default="scope">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 10px">{{ formatTimestamp(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template #default="scope">
                <el-button size="small" type="danger" @click="deleteOrder(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="用户管理" style="margin: 36px 0 0 36px">
          <el-table :data="users" style="width: 100%">
            <el-table-column label="邮箱" width="230">
              <template #default="scope">
                <span class="d-inline-block text-truncate" style="max-width: 200px;">{{ scope.row.email }}</span>
              </template>
            </el-table-column>
            <el-table-column label="昵称" width="100">
              <template #default="scope">
                <span class="d-inline-block text-truncate" style="max-width: 70px;">{{ scope.row.profile.username }}</span>
              </template>
            </el-table-column>
            <el-table-column label="注册时间" width="180">
              <template #default="scope">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 10px">{{ formatTimestamp(scope.row.registerTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="120">
              <template #default="scope">
                <el-tag :type="scope.row.isBanned ? 'info' : 'success'">{{ scope.row.isBanned ? '封禁中' : '正常' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="身份" width="120">
              <template #default="scope">
                <el-tag :type="scope.row.isAdmin ? 'warning' : 'success'">{{ scope.row.isAdmin ? '管理员' : '普通用户' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="260">
              <template #default="scope">
                <el-button size="small" type="primary" @click="viewUser(scope.row.id)">查看</el-button>
                <el-button size="small" type="danger" @click="banUser(scope.$index, scope.row)">{{ scope.row.isBanned ? '解封' : '封禁' }}</el-button>
                <el-button size="small" type="warning" @click="promoteUser(scope.$index, scope.row)">{{ scope.row.isAdmin ? '撤销管理' : '授权管理' }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="数据概览">
          <div style="display: flex; flex-direction: row; justify-content: space-between; padding: 36px 36px 0 36px">
            <el-progress type="dashboard" :percentage="userRate">
              <template #default>
                <span class="percentage-value">{{ users.length }}</span>
                <span class="percentage-label">注册用户数</span>
              </template>
            </el-progress>
            <el-progress type="dashboard" :percentage="noteRate" status="success">
              <template #default>
                <span class="percentage-value">{{ notes.length }}</span>
                <span class="percentage-label">笔记总数</span>
              </template>
            </el-progress>
            <el-progress type="dashboard" :percentage="revenueRate" status="exception">
              <template #default>
                <span class="percentage-value">{{ orders.length }}</span>
                <span class="percentage-label">订单总数</span>
              </template>
            </el-progress>
            <el-progress type="dashboard" :percentage="revenueRate" status="warning">
              <template #default>
                <span class="percentage-value">{{ revenue }}</span>
                <span class="percentage-label">累计收益</span>
              </template>
            </el-progress>
          </div>
          <el-divider/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// import {getCookie} from "@/utils/cookie";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "AdminPage",
  data: function () {
    return {
      current: '0',
      users: [],
      orders: [],
      notes: []
    }
  },
  computed: {
    reviewNotes() {
      return this.notes.filter((item) => item.state === 0)
    },
    userRate() {
      const unban = this.users.reduce((acc, user) => {
        if (user.isBanned) {
          return acc
        }
        return acc + 1
      }, 0)
      return unban / this.users.length * 100
    },
    noteRate() {
      const approved = this.notes.reduce((acc, note) => {
        if (note.state === 1) {
          return acc + 1
        }
        return acc
      }, 0)
      return approved / this.notes.length * 100
    },
    revenue() {
      return this.orders.reduce((acc, order) => {
        if (order.status) {
          return acc + order.amount
        }
        return acc
      }, 0)
    },
    revenueRate() {
      const totalRevenue = this.orders.reduce((acc, order) => acc + order.amount, 0)
      console.log('revenue', this.revenue)
      console.log('totalRevenue', totalRevenue)
      return this.revenue / totalRevenue * 100
    }
  },
  methods: {
    viewUser(userId) {
      this.$router.push({ name:'user', params: { id: userId } })
    },
    banUser(index, user) {
      if (user.isBanned) {
        ElMessageBox.confirm('是否确认解禁该用户？', '解禁用户', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          callback: (action) => {
            console.log(action)
            if (action !== 'confirm') {
              return
            }

            this.$axios.post(
                '/unbanUser/' + user.id
            ).then((res) => {
              if (res.data.code !== 200) {
                ElMessage({
                  showClose: true,
                  message: '解禁失败！请重试',
                  type: 'error',
                })
                return
              }

              ElMessage({
                showClose: true,
                message: '解禁通过！',
                type: 'success',
              })

              this.users[index].isBanned = false
            })
          }
        })
      } else {
        ElMessageBox.confirm('是否确认禁用该用户？', '禁用用户', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          callback: (action) => {
            console.log(action)
            if (action !== 'confirm') {
              return
            }

            this.$axios.post(
                '/banUser/' + user.id
            ).then((res) => {
              if (res.data.code !== 200) {
                ElMessage({
                  showClose: true,
                  message: '禁用失败！请重试',
                  type: 'error',
                })
                return
              }

              ElMessage({
                showClose: true,
                message: '禁用通过！',
                type: 'success',
              })

              this.users[index].isBanned = true
            })
          }
        })
      }
    },
    promoteUser(index, user) {
      if (user.isAdmin) {
        ElMessageBox.confirm('是否确认取消提拔该用户？', '取消提拔用户', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          callback: (action) => {
            console.log(action)
            if (action !== 'confirm') {
              return
            }

            this.$axios.post(
                '/unpromoteUser/' + user.id
            ).then((res) => {
              if (res.data.code !== 200) {
                ElMessage({
                  showClose: true,
                  message: '取消失败！请重试',
                  type: 'error',
                })
                return
              }

              ElMessage({
                showClose: true,
                message: '取消成功！',
                type: 'success',
              })

              this.users[index].isAdmin = false
            })
          }
        })
      } else {
        ElMessageBox.confirm('是否确认提拔该用户？', '提拔用户', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          callback: (action) => {
            console.log(action)
            if (action !== 'confirm') {
              return
            }

            this.$axios.post(
                '/promoteUser/' + user.id
            ).then((res) => {
              if (res.data.code !== 200) {
                ElMessage({
                  showClose: true,
                  message: '提拔失败！请重试',
                  type: 'error',
                })
                return
              }

              ElMessage({
                showClose: true,
                message: '提拔通过！',
                type: 'success',
              })

              this.users[index].isAdmin = true
            })
          }
        })
      }
    },
    viewNote(noteId) {
      this.$router.push({ name:'note', params: { id: noteId } })
    },
    approve(index, note) {
      ElMessageBox.confirm('是否确认该笔记审核通过？', '笔记审核', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        callback: (action) => {
          console.log(action)
          if (action !== 'confirm') {
            return
          }

          this.$axios.post(
              '/note/approve/' + note.id,
              {},
              {
                headers: {
                  'Authorization': sessionStorage.getItem('tokenValue')
                }
              }
          ).then((res) => {
            if (res.data.code !== 200) {
              ElMessage({
                showClose: true,
                message: '审核失败！请重试',
                type: 'error',
              })
              return
            }

            ElMessage({
              showClose: true,
              message: '审核通过！',
              type: 'success',
            })

            note.state = 1
            // 删去该元素
            // this.filteredNotes.splice(index, 1);
          })
        }
      })
    },
    reject(index, note) {
      ElMessageBox.confirm('是否确认该笔记审核不通过？', '笔记审核', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        callback: (action) => {
          console.log(action)
          if (action !== 'confirm') {
            return
          }

          this.$axios.post(
              '/note/reject/' + note.id,
              {},
              {
                headers: {
                  'Authorization': sessionStorage.getItem('tokenValue')
                }
              }
          ).then((res) => {
            if (res.data.code !== 200) {
              ElMessage({
                showClose: true,
                message: '审核失败！请重试',
                type: 'error',
              })
              return
            }

            ElMessage({
              showClose: true,
              message: '审核拒绝！',
              type: 'success',
            })

            note.state = 2
            // 删去该元素
            // this.filteredNotes.splice(index, 1);
          })
        }
      })
    },
    reauditNote(index, note) {
      ElMessageBox.confirm('是否确认重审该笔记？', '笔记重审', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        callback: (action) => {
          console.log(action)
          if (action !== 'confirm') {
            return
          }

          this.$axios.post(
              '/note/reaudit/' + note.id,
              {},
              {
                headers: {
                  'Authorization': sessionStorage.getItem('tokenValue')
                }
              }
          ).then((res) => {
            if (res.data.code !== 200) {
              ElMessage({
                showClose: true,
                message: '重审失败！请重试',
                type: 'error',
              })
              return
            }

            ElMessage({
              showClose: true,
              message: '重审拒绝！',
              type: 'success',
            })

            note.state = 0
            // 删去该元素
            // this.notes[index].state = 0
            // this.filteredNotes.push(note)
          })
        }
      })
    },
    deleteNote(index, note) {
      ElMessageBox.confirm('该操作不可撤销！是否确认删除？', '删除笔记', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        callback: (action) => {
          console.log(action)
          if (action !== 'confirm') {
            return
          }

          this.$axios.post(
              '/note/delete/' + note.id,
              {},
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
                message: '删除失败！请联系工作人员',
                type: 'error',
              })
              return
            }

            // 删去该元素
            this.notes.splice(index, 1);

            ElMessage({
              showClose: true,
              message: '删除成功',
              type: 'success',
            })
          })
        }
      })
    },
    deleteOrder(index, order) {
      ElMessageBox.confirm('该操作不可撤销！是否确认删除？', '删除订单', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        callback: (action) => {
          console.log(action)
          if (action !== 'confirm') {
            return
          }

          this.$axios.post(
              '/deleteOrder/' + order.id,
              {},
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
                message: '删除失败！请联系工作人员',
                type: 'error',
              })
              return
            }

            // 删去该元素
            this.orders.splice(index, 1);

            ElMessage({
              showClose: true,
              message: '删除成功',
              type: 'success',
            })
          })
        }
      })
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 月份从0开始，需要加1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }
  },
  beforeMount() {
    this.$axios.post(
        '/note/notes',
    ).then((res) => {
      console.log(res)
      this.notes = res.data.data
    })
    this.$axios.post(
        '/users',
    ).then((res) => {
      console.log(res)
      this.users = res.data.data
    })
    this.$axios.post(
        '/allOrders',
    ).then((res) => {
      console.log(res)
      this.orders = res.data.data
    })
  }
}
</script>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>