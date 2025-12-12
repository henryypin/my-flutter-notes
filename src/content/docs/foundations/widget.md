---
title: Widget
description: Wiget的深入理解。
sidebar:
    order: 10
---

在 Flutter 裡，`Widget` 是構成畫面的基本單位。基本上在整個頁面上所看到的東西：按鈕、文字、圖片、列表，都是 `Widget`。

### Widget 類別

`Widget` 是Flutter框架中所有視覺元件的基礎類別，所有自訂 `Widget` 都會繼承它。

```dart
/// Source: https://github.com/flutter/flutter/blob/4de6fcc369e7619e216f29cb66aa53338a18de1d/packages/flutter/lib/src/widgets/framework.dart#L277-L397
@immutable
abstract class Widget extends DiagnosticableTree {
  const Widget({this.key});

  final Key? key;

  @protected
  @factory
  Element createElement();

  @override
  @nonVirtual
  bool operator ==(Object other) => super == other;

  @override
  @nonVirtual
  int get hashCode => super.hashCode;

  static bool canUpdate(Widget oldWidget, Widget newWidget) {
    return oldWidget.runtimeType == newWidget.runtimeType && oldWidget.key == newWidget.key;
  }

  ...
}
```

#### 特性

- **抽象類別**
  - `Widget` 是 `abstract class`，即「抽象類別」，不能直接 new 出來用，只能繼承。所有你平常用的組件（例如 Text、Container）都是繼承自 Widget。
  - 這樣做是為了統一接口，方便 Flutter 進行擴展和管理。

- **不可變（Immutable）**
  - `@immutable` 標註，代表 `Widget` 的所有屬性都必須宣告為 `final`，一但建立後就不能修改。
  - 這設計讓 `Widget` 能像「設計圖」一樣只負責描述外觀、不可更動。實際上狀態和變動會交給 `Element` 和 `State` 管。
  - 好處：當畫面需要刷新時，Flutter 可以用 `==`（物件比較）快速判斷新舊 Widget tree 哪裡變了，大大提升效能與準確性。

- **Key（身份證）**
  - `Key` 就像 Widget 的「身份證」，有多種型別（`ValueKey`、`ObjectKey`、`UniqueKey`、`GlobalKey`）。
  - 在動態列表、排序、插入或刪除組件時，`Key` 讓 Flutter 能穩定追蹤每個 `Widget`，分清楚「誰是誰」，避免重建、亂跳狀態等問題。

- **createElement() 方法**
  - 每個 Widget 必須實作 `createElement()`，這方法會產生對應的 `Element` 實體——`Element` 是 Flutter 架構裡負責管理、配置畫面的「真正執行體」。
  - 常見有 `StatelessElement`、`StatefulElement`，分別對應於`StatelessWidget`和`StatefulWidget`。
  - 你平常 `setState`、`context` 操作的，都是和 `Element` 打交道。

- **canUpdate 靜態方法**
  - `canUpdate(oldWidget, newWidget)` 是 Widget 的一個 static method，用來判斷兩個 `widget` 可不可以「覆蓋更新」彼此。
  - 判斷條件：**型別(type)和 key 一樣**，才可被視為同一個 `widget` 進行狀態/內容更新，否則會被當新 `widget`，舊的會被銷毀，新的會重新建立。
  - 這設計可以避免不必要的重建，有效提升效能與穩定性。