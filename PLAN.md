# 低代码可视化搭建平台 - 项目计划

## 一、项目概述

- **项目名称**：Lowcode Platform（可视化低代码搭建平台）
- **项目类型**：Web 全栈应用
- **核心功能**：通过拖拽式可视化编辑器，用户可以快速搭建页面，生成 Vue3 + TypeScript 代码
- **目标用户**：前端开发者、非技术人员、业务人员

---

## 二、技术栈方案

### 2.1 技术选型

| 类别 | 技术 | 版本 |
|-----|------|------|
| **前端框架** | Vue | 3.4+ |
| **前端语言** | TypeScript | 5.x |
| **构建工具** | Vite | 5.x |
| **样式方案** | TailwindCSS | 3.4+ |
| **无样式组件** | Headless UI | 1.x |
| **状态管理** | Pinia | 2.x |
| **路由** | Vue Router | 4.x |
| **拖拽** | sortablejs + vue-draggable-plus | 1.x |
| **图表** | ECharts | 5.x |
| **HTTP** | Axios | 1.x |
| **图标** | @iconify/vue | 4.x |
| **后端框架** | NestJS | 10.x |
| **数据库** | MySQL | 8.x |
| **ORM** | Prisma | 5.x |
| **包管理** | pnpm | 8.x |
| **构建编排** | Turborepo | 2.x |

### 2.2 Monorepo 结构

```
lowcode-platform/
├── apps/
│   ├── web/          # 前端应用
│   └── server/       # NestJS 后端服务
├── packages/
│   ├── shared/       # 共享类型和工具（打包为 ESM + CJS）
│   ├── materials/    # 组件物料库（源码引用）
│   └── generator/    # 代码生成器（源码引用）
├── docs/             # 文档
└── turbo.json       # Turborepo 配置
```

---

## 三、项目结构详细设计

### 3.1 前端项目结构（apps/web）

