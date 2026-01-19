<template>
  <view class="app-container">
    <!-- 1. 首页 -->
    <view v-if="pageState === 'home'" class="home-view">
      <!-- 顶部导航 -->
      <view class="top-bar">
        <view class="logo-area">
          <view class="logo-mark"></view>
          <text class="logo-text">PetPick</text>
        </view>
        <view class="user-avatar" @click="showTip('个人中心')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </view>
      </view>

      <!-- 主标语 -->
      <view class="hero-section">
        <text class="hero-title">智能配料分析</text>
        <text class="hero-subtitle">为爱宠的每一餐把关</text>
      </view>

      <!-- 主功能卡片 -->
      <view class="main-action-card" @click="handleCamera">
        <view class="action-content">
          <view class="action-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          </view>
          <view class="action-text">
            <text class="action-title">拍照识别</text>
            <text class="action-desc">自动提取并分析配料表</text>
          </view>
        </view>
        <view class="action-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </view>
      </view>

      <!-- 次要功能 -->
      <view class="secondary-grid">
        <view class="grid-item" @click="showInputPopup = true">
          <view class="item-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </view>
          <text class="item-label">手动输入</text>
        </view>
        <view class="grid-item" @click="toHistory">
          <view class="item-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </view>
          <text class="item-label">历史记录</text>
        </view>
        <view class="grid-item" @click="showTip('成分百科')">
          <view class="item-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </view>
          <text class="item-label">成分百科</text>
        </view>
      </view>

      <!-- 底部信息 -->
      <view class="footer-info">
        <text>已为 12,000+ 宠物家庭提供服务</text>
      </view>
    </view>

    <!-- 2. 加载态 -->
    <view v-if="pageState === 'loading'" class="loading-view">
      <view class="loader">
        <view class="loader-ring"></view>
        <view class="loader-ring delay"></view>
      </view>
      <text class="loading-text">{{ loadingText }}</text>
    </view>

    <!-- 3. 结果页 -->
    <scroll-view v-if="pageState === 'result' && result" scroll-y class="result-view">
      <!-- 返回按钮 -->
      <view class="result-header">
        <view class="back-btn" @click="reset">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <text>返回</text>
        </view>
      </view>

      <view class="result-body">
        <!-- 评分区 -->
        <view class="score-section">
          <view class="score-circle" :class="getScoreLevel(result.score)">
            <text class="score-value">{{ result.score }}</text>
          </view>
          <view class="score-info">
            <text class="score-level">{{ getScoreLabel(result.score) }}</text>
            <text class="score-summary">{{ result.summary }}</text>
          </view>
        </view>

        <!-- 指标对比 -->
        <view class="section-card">
          <view class="card-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            <text>核心指标</text>
          </view>
          
          <view class="metrics-list">
            <view v-for="(m, i) in metrics" :key="i" class="metric-row">
              <view class="metric-info">
                <text class="metric-name">{{ m.name }}</text>
                <text class="metric-score" :class="m.score >= m.std ? 'positive' : 'negative'">{{ m.score }}%</text>
              </view>
              <view class="metric-bar">
                <view class="bar-bg"></view>
                <view class="bar-fill" :style="{ width: m.score + '%' }" :class="m.score >= m.std ? 'positive' : 'negative'"></view>
                <view class="bar-marker" :style="{ left: m.std + '%' }"></view>
              </view>
            </view>
          </view>
        </view>

        <!-- 成分详情 -->
        <view class="section-card">
          <view class="card-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            <text>成分分析</text>
          </view>

          <view class="ingredients-section" v-if="result.good_ingredients?.length">
            <text class="section-label positive">优质成分</text>
            <view class="tags-wrap">
              <view v-for="(ing, i) in result.good_ingredients" :key="i" class="tag positive">{{ ing.name }}</view>
            </view>
          </view>

          <view class="ingredients-section" v-if="result.concerning_ingredients?.length">
            <text class="section-label negative">警惕成分</text>
            <view class="tags-wrap">
              <view v-for="(ing, i) in result.concerning_ingredients" :key="i" class="tag negative">{{ ing.name }}</view>
            </view>
          </view>
        </view>

        <!-- 操作按钮 -->
        <view class="result-actions">
          <view class="btn-primary" @click="handleExport">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <text>保存报告</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 确认弹窗 -->
    <up-action-sheet :show="showVerifySheet" @close="showVerifySheet = false" title="确认配料">
      <view class="sheet-content">
        <view class="confirm-tags">
          <view v-for="(tag, i) in ingredientTags" :key="i" class="confirm-tag">
            <text>{{ tag }}</text>
            <view class="tag-close" @click="deleteTag(i)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </view>
          </view>
        </view>
        <view class="sheet-action">
          <view class="btn-primary full" @click="startAnalyze">开始分析</view>
        </view>
      </view>
    </up-action-sheet>

    <!-- 输入弹窗 -->
    <up-popup :show="showInputPopup" @close="showInputPopup = false" mode="bottom" round="16">
      <view class="input-popup">
        <view class="popup-header">
          <text class="popup-title">手动输入配料</text>
          <view class="popup-close" @click="showInputPopup = false">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </view>
        </view>
        <view class="popup-body">
          <textarea 
            v-model="rawInputText"
            class="input-field"
            placeholder="请输入配料内容，用逗号分隔..."
            :maxlength="500"
          ></textarea>
          <text class="input-tip">示例：鸡肉, 大米, 玉米, 鱼油</text>
        </view>
        <view class="popup-footer">
          <view class="btn-primary full" @click="handleTextInput">确认</view>
        </view>
      </view>
    </up-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { request } from '@/utils/request';

