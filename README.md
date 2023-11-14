# Github Actions and Github Pages

### 一、是什么？

1、github pages

reference： [quickstart](https://docs.github.com/zh/pages/quickstart)

> 用来存储、托管静态文档的仓库。

> 可以直接通过 setting 去手动设置。此时，默认通过 README.md 作为入口

> 通过 actions 在.yml 文件中配置，可以 build、并部署 react 项目。

> 有一个 静态网站生成器[vuepress](https://vuepress.vuejs.org/zh/guide/#%E5%AE%83%E6%98%AF%E5%A6%82%E4%BD%95%E5%B7%A5%E4%BD%9C%E7%9A%84) ,可以支持配置式生成静态资源文件的页面搭建.

所以就是说可以 只使用 github pages 不使用 github actions,去搭建一个静态网站。

> 但是此时只能 生成 以 md 文件为入口的 build 文件夹，只能展示 md 文件的内容。即无法通过路由去访问 react 项目 的页面。

2、github actions

reference: [link](https://docs.github.com/zh/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89-github-actions-%E5%B7%A5%E4%BD%9C%E6%B5%81%E8%BF%9B%E8%A1%8C%E5%8F%91%E5%B8%83)

> 类似 cicd 自动化继承、检测、部署

> github actions 设置在.yml 文件，其可以包含 github pages 的设置。

### 二、问题

1、github 上的 pages-build-deployment workflow 是怎么生成的？

-- 是设置在 setting - pages 里的设置的吗？-不确定

2、为什么 pages-build-deployment workflow build 就很简单呢？

-- 可能因为没有 install 和 react 环境、依赖等复杂操作.

3、它 build 出的来的东西是什么？ 是 react 的项目的 build 文件吗?

--不是的。它 build 出来的是以 README.md 为入口文件生成的一个 index.html 文件。并不是 react 项目的真实页面。
![Alt text](./Images/github-pages-build.png)

4、如果我想通过 actions 部署到 github-pages 的是个 react 项目。但是通过 github pages 单独配置出的是个 md 写成的静态网页。怎么做？

5、关于 ACCESS_TOKEN 的 生成、作用 、过期了怎么办、使用场景？

### 三、使用场景