```
apps/web/
├── src/
│   ├── api/                      # API 请求
│   │   ├── index.ts
│   │   ├── auth.ts
│   │   └── project.ts
│   ├── assets/                   # 静态资源
│   │   └── styles/
│   │       ├── main.scss
│   │       └── variables.scss
│   ├── components/               # 公共组件
│   │   ├── common/              # 通用组件
│   │   │   ├── AppIcon.vue
│   │   │   ├── AppButton.vue
│   │   │   └── AppModal.vue
│   │   └── layout/              # 布局组件
│   │       ├── AppHeader.vue
│   │       ├── AppSidebar.vue
│   │       └── AppLayout.vue
│   ├── editor/                   # 编辑器核心
│   │   ├── index.vue            # 编辑器主页面
│   │   ├── canvas/              # 画布区域
│   │   │   ├── EditorCanvas.vue
│   │   │   ├── CanvasItem.vue
│   │   │   └── CanvasDropZone.vue
│   │   ├── component-tree/      # 组件树面板
│   │   │   ├── ComponentTree.vue
│   │   │   └── TreeNode.vue
│   │   ├── property-panel/     # 属性配置面板
│   │   │   ├── PropertyPanel.vue
│   │   │   ├── BasicProperties.vue
│   │   │   ├── StyleProperties.vue
│   │   │   └── EventProperties.vue
│   │   ├── toolbar/            # 工具栏
│   │   │   ├── EditorToolbar.vue
│   │   │   ├── ToolbarButton.vue
│   │   │   └── ToolbarDropdown.vue
│   │   ├── context-menu/        # 右键菜单
│   │   │   └── ContextMenu.vue
│   │   └── use/                # 编辑器组合式函数
│   │       ├── useEditor.ts
│   │       ├── useDragDrop.ts
│   │       ├── useHistory.ts
│   │       └── useSelection.ts
│   ├── pages/                   # 页面
│   │   ├── HomePage.vue        # 首页
│   │   ├── EditorPage.vue      # 编辑器页
│   │   ├── PreviewPage.vue     # 预览页
│   │   └── ProjectListPage.vue # 项目列表页
│   ├── router/                  # 路由配置
│   │   └── index.ts
│   ├── stores/                  # Pinia 状态
│   │   ├── editor.ts           # 编辑器状态
│   │   ├── user.ts             # 用户状态
│   │   └── project.ts          # 项目状态
│   ├── utils/                   # 工具函数
│   │   ├── common.ts
│   │   └── validation.ts
│   ├── App.vue
│   └── main.ts
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 3.2 后端项目结构（apps/server）

```
apps/server/
├── src/
│   ├── config/                   # 配置
│   │   └── index.ts
│   ├── modules/                  # 业务模块
│   │   ├── auth/                # 认证模块
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       └── register.dto.ts
│   │   ├── user/                # 用户模块
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.module.ts
│   │   │   └── user.entity.ts
│   │   ├── project/             # 项目模块
│   │   │   ├── project.controller.ts
│   │   │   ├── project.service.ts
│   │   │   ├── project.module.ts
│   │   │   ├── project.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-project.dto.ts
│   │   │       └── update-project.dto.ts
│   │   └── template/            # 模板模块
│   │       ├── template.controller.ts
│   │       ├── template.service.ts
│   │       ├── template.module.ts
│   │       └── template.entity.ts
│   ├── common/                   # 公共模块
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── public.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   └── pipes/
│   │       └── validation.pipe.ts
│   ├── prisma/                   # Prisma
│   │   └── schema.prisma
│   ├── app.module.ts
│   └── main.ts
├── nest-cli.json
├── tsconfig.json
├── package.json
└── .env.example
```

### 3.3 共享包结构（packages/shared）

```
packages/shared/
├── src/
│   ├── types/                    # 类型定义
│   │   ├── user.ts              # 用户类型
│   │   ├── project.ts           # 项目类型
│   │   ├── component.ts         # 组件类型
│   │   ├── api.ts               # API 类型
│   │   └── index.ts
│   ├── schemas/                  # Zod 校验 Schema
│   │   ├── user.schema.ts
│   │   ├── project.schema.ts
│   │   └── index.ts
│   ├── utils/                    # 工具函数
│   │   ├── format.ts
│   │   ├── crypto.ts
│   │   └── index.ts
│   └── index.ts                 # 主入口
├── dist/                         # 打包产物
│   ├── index.js                  # CJS
│   ├── index.mjs                 # ESM
│   └── index.d.ts                # 类型声明
├── package.json
├── tsup.config.ts
├── tsconfig.json
└── README.md
```

### 3.4 组件物料库结构（packages/materials）

```
packages/materials/
├── src/
│   ├── basic/                    # 基础组件
│   │   ├── Button/
│   │   │   ├── index.vue
│   │   │   ├── schema.ts        # 属性 Schema
│   │   │   └── preview.vue     # 预览组件
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Switch/
│   │   ├── Radio/
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── basic.ts            # 统一导出
│   ├── layout/                  # 布局组件
│   │   ├── Container/
│   │   ├── Grid/
│   │   ├── Card/
│   │   ├── Tabs/
│   │   ├── Collapse/
│   │   ├── index.ts
│   │   └── layout.ts
│   ├── form/                    # 表单组件
│   │   ├── Form/
│   │   ├── DatePicker/
│   │   ├── Upload/
│   │   ├── RichText/
│   │   ├── index.ts
│   │   └── form.ts
│   ├── display/                 # 展示组件
│   │   ├── Table/
│   │   ├── Descriptions/
│   │   ├── Statistic/
│   │   ├── Image/
│   │   ├── index.ts
│   │   └── display.ts
│   ├── chart/                   # 图表组件
│   │   ├── BarChart/
│   │   ├── LineChart/
│   │   ├── PieChart/
│   │   ├── Gauge/
│   │   ├── index.ts
│   │   └── chart.ts
│   ├── registry.ts             # 组件注册器
│   ├── index.ts                # 主入口
│   ├── useMaterials.ts        # 组合式函数
│   └── env.d.ts
├── package.json
└── tsconfig.json
```

### 3.5 代码生成器结构（packages/generator）

```
packages/generator/
├── src/
│   ├── templates/                # 代码模板
│   │   ├── vue-component.tpl   # Vue 组件模板
│   │   ├── component-import.tpl
│   │   └── schema.tpl
│   ├── parser/                  # Schema 解析
│   │   ├── index.ts
│   │   ├── componentParser.ts
│   │   └── styleParser.ts
│   ├── generator.ts            # 主生成逻辑
│   ├── vueGenerator.ts         # Vue 代码生成
│   ├── cssGenerator.ts         # CSS 生成
│   └── index.ts                # 入口
├── package.json
└── tsconfig.json
```

---

## 四、组件物料清单

### 4.1 基础组件（6 个）

| 组件名 | 英文名 | 可配置属性 |
|-------|--------|-----------|
| 按钮 | Button | text, type, size, disabled, loading, icon |
| 输入框 | Input | placeholder, disabled, clearable, maxlength, prefix, suffix |
| 下拉选择 | Select | options, multiple, disabled, filterable, placeholder |
| 开关 | Switch | text, disabled, size |
| 单选框 | Radio | options, disabled, buttonStyle |
| 复选框 | Checkbox | options, disabled, checkAll |

### 4.2 布局组件（5 个）

| 组件名 | 英文名 | 可配置属性 |
|-------|--------|-----------|
| 容器 | Container | background, padding, border |
| 栅格 | Grid | columns, gutter, responsive |
| 卡片 | Card | title, shadow, bordered, padding |
| 标签页 | Tabs | tabs, type, animated |
| 折叠面板 | Collapse | panels, accordion |

### 4.3 表单组件（4 个）

| 组件名 | 英文名 | 可配置属性 |
|-------|--------|-----------|
| 表单 | Form | labelWidth, labelPosition, rules |
| 日期选择器 | DatePicker | type, format, disabledDate, placeholder |
| 上传 | Upload | action, accept, maxCount, autoUpload |
| 富文本 | RichText | placeholder, height, toolbar |

### 4.4 展示组件（4 个）

| 组件名 | 英文名 | 可配置属性 |
|-------|--------|-----------|
| 表格 | Table | columns, data, pagination, stripe |
| 描述列表 | Descriptions | column, border, data |
| 统计数值 | Statistic | value, prefix, suffix, precision |
| 图片 | Image | src, preview, lazy, fit |

### 4.5 图表组件（4 个）

| 组件名 | 英文名 | 可配置属性 |
|-------|--------|-----------|
| 柱状图 | BarChart | data, xKey, yKey, color, stacked |
| 折线图 | LineChart | data, xKey, yKey, smooth, area |
| 饼图 | PieChart | data, nameKey, valueKey, radius |
| 仪表盘 | Gauge | value, min, max, segments |

---

## 五、编辑器核心设计

### 5.1 数据结构

```typescript
// 页面 Schema
interface PageSchema {
  id: string
  name: string
  components: ComponentInstance[]
  styles: Record<string, string>
}