const pageState = ref<'home' | 'loading' | 'result'>('home');
const result = ref<any>(null);
const ingredientTags = ref<string[]>([]);
const showVerifySheet = ref(false);
const showInputPopup = ref(false);
const rawInputText = ref('');
const loadingText = ref('');

const metrics = ref([
  { name: '蛋白质量', score: 88, std: 65 },
  { name: '成分透明度', score: 94, std: 70 },
  { name: '添加剂含量', score: 35, std: 85 },
  { name: '安全指数', score: 100, std: 55 }
]);

const handleCamera = () => {
  loadingText.value = '识别配料表中...';
  pageState.value = 'loading';
  
  setTimeout(() => {
    ingredientTags.value = ["新鲜鸡肉", "三文鱼粉", "诱食剂", "大米", "南瓜"];
    pageState.value = 'home';
    showVerifySheet.value = true;
  }, 1500);
};

const startAnalyze = async () => {
  showVerifySheet.value = false;
  loadingText.value = '分析中...';
  pageState.value = 'loading';
  
  try {
    const data = await request({
      url: '/api/analyze/text',
      method: 'POST',
      data: { ingredients_text: ingredientTags.value.join('、') }
    });
    result.value = data;
    pageState.value = 'result';
  } catch (e) {
    uni.showToast({ title: '分析失败', icon: 'none' });
    pageState.value = 'home';
  }
};

const handleTextInput = () => {
  if (!rawInputText.value.trim()) {
    uni.showToast({ title: '请输入配料', icon: 'none' });
    return;
  }
  ingredientTags.value = rawInputText.value.split(/[、,，\s]+/).filter(Boolean);
  showInputPopup.value = false;
  rawInputText.value = '';
  showVerifySheet.value = true;
};

const getScoreLevel = (score: number) => {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  return 'concern';
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return '优秀';
  if (score >= 60) return '良好';
  return '需注意';
};

const reset = () => { pageState.value = 'home'; result.value = null; };
const deleteTag = (i: number) => { ingredientTags.value.splice(i, 1); };
const handleExport = () => { uni.showToast({ title: '已保存', icon: 'success' }); };
const toHistory = () => { uni.showToast({ title: '开发中', icon: 'none' }); };
const showTip = (msg: string) => { uni.showToast({ title: msg + '开发中', icon: 'none' }); };
</script>

<style lang="scss" scoped>
// 专业配色
$bg: #FAFAFA;
$card: #FFFFFF;
$primary: #1A1A2E;
$accent: #E07A5F;
$positive: #3D9970;
$negative: #E07A5F;
$text: #1A1A2E;
$text-secondary: #6B7280;
$border: #E5E7EB;
$radius: 16rpx;

.app-container {
  min-height: 100vh;
  background: $bg;
  color: $text;
}

/* === 首页 === */
.home-view {
  padding: 60rpx 40rpx;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60rpx;
  
  .logo-area {
    display: flex;
    align-items: center;
    gap: 16rpx;
    
    .logo-mark {
      width: 36rpx;
      height: 36rpx;
      background: $accent;
      border-radius: 8rpx;
    }
    
    .logo-text {
      font-size: 36rpx;
      font-weight: 700;
      letter-spacing: 1rpx;
    }
  }
  
  .user-avatar {
    width: 72rpx;
    height: 72rpx;
    background: $card;
    border: 1px solid $border;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-secondary;
  }
}

.hero-section {
  margin-bottom: 60rpx;
  
  .hero-title {
    font-size: 48rpx;
    font-weight: 700;
    display: block;
    margin-bottom: 12rpx;
  }
  
  .hero-subtitle {
    font-size: 28rpx;
    color: $text-secondary;
  }
}

