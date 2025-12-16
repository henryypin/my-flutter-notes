---
title: StatelessWidget
description: StatelessWidget的深入理解。
sidebar:
    order: 20
---

`StatelessWidget` 一種不需要可變狀態（mutable state）的 `Widget`，僅依賴 `Widget` 本身的配置資訊（configuration）以及 `BuildContext`，不會動態變化。

### StatelessWidget 類別

`StatelessWidget` 繼承自 `Widget`，是 Flutter 框架中用於創建靜態 UI 組件的基础類別。

```dart
/// Source: https://github.com/flutter/flutter/blob/4de6fcc369e7619e216f29cb66aa53338a18de1d/packages/flutter/lib/src/widgets/framework.dart#L399-L573
abstract class StatelessWidget extends Widget {
  const StatelessWidget({super.key});

  @override
  StatelessElement createElement() => StatelessElement(this);

  @protected
  Widget build(BuildContext context);
}
```

#### 特性

- **抽象類別**
  - `StatelessWidget` 是抽象類別，不能直接實例化，必須通過繼承來使用。
  - 所有靜態 UI 組件都應該繼承自 `StatelessWidget`。

- **不可變**
  - 與 `Widget` 一樣，`StatelessWidget` 也是不可變的。一旦創建，其屬性不會改變。
  - 如果需要根據數據變化更新 UI，應該使用 `StatefulWidget`。

- **無狀態**
  - 不維護任何內部狀態，不會因用戶交互或其他事件而改變自身。
  - 適合用於顯示靜態內容，如標題、圖標、按鈕等。

- **build 方法**
  - 必須實現 `build(BuildContext context)` 方法，返回描述 UI 的 Widget 樹。
  - `BuildContext` 提供當前 `Widget` 在 Widget Tree 中的位置信息，可用於訪問上層 `Widget` 提供的資訊，例如: `Theme`、`MediaQuery`、`Localizations`。

- **性能優化**
  - 由於無狀態，Flutter 可以安全地重用 `StatelessWidget` 的實例，而無需擔心狀態同步問題。
  - 在 Widget 樹重建時，如果新舊 `StatelessWidget` 的類型和 key 相同，Flutter 會嘗試重用現有的 `Element`。