// 组件实例
interface ComponentInstance {
  id: string
  name: string           // 组件名称，如 'Button'
  label: string         // 显示标签
  props: Record<string, any>  // 属性配置
  styles: Record<string, any> // 样式配置
  events: Record<string, string> // 事件处理
  children?: ComponentInstance[]  // 子组件
  slot?: string         # 插槽名称
}

// 组件定义
interface ComponentDefinition {
  name: string
  label: string
  category: 'basic' | 'layout' | 'form' | 'display' | 'chart'
  propsSchema: Record<string, PropSchema>
  defaultProps: Record<string, any>
  preview: Component
  render: Component
}

// 属性 Schema
interface PropSchema {
  type: 'string' | 'number' | 'boolean' | 'select' | 'array' | 'object'
  label: string
  default?: any
  options?: { label: string; value: any }[]
  if?: Record<string, any>  # 条件显示
}
```

### 5.2 编辑器状态

```typescript
interface EditorState {
  // 页面数据
  page: PageSchema

  // 选中状态
  selectedId: string | null

  // 历史记录
  history: PageSchema[]
  historyIndex: number

  // 剪贴板
  clipboard: ComponentInstance | null

  // 拖拽状态
  dragging: {
    type: 'component' | 'sort'
    data: any
  }

  // UI 状态
  showRightPanel: boolean
  showPreview: boolean
}
```

### 5.3 核心功能模块

| 模块 | 功能 |
|-----|------|
| 拖拽引擎 | 组件拖入画布、组件排序、嵌套拖拽 |
| 画布渲染 | 实时渲染组件、选中高亮、辅助线 |
| 属性面板 | 动态表单、属性联动、样式配置 |
| 组件树 | 层级展示、拖拽排序、显示/隐藏 |
| 撤销/重做 | 历史记录管理、状态回滚 |
| 代码生成 | Schema 解析、模板生成、代码预览 |

---

## 六、数据库设计

### 6.1 Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// 用户表
model User {
  id        String    @id @default(uuid())
  username  String    @unique
  password  String
  nickname  String?
  avatar    String?
  email     String?   @unique
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  projects  Project[]

  @@map("users")
}

// 项目表
model Project {
  id          String      @id @default(uuid())
  name        String
  description String?
  schema      Json        // 页面 Schema 存储
  thumbnail   String?     // 缩略图
  isPublic    Boolean     @default(false)
  userId      String
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([userId])
  @@map("projects")
}

// 模板表
model Template {
  id          String    @id @default(uuid())
  name        String
  description String?
  thumbnail   String?
  schema      Json
  category    String    @default("custom")
  isBuiltIn   Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@map("templates")
}
```

