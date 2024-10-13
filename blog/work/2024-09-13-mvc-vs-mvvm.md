---
title: MVC vs MVVM and Other Thoughts
authors: akecskes
tags: [coding, design patterns]
draft: true
---

## MVC

- Model: Data and business logic.
- View: User interface; has own internal logic to manage some data and states.
- Controller: Manages details between Model and View. Handles external requests and responses.

MVC has bidirectional data binding and can be quite complex in execution, with potential debugging challenges. Model and View don't talk to each other; instead the exchange data with the Controller.

React might be compared to MVC in some cases, but is a bit of a different beast. It has unidirectional data binding, so changing a data in child does not flow backward up to the parent. 

## MVVM

- Model: Domain model and business objects.
- View: User interface; purely presentational, forwards user interactions to ViewModel.
- ViewModel: Business logic. Notifies View of data changes and interacts with Model.

Again, Model and View don't talk to one another directly.



