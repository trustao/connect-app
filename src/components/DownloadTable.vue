<template>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="name"
                label="名称"
        >
        </el-table-column>
        <el-table-column
                prop="size"
                label="大小"
                width="180">
        </el-table-column>
        <el-table-column
                prop="hot"
                label="热度"
                width="180">
        </el-table-column>
        <el-table-column
                prop="url"
                label="地址"
                width="180">
            <template slot-scope="scope">
                <el-button type="text" icon="el-icon-document-copy" @click="copy(scope.row.url)"></el-button>
                <el-popover
                        :title="scope.row.url"
                        width="400"
                        trigger="click">
                    <el-button type="text" slot="reference">查看</el-button>
                </el-popover>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
  import copy from '../utils/copy'
  export default {
    props: ['tableData'],
    methods: {
      copy (url) {
        if (!url) return
        copy(url).then(() => {
          this.$message.success('复制成功')
        }).catch(() => {
          this.$message.error('复制失败')
        })
      },
    }
  }
</script>