### 6.2 数据库表说明

| 表名 | 说明 |
|-----|------|
| users | 用户信息表 |
| projects | 用户项目表 |
| templates | 页面模板表 |

---

## 七、API 设计

### 7.1 认证模块

| 接口 | 方法 | 说明 | 权限 |
|-----|------|------|------|
| /api/auth/register | POST | 用户注册 | 公开 |
| /api/auth/login | POST | 用户登录 | 公开 |
| /api/auth/logout | POST | 退出登录 | 需认证 |

### 7.2 用户模块

| 接口 | 方法 | 说明 | 权限 |
|-----|------|------|------|
| /api/users/profile | GET | 获取当前用户信息 | 需认证 |
| /api/users/profile | PUT | 更新用户信息 | 需认证 |

### 7.3 项目模块

| 接口 | 方法 | 说明 | 权限 |
|-----|------|------|------|
| /api/projects | GET | 获取项目列表 | 需认证 |
| /api/projects | POST | 创建项目 | 需认证 |
| /api/projects/:id | GET | 获取项目详情 | 需认证 |
| /api/projects/:id | PUT | 更新项目 | 需认证 |
| /api/projects/:id | DELETE | 删除项目 | 需认证 |
| /api/projects/:id/publish | POST | 发布项目 | 需认证 |

### 7.4 模板模块

| 接口 | 方法 | 说明 | 权限 |
|-----|------|------|------|
| /api/templates | GET | 获取模板列表 | 公开 |
| /api/templates/:id | GET | 获取模板详情 | 公开 |

---

## 八、开发计划

### 第一阶段：基础搭建（预计 1 周）

| 任务 | 内容 |
|-----|------|
| 1.1 | 初始化 Monorepo 项目结构 |
| 1.2 | 配置 pnpm workspace + Turborepo |
| 1.3 | 搭建前端项目（Vue3 + Vite + TS） |
| 1.4 | 搭建后端项目（NestJS + Prisma） |
| 1.5 | 配置 TailwindCSS + ESLint + Prettier |
| 1.6 | 实现用户注册/登录功能 |

