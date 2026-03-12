# CODEBUDDY.md

This file provides guidance to CodeBuddy Code when working with code in this repository.

# 项目概述
这是一个 Web 全栈低代码可视化搭建平台，采用 Monorepo + Turborepo 架构，前端使用 Vue 3.4+ + TypeScript，后端使用 NestJS 11.x。

# 常用开发命令

## 开发命令
- `pnpm dev` - 启动所有应用的开发服务器
- `pnpm dev:web` - 仅启动前端开发服务器  
- `pnpm dev:server` - 仅启动后端开发服务器

## 构建命令
- `pnpm build` - 构建所有应用
- `pnpm build:shared` - 仅构建共享包

## 代码质量命令
- `pnpm lint` - ESLint 检查和自动修复
- `pnpm type-check` - TypeScript 类型检查
- `pnpm format` - Prettier 格式化代码

## 清理命令
- `pnpm clean` - 清理构建产物和 node_modules

## 其他命令
- `pnpm prepare` - 安装 Git hooks（自动执行）

# 代码架构

## 整体结构
项目采用 Monorepo 架构，使用 Turborepo 管理多个包和应用：

```
apps/
├── web/          # Vue3 前端应用
└── server/       # NestJS 后端服务

packages/
├── shared/       # 共享类型和工具
├── materials/    # 组件物料库
└── generator/    # 代码生成器
```

## 前端架构 (apps/web)
- **框架**: Vue 3.5+ + TypeScript 5.x
- **构建工具**: Vite 6.x
- **状态管理**: Pinia 3.x
- **路由**: Vue Router 5.x
- **样式**: TailwindCSS 4.x
- **拖拽**: vue-draggable-plus + sortablejs
- **图表**: ECharts 5.x
- **UI组件**: @headlessui/vue

核心文件：
- `src/main.ts` - Vue 3 应用初始化，集成 Pinia 和 Router
- `src/App.vue` - 根组件，使用 RouterView
- `src/editor/` - 编辑器核心（待开发）

## 后端架构 (apps/server)
- **框架**: NestJS 11.x
- **数据库**: MySQL 8.x + Prisma 6.x ORM
- **认证**: JWT + Passport
- **API前缀**: `/api`

核心模块结构：
```
src/
├── main.ts               # 应用入口，配置全局前缀、验证管道、CORS
├── app.module.ts         # 应用主模块，集成所有业务模块和 Prisma
├── modules/             # 业务模块
│   ├── auth/            # 认证模块
│   ├── user/            # 用户模块
│   ├── project/         # 项目模块
│   └── template/        # 模板模块
└── prisma/              # 数据库层
    └── schema.prisma    # Prisma 数据模型定义
```

数据模型包括：User、Project、Template 等实体。

## 技术栈特点
- **Node.js**: ≥22.17.0
- **包管理器**: pnpm ≥10.32.0
- **代码质量**: ESLint + Prettier + Git Hooks
- **类型安全**: 前后端共享 TypeScript 类型定义
- **模块化**: 通过 packages/shared 实现前后端类型共享

# 开发环境要求
- Node.js ≥22.17.0
- pnpm ≥10.32.0
- MySQL 8.x（用于后端开发）

# 开发最佳实践
- Task tool - 用于创建任务跟踪复杂修复工作，避免遗漏步骤
- EnterPlanMode - 在开始重大实现任务前使用，获得用户对齐后再编码  
- code-reviewer agent - 用于全面代码审查，发现安全漏洞和最佳实践问题
- 按任务分别提交 - 使用 TaskCreate/TaskUpdate 跟踪，避免大批量提交
- TypeScript 编译错误 - 注意正则表达式转义字符和语法错误（如 ++n 缺少分号）
- Winston 日志配置 - 需要明确 TransportInstances 类型避免类型兼容性问题
- 环境变量验证 - 使用 Joi 进行配置验证，避免运行时错误
- pre-commit hook - lint 检查失败会阻止提交，需要先解决所有错误
- 跨平台兼容 - Windows 和 Mac 的路径和环境变量语法差异需要注意