.main-action-card {
  background: $primary;
  border-radius: $radius;
  padding: 48rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30rpx;
  
  .action-content {
    display: flex;
    align-items: center;
    gap: 28rpx;
    
    .action-icon-wrap {
      width: 80rpx;
      height: 80rpx;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    
    .action-text {
      .action-title { font-size: 32rpx; font-weight: 600; color: #fff; display: block; }
      .action-desc { font-size: 24rpx; color: rgba(255,255,255,0.6); margin-top: 8rpx; display: block; }
    }
  }
  
  .action-arrow { color: rgba(255,255,255,0.4); }
}

.secondary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  margin-bottom: 80rpx;
  
  .grid-item {
    background: $card;
    border: 1px solid $border;
    border-radius: $radius;
    padding: 40rpx 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rpx;
    
    .item-icon { color: $accent; }
    .item-label { font-size: 24rpx; font-weight: 500; color: $text; }
  }
}

.footer-info {
  text-align: center;
  font-size: 24rpx;
  color: $text-secondary;
}

/* === 加载态 === */
.loading-view {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: $bg;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.loader {
  position: relative;
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 40rpx;
  
  .loader-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4rpx solid transparent;
    border-top-color: $accent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    
    &.delay { animation-delay: 0.5s; opacity: 0.5; }
  }
}

@keyframes spin { to { transform: rotate(360deg); } }

.loading-text {
  font-size: 28rpx;
  color: $text-secondary;
}

/* === 结果页 === */
.result-view {
  height: 100vh;
  background: $bg;
}

.result-header {
  padding: 40rpx;
  
  .back-btn {
    display: flex;
    align-items: center;
    gap: 8rpx;
    font-size: 28rpx;
    color: $text-secondary;
  }
}

.result-body {
  padding: 0 40rpx 60rpx;
}

.score-section {
  display: flex;
  align-items: center;
  gap: 40rpx;
  margin-bottom: 40rpx;
  
  .score-circle {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.excellent { background: $positive; }
    &.good { background: $accent; }
    &.concern { background: $negative; }
    
    .score-value { font-size: 44rpx; font-weight: 700; color: #fff; }
  }
  
  .score-info {
    flex: 1;
    .score-level { font-size: 32rpx; font-weight: 700; display: block; margin-bottom: 8rpx; }
    .score-summary { font-size: 26rpx; color: $text-secondary; line-height: 1.5; }
  }
}

.section-card {
  background: $card;
  border: 1px solid $border;
  border-radius: $radius;
  padding: 40rpx;
  margin-bottom: 30rpx;
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 12rpx;
    font-size: 28rpx;
    font-weight: 600;
    margin-bottom: 30rpx;
    color: $text;
  }
}

.metric-row {
  margin-bottom: 32rpx;
  &:last-child { margin-bottom: 0; }
  
  .metric-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12rpx;
    
    .metric-name { font-size: 26rpx; color: $text-secondary; }
    .metric-score { font-size: 26rpx; font-weight: 600; &.positive { color: $positive; } &.negative { color: $negative; } }
  }
  
  .metric-bar {
    height: 12rpx;
    position: relative;
    
    .bar-bg { position: absolute; width: 100%; height: 100%; background: #F0F0F0; border-radius: 6rpx; }
    .bar-fill { position: absolute; height: 100%; border-radius: 6rpx; transition: width 0.8s; &.positive { background: $positive; } &.negative { background: $negative; } }
    .bar-marker { position: absolute; top: -4rpx; bottom: -4rpx; width: 3rpx; background: $primary; }
  }
}

.ingredients-section {
  margin-bottom: 24rpx;
  &:last-child { margin-bottom: 0; }
  
  .section-label {
    font-size: 24rpx;
    font-weight: 600;
    display: block;
    margin-bottom: 16rpx;
    &.positive { color: $positive; }
    &.negative { color: $negative; }
  }
  
  .tags-wrap { display: flex; flex-wrap: wrap; gap: 12rpx; }
  
  .tag {
    padding: 10rpx 20rpx;
    border-radius: 8rpx;
    font-size: 24rpx;
    font-weight: 500;
    
    &.positive { background: rgba(61, 153, 112, 0.1); color: $positive; }
    &.negative { background: rgba(224, 122, 95, 0.1); color: $negative; }
  }
}

.result-actions {
  margin-top: 40rpx;
}

.btn-primary {
  background: $primary;
  color: #fff;
  height: 100rpx;
  border-radius: $radius;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  font-size: 28rpx;
  font-weight: 600;
  
  &.full { width: 100%; }
}

/* === 弹窗 === */
.sheet-content {
  padding: 40rpx;
  
  .confirm-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
    margin-bottom: 40rpx;
  }
  
  .confirm-tag {
    background: #F5F5F5;
    padding: 16rpx 24rpx;
    border-radius: 8rpx;
    font-size: 26rpx;
    display: flex;
    align-items: center;
    gap: 16rpx;
    
    .tag-close { color: $text-secondary; }
  }
}

.input-popup {
  padding: 40rpx;
  background: #fff;
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    
    .popup-title { font-size: 32rpx; font-weight: 700; }
    .popup-close { color: $text-secondary; }
  }
  
  .popup-body {
    .input-field {
      width: 100%;
      height: 200rpx;
      background: #F5F5F5;
      border-radius: 12rpx;
      padding: 24rpx;
      font-size: 28rpx;
      box-sizing: border-box;
    }
    
    .input-tip {
      display: block;
      margin-top: 16rpx;
      font-size: 24rpx;
      color: $text-secondary;
    }
  }
  
  .popup-footer {
    margin-top: 40rpx;
  }
}
</style>
