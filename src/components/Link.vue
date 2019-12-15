<template>
    <router-link class="item"  :to="linkData.url">
        <el-card class="item" :body-style="{ padding: '0px' }"  shadow="hover">
            <el-image lazy :src="linkData.img" class="image" fit="contain">
                <i class="el-icon-loading" slot="placeholder"></i>
            </el-image>
            <div style="padding: 14px;" @click="jump">
                <span>{{linkData.title}}</span>
            </div>
        </el-card>
    </router-link>
</template>

<script>
  export default {
    name: "Link",
    props: ['linkData'],
    methods: {
      jump () {
        console.log('%c Jump', 'color:blue;font-size: 20px;', this.linkData.url)
        this.$router.push(this.linkData.url)
      }
    }
  }
</script>

<style lang="less" scoped>
    .item {
        width: 200px;
        height: 350px;
        margin: 10px;
        cursor: pointer;
        &:last-child {
            margin-right: auto;
        }
    }
    span {
        font-size: 13px;
        color: #999;
    }
    .image {
        display: flex;
        width: 100%;
        height: 272px;
        align-items: center;
        justify-content: center;
    }
</style>