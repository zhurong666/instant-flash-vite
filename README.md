tsconfig.json: 基本配置文件，定义项目的常规类型检查和编译选项。

tsconfig.app.json: 用于应用程序代码的TypeScript配置。

tsconfig.node.json: 针对Node环境的配置，通常用于Vite之类的构建工具。

tsconfig.json.tsbuildinfo: 存储增量构建的相关信息。

tsconfig.app.tsbuildinfo: 存储应用配置的增量构建信息。

tsconfig.node.tsbuildinfo: 存储Node配置的增量构建信息。


以下文件你可以 安全删除，因为它们只是 TypeScript 的 增量编译缓存，对运行时没有任何影响：

tsconfig.app.tsbuildinfo

tsconfig.node.tsbuildinfo

tsconfig.tsbuildinfo
