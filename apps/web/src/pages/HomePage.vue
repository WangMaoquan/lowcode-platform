<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleCreateProject = () => {
  router.push('/editor')
}

const handleOpenProject = () => {
  router.push('/projects')
}

const features = [
  {
    icon: '🎨',
    title: '可视化拖拽',
    description: '通过拖拽即可快速构建页面，所见即所得'
  },
  {
    icon: '📦',
    title: '丰富物料库',
    description: '内置多种基础组件和业务组件，满足各类场景'
  },
  {
    icon: '⚡',
    title: '高效生成',
    description: '一键生成可运行代码，快速落地你的想法'
  },
  {
    icon: '🔧',
    title: '灵活扩展',
    description: '支持自定义组件，扩展平台能力'
  }
]

const steps = [
  { number: '01', title: '创建项目', desc: '新建一个空白项目或选择模板' },
  { number: '02', title: '拖拽组件', desc: '从物料库拖拽组件到画布' },
  { number: '03', title: '配置属性', desc: '设置组件样式和数据属性' },
  { number: '04', title: '导出代码', desc: '一键生成 Vue/React 代码' }
]
</script>

<template>
  <div class="min-h-screen bg-dark-bg text-dark-text font-sans">
    <!-- 导航栏 -->
    <nav class="fixed top-0 left-0 right-0 z-100 py-4 bg-[rgba(15,15,20,0.8)] backdrop-blur-xl border-b border-dark-border">
      <div class="w-full px-8 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-2xl text-dark-accent">◈</span>
          <span class="font-display text-xl font-semibold">LowCode</span>
        </div>
        <div class="flex items-center gap-8">
          <a href="#features" class="text-dark-text-secondary text-sm hover:text-dark-text transition-colors duration-200 no-underline">特性</a>
          <a href="#how-it-works" class="text-dark-text-secondary text-sm hover:text-dark-text transition-colors duration-200 no-underline">使用流程</a>
          <button
            class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer bg-transparent text-dark-text border border-dark-border hover:bg-dark-surface-hover"
            @click="handleOpenProject"
          >我的项目</button>
          <button
            class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer bg-dark-accent text-white hover:bg-dark-accent-hover hover:shadow-accent-glow"
            @click="handleCreateProject"
          >开始创建</button>
        </div>
      </div>
    </nav>

    <!-- 英雄区域 -->
    <section class="relative min-h-screen flex items-center justify-center px-8 py-24 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute inset-0 bg-grid-pattern"></div>
        <div class="absolute rounded-full blur-3xl w-[600px] h-[600px] bg-indigo-500/15 -top-50 -left-50"></div>
        <div class="absolute rounded-full blur-3xl w-[500px] h-[500px] bg-violet-500/10 -bottom-25 -right-25"></div>
      </div>
      <div class="relative text-center max-w-[800px]">
        <div class="inline-block px-4 py-2 bg-dark-surface border border-dark-border rounded-full text-sm text-dark-accent mb-8">✨ 现代化的低代码平台</div>
        <h1 class="font-display text-[4rem] font-bold leading-tight mb-6">
          <span class="block">快速构建</span>
          <span class="block bg-gradient-to-r from-dark-accent to-violet-400 bg-clip-text text-transparent">可视化应用</span>
        </h1>
        <p class="text-lg text-dark-text-secondary leading-relaxed mb-10">
          无需编码，通过拖拽组件即可快速搭建页面。<br>
          丰富的组件库，灵活的扩展能力，让开发更高效。
        </p>
        <div class="flex gap-4 justify-center mb-12">
          <button
            class="flex items-center gap-2 px-7 py-3.5 rounded-lg text-base font-medium transition-all duration-300 cursor-pointer border-none bg-dark-accent text-white hover:bg-dark-accent-hover hover:shadow-accent-glow hover:-translate-y-1 group"
            @click="handleCreateProject"
          >
            <span>立即开始</span>
            <span class="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
          <button
            class="flex items-center gap-2 px-7 py-3.5 rounded-lg text-base font-medium transition-all duration-300 cursor-pointer bg-dark-surface text-dark-text border border-dark-border hover:bg-dark-surface-hover hover:-translate-y-1"
            @click="handleOpenProject"
          >
            <span>查看项目</span>
          </button>
        </div>
        <div class="flex justify-center gap-8 px-6 py-6 bg-dark-surface rounded-xl border border-dark-border">
          <div class="text-center">
            <span class="block font-display text-2xl font-semibold text-dark-accent">13+</span>
            <span class="text-sm text-dark-text-secondary">组件库</span>
          </div>
          <div class="w-px bg-dark-border"></div>
          <div class="text-center">
            <span class="block font-display text-2xl font-semibold text-dark-accent">秒级</span>
            <span class="text-sm text-dark-text-secondary">生成代码</span>
          </div>
          <div class="w-px bg-dark-border"></div>
          <div class="text-center">
            <span class="block font-display text-2xl font-semibold text-dark-accent">100%</span>
            <span class="text-sm text-dark-text-secondary">可定制</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 特性区域 -->
    <section id="features" class="px-8 py-24 bg-dark-surface">
      <div class="max-w-[1200px] mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-display text-[2.5rem] font-semibold mb-4">平台特性</h2>
          <p class="text-lg text-dark-text-secondary">强大的功能，助力高效开发</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="p-8 bg-dark-bg border border-dark-border rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-dark-accent hover:shadow-card-hover"
          >
            <div class="text-[2.5rem] mb-4">{{ feature.icon }}</div>
            <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-dark-text-secondary leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用流程 -->
    <section id="how-it-works" class="px-8 py-24">
      <div class="max-w-[1200px] mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-display text-[2.5rem] font-semibold mb-4">使用流程</h2>
          <p class="text-lg text-dark-text-secondary">四步轻松创建你的应用</p>
        </div>
        <div class="flex justify-center items-start gap-8 flex-wrap">
          <div
            v-for="(step, index) in steps"
            :key="step.number"
            class="flex flex-col items-center text-center relative flex-1 min-w-[200px] max-w-[250px]"
          >
            <div class="font-display text-[3rem] font-bold text-dark-accent opacity-30 mb-4">{{ step.number }}</div>
            <div class="p-6 bg-dark-surface border border-dark-border rounded-xl w-full">
              <h3 class="text-lg font-semibold mb-2">{{ step.title }}</h3>
              <p class="text-sm text-dark-text-secondary">{{ step.desc }}</p>
            </div>
            <div v-if="index < steps.length - 1" class="absolute -right-4 top-12 text-2xl text-dark-border">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 区域 -->
    <section class="px-8 py-24 bg-gradient-to-b from-transparent to-indigo-500/5">
      <div class="text-center max-w-[600px] mx-auto">
        <h2 class="font-display text-[2.5rem] font-semibold mb-4">准备好开始了吗？</h2>
        <p class="text-lg text-dark-text-secondary mb-8">立即创建你的第一个项目，体验低代码开发的便捷</p>
        <button
          class="px-10 py-4 bg-dark-accent text-white border-none rounded-lg text-base font-medium cursor-pointer transition-all duration-300 hover:bg-dark-accent-hover hover:shadow-accent-glow hover:-translate-y-1"
          @click="handleCreateProject"
        >创建新项目</button>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="px-8 py-8 border-t border-dark-border">
      <div class="max-w-[1200px] mx-auto flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-xl text-dark-accent">◈</span>
          <span class="font-display text-xl font-semibold">LowCode</span>
        </div>
        <p class="text-sm text-dark-text-secondary">© 2026 LowCode Platform. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* 网格背景 - TailwindCSS 无法完全实现这种复杂的 background-image */
.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* 响应式 */
@media (max-width: 1024px) {
  .lg\:grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .step-arrow {
    display: none;
  }
}

@media (max-width: 768px) {
  .text-\[4rem\] {
    font-size: 2.5rem;
  }

  .gap-8 {
    gap: 1rem;
  }

  .nav-link {
    display: none;
  }

  .lg\:grid-cols-4,
  .grid-cols-1,
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .flex {
    flex-direction: column;
  }

  .gap-8.gap-4 {
    gap: 1rem;
  }

  .w-px {
    width: 50px;
    height: 1px;
  }

  .max-w-\[1200px\] {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
