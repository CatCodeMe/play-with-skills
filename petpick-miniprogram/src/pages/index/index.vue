<template>
  <view class="container">
    <view class="welcome-card">
      <text class="title">AI 宠物食品成分解读</text>
      <text class="subtitle">拍照或输入配料表，立即识别优劣成分</text>
    </view>
    
    <view class="input-section">
      <u-textarea
        v-model="ingredientsText"
        placeholder="在此粘贴或输入配料表..."
        count
        height="150"
      ></u-textarea>
      
      <view class="action-buttons">
        <view class="btn-wrapper">
          <u-button
            type="primary"
            text="开始分析"
            icon="checkmark-circle"
            @click="handleAnalyze"
            :loading="loading"
          ></u-button>
        </view>
        <view class="btn-wrapper">
          <u-button
            type="success"
            text="拍照识别"
            icon="camera"
            @click="handleCamera"
          ></u-button>
        </view>
      </view>
    </view>

    <!-- 分析结果展示 (暂位) -->
    <view v-if="result" class="result-section">
      <u-divider text="分析结果"></u-divider>
      <view class="score-card">
        <text class="score">{{ result.score }}分</text>
        <text class="summary">{{ result.summary }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { config } from '@/config';

const ingredientsText = ref('');
const loading = ref(false);
const result = ref<any>(null);

const handleAnalyze = async () => {
  if (!ingredientsText.value) {
    uni.showToast({ title: '请输入配料表', icon: 'none' });
    return;
  }
  
  loading.value = true;
  try {
    // 模拟 API 调用
    // const res = await uni.request({
    //   url: `${config.baseUrl}/api/analyze/text`,
    //   method: 'POST',
    //   data: { ingredients_text: ingredientsText.value }
    // });
    
    // 模拟延迟
    await new Promise(r => setTimeout(r, 1500));
    
    // Mock 结果
    result.value = {
      score: 88,
      summary: '这款食品成分良好，主要肉类来源清晰。'
    };
    
    uni.showToast({ title: '分析完成', icon: 'success' });
    
  } catch (error) {
    uni.showToast({ title: '分析失败，请重试', icon: 'none' });
  } finally {
    loading.value = false;
  }
};

const handleCamera = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['camera', 'album'],
    success: (res) => {
      // OCR 逻辑待接入
      uni.showToast({ title: '图片已选择(OCR待开发)', icon: 'none' });
      console.log(res.tempFilePaths);
    }
  });
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.welcome-card {
  margin-bottom: 20px;
  
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    display: block;
    margin-bottom: 8px;
  }
  
  .subtitle {
    font-size: 14px;
    color: #666;
  }
}

.input-section {
  background-color: #fff;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  gap: 15px;
  
  .btn-wrapper {
    flex: 1;
  }
}

.result-section {
  margin-top: 30px;
  
  .score-card {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    margin-top: 15px;
    
    .score {
      font-size: 36px;
      font-weight: bold;
      color: #2979ff;
      display: block;
      margin-bottom: 10px;
    }
    
    .summary {
      font-size: 16px;
      color: #333;
    }
  }
}
</style>