# 项目现状
- ✅ 基础架构搭建完成（Monorepo、构建配置）
- ✅ 前后端框架就绪（Vue 3、NestJS）
- ✅ 数据库模型和认证框架就位
- ✅ 物料库组件（13个组件：Button, Text, Image, Input, Select, Container, Row, Col, Card, Table, Tag, LineChart, BarChart, PieChart）
- ✅ 编辑器核心功能（画布、组件树、属性面板、动态组件渲染）
- 🔄 功能完善中

# 常见问题与解决方案

## Git 提交问题

### Windows 中文提交信息问题
**问题**：使用 `git commit -m "中文描述"` 时报错 `error: pathspec 'xxx' did not match any file(s) known to git`

**解决方案**：使用 `--file` 参数从文件读取提交信息
```bash
# 创建提交信息文件
echo "feat: 提交描述" > commit_msg.txt
# 使用 --file 提交
git commit --file=commit_msg.txt
# 提交后删除临时文件
rm commit_msg.txt
```

## TypeScript 与构建问题

### 导入路径错误
**问题**：`@lowcode/shared/types` 路径不存在

**解决方案**：修改为正确的路径 `@lowcode/shared`
```typescript
// 错误
import type { ComponentInstance } from '@lowcode/shared/types'
// 正确
import type { ComponentInstance } from '@lowcode/shared'
```

### tsconfig 路径映射错误
**问题**：路径映射指向 src 目录而非 dist 目录

**解决方案**：修改 tsconfig.json 中的 paths 配置
```json
{
  "compilerOptions": {
    "paths": {
      "@lowcode/shared": ["../shared/dist/index.d.ts"],
      "@lowcode/shared/*": ["../shared/dist/*.d.ts"]
    }
  }
}
```

### Vue 组件类型找不到
**问题**：`ImgHTMLAttributes` 类型找不到

**解决方案**：在 tsconfig.json 中添加 Vue 类型
```json
{
  "compilerOptions": {
    "types": ["vue"]
  }
}
```

### 样式属性命名问题
**问题**：Vue style 中使用 camelCase 如 `objectFit` 无效

**解决方案**：使用 kebab-case
```vue
<!-- 错误 -->
<img :style="{ objectFit: 'cover' }">
<!-- 正确 -->
<img :style="{ 'object-fit': 'cover' }">
```

### peerDependencies 场景下的类型定义
**问题**：物料库包作为 web 的 peerDependencies，不希望添加 vue 依赖导致版本不一致

**解决方案**：使用具体字面量联合类型而非导入 Vue 类型
```typescript
// 错误 - 需要导入 Vue 类型
interface Props {
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}
// 需要这样直接定义，不依赖 Vue 类型推导
```

## 物料库组件规范

### 文件结构
每个组件目录下应该是 `index.vue` 而非 `index.ts`

### 动态组件加载
使用 `defineAsyncComponent` + 动态 import 实现按需加载
```typescript
import { defineAsyncComponent } from 'vue'

const componentPaths: Record<string, string> = {
  Button: './basic/Button/index.vue',
}

const componentCache: Record<string, Component> = {}

export function getComponentAsync(name: string): Component | undefined {
  if (componentCache[name]) return componentCache[name]
  const path = componentPaths[name]
  if (!path) return undefined
  const asyncComp = defineAsyncComponent(() => import(/* @vite-ignore */ path))
  componentCache[name] = asyncComp
  return asyncComp
}
```

### 图表组件内存泄漏
**问题**：ECharts 实例未正确销毁导致内存泄漏

**解决方案**：在组件卸载时调用 dispose
```typescript
import { onUnmounted } from 'vue'

const chartRef = ref<HTMLElement>()
let chartInstance: ECharts | null = null

onMounted(() => {
  chartInstance = echarts.init(chartRef.value)
})

onUnmounted(() => {
  chartInstance?.dispose()
  chartInstance = null
})
```