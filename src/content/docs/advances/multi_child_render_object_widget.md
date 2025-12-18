---
title: MultiChildRenderObjectWidget
description: MultiChildRenderObjectWidget的深入理解。
sidebar:
    order: 30
---

`MultiChildRenderObjectWidget` 是 Flutter 框架中一個抽象類別，繼承自 `RenderObjectWidget`，專門用來處理具有多個子 `Widget` 的自訂渲染行為。

### MultiChildRenderObjectWidget 類別

```dart
/// Source: https://github.com/flutter/flutter/blob/d81baabfec4c49c9fcf96a05187f82604891f055/packages/flutter/lib/src/widgets/framework.dart#L1970-L2052
abstract class MultiChildRenderObjectWidget extends RenderObjectWidget {
  const MultiChildRenderObjectWidget({super.key, this.children = const <Widget>[]});

  final List<Widget> children;

  @override
  MultiChildRenderObjectElement createElement() => MultiChildRenderObjectElement(this);
}
```

- 它只負責儲存 `children` 列表，不處理子項的插入、移除或更新邏輯（這些由相應的 `RenderObject` 透過 `mixin` 來實現）。

- 自訂 `RenderObject` 需要混入 `ContainerRenderObjectMixin`（處理多子項的增刪、遍歷等），如果基於 `RenderBox`，還建議混入 `RenderBoxContainerDefaultsMixin`（提供一些預設的布局、繪製、命中測試行為）。