### 第二阶段：编辑器核心（预计 2 周）

| 任务 | 内容 |
|-----|------|
| 2.1 | 实现拖拽引擎（vue-draggable-plus） |
| 2.2 | 开发画布组件（EditorCanvas） |
| 2.3 | 开发组件树面板 |
| 2.4 | 开发属性配置面板（动态表单） |
| 2.5 | 实现撤销/重做功能 |
| 2.6 | 实现右键菜单 |

### 第三阶段：组件物料库（预计 2 周）

| 任务 | 内容 |
|-----|------|
| 3.1 | 搭建组件物料库基础架构 |
| 3.2 | 开发基础组件（6 个） |
| 3.3 | 开发布局组件（5 个） |
| 3.4 | 开发表单组件（4 个） |
| 3.5 | 开发展示组件（4 个） |
| 3.6 | 开发图表组件（4 个） |

### 第四阶段：代码生成（预计 1 周）

| 任务 | 内容 |
|-----|------|
| 4.1 | 设计代码生成器架构 |
| 4.2 | 实现 Schema 解析器 |
| 4.3 | 开发 Vue 组件代码模板 |
| 4.4 | 实现代码预览功能 |
| 4.5 | 实现复制/下载功能 |

### 第五阶段：项目管理和优化（预计 1 周）

| 任务 | 内容 |
|-----|------|
| 5.1 | 实现项目列表管理 |
| 5.2 | 实现模板功能 |
| 5.3 | 性能优化 |
| 5.4 | Bug 修复 |

### 第六阶段：论文撰写（预计 2 周）

| 任务 | 内容 |
|-----|------|
| 6.1 | 整理开发文档 |
| 6.2 | 撰写论文各章节 |
| 6.3 | 格式调整和查重 |

---

## 九、关键难点分析

### 9.1 拖拽引擎

- **难点**：组件嵌套拖拽、跨层级拖拽、拖拽占位符
- **方案**：基于 sortablejs 自定义拖拽逻辑，配合 vue-draggable-plus

### 9.2 动态渲染

- **难点**：根据 Schema 动态渲染不同组件
- **方案**：使用 Vue 的 `<component :is="...">` 动态组件

### 9.3 属性联动

- **难点**：当某个属性变化时，动态显示/隐藏其他属性
- **方案**：在属性 Schema 中定义 `if` 条件，属性面板动态计算

### 9.4 代码生成

- **难点**：将复杂的嵌套 Schema 转换为可读的 Vue 代码
- **方案**：设计合理的模板系统，使用递归遍历 Schema

### 9.5 类型共享

- **难点**：前后端类型同步，避免重复定义
- **方案**：使用 shared 包，统一类型定义，通过 tsup 打包

---

## 十、验收标准

### 功能验收

- [ ] 用户可以注册、登录、退出
- [ ] 用户可以创建、编辑、删除项目
- [ ] 编辑器支持拖拽组件到画布
- [ ] 编辑器支持配置组件属性
- [ ] 编辑器支持预览页面效果
- [ ] 编辑器可以生成 Vue 代码
- [ ] 编辑器支持撤销/重做

### 技术验收

- [ ] 前后端 TypeScript 类型安全
- [ ] Monorepo 结构正确，依赖共享正常
- [ ] 代码符合 ESLint 规范
- [ ] API 有完整的错误处理
- [ ] 关键功能有基本测试

### 论文验收

- [ ] 论文结构完整，格式规范
- [ ] 需求分析清晰
- [ ] 系统设计详细
- [ ] 关键技术实现有深度
- [ ] 测试用例充分

---

## 十一、参考文献

1. Vue 3 官方文档
2. NestJS 官方文档
3. Prisma 官方文档
4. TailwindCSS 官方文档
5. ECharts 官方文档
6. 相关低代码平台技术文章

---

> 最后更新：2026-03-10
