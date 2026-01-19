<template>
  <view class="container">
    <view class="header">
      <u-avatar size="60"></u-avatar>
      <text class="nickname">未登录用户</text>
    </view>
    
    <view class="menu-list">
      <u-cell-group>
        <u-cell title="我的收藏" isLink icon="star"></u-cell>
        <u-cell title="设置" isLink icon="setting"></u-cell>
        <u-cell title="关于我们" isLink icon="info-circle"></u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script setup lang="ts">
// Profile page
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
}
.header {
  padding: 40px 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-bottom: 20px;
  
  .nickname {
    margin-left: 15px;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
