---
title: RenderObjectWidget
description: RenderObjectWidget的深入理解。
sidebar:
    order: 50
---

`RenderObjectWidget` 負責創建和配置 `RenderObject`，來實現自定義佈局、繪製和交互。

```dart
/// Source: https://github.com/flutter/flutter/blob/db4e21077290f7c0016e3839c5056540fab0c0b9/packages/flutter/lib/src/widgets/framework.dart#L1877-L1932
abstract class RenderObjectWidget extends Widget {
  const RenderObjectWidget({super.key});

  @override
  @factory
  RenderObjectElement createElement();

  @protected
  @factory
  RenderObject createRenderObject(BuildContext context);

  @protected
  void updateRenderObject(BuildContext context, covariant RenderObject renderObject) {}

  @protected
  void didUnmountRenderObject(covariant RenderObject renderObject) {}
}
```

#### Methods

- **createRenderObject()**
  - 建立並回傳對應的 `RenderObject` 實例。
  - 當一個 `RenderObjectWidget` 首次掛載在 Widget Tree 上時，Flutter 框架會呼叫這個方法。

- **updateRenderObject()**
  - 當 `Widget` 更新（例如屬性改變）時，將新的屬性/資料套用到已存在的 `RenderObject` 上。

- **didUnmountRenderObject()**
  - 當 `RenderObject` 被從樹上移除（`Widget` 被卸載/銷毀）時執行，讓你釋放資源或進行清理。

#### 特性

- 和一般 `StatelessWidget`、`StatefulWidget` `不同，RenderObjectWidget` 需要你實作 `createRenderObject` 和 `updateRenderObject` 等方法。

- 每個 `RenderObjectWidget` 對應一個 `RenderObject`（例如 `RenderBox）。`

- 典型的 `RenderObjectWidget` 子類有：`LeafRenderObjectWidget`、`SingleChildRenderObjectWidget` 和 `MultiChildRenderObjectWidget。`

### RenderObjectElement 類別

```dart
/// Source: https://github.com/flutter/flutter/blob/d81baabfec4c49c9fcf96a05187f82604891f055/packages/flutter/lib/src/widgets/framework.dart#L6432-L7004
abstract class RenderObjectElement extends Element {
  RenderObjectElement(RenderObjectWidget super.widget);

  RenderObject? _renderObject;

  @override
  void performRebuild() {
    _performRebuild(); // calls widget.updateRenderObject()
  }


  void _performRebuild() {
    (widget as RenderObjectWidget).updateRenderObject(this, renderObject);
    super.performRebuild(); // clears the "dirty" flag
  }

  ...
}
```

- `RenderObjectElement` 繼承自 `Element`，它使用 `RenderObjectWidget` 作為其配置。

- 對應的渲染樹中有一個 `RenderObject`，負責具體的佈局（layout）、繪製（painting）和命中測試（hit testing）等操作。

