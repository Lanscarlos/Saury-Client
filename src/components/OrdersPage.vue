<template>
  <div class="container">
    <el-card>
      <div v-if="orders.length === 0">
        <el-empty description="暂无订单" style="width: 780px"/>
      </div>
      <div v-else>
        <el-table :data="orders">
          <el-table-column label="编号" width="160">
            <template #default="scope">
              <span class="d-inline-block text-truncate" style="max-width: 130px;">{{ scope.row.orderNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="款项" width="350">
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
              <el-tag>{{ scope.row.status ? '已支付' : '未支付' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="时间" width="180">
            <template #default="scope">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ formatTimestamp(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="260">
            <template #default="scope">
              <el-button size="small" type="danger" @click="reject(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "OrdersPage",
  data: function () {
    return {
      orders: []
    }
  },
  methods: {
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
        '/orders',
        {},
        {
          headers: {
            'Authorization': sessionStorage.getItem('tokenValue')
          }
        }
    ).then((res) => {
      console.log('orders', res)
      this.orders = res.data.data
    })
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  /*height: 100vh;*/
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
</style>