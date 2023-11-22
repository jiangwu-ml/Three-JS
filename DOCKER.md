## 如何将一个前端项目装进 docker image 里

3 种方式：

### 一、基于前端项目 build 后的文件夹，制作一个 image，利用 anywhere 服务启动项目

- 1、自己先 build.
- 2、在 build 后的文件夹里 放上 Dockerfile 文件。
- 3、文件内容如下：

```js
FROM node:19-alpine //指定base image
WORKDIR /app       // 指定 image 运行起来后,container里的【绝对路径】，此路径下用来运行以下所有代码。存放、运行前端项目
COPY . .
RUN npm i anywhere -g

EXPOSE 3000
CMD anywhere -p 3000 -d . -s  //启动！✈️  注意： . 是当前路径的意思 /app下的路径
```

- 4、执行 docker build xxxx
- 5、运行 docker run [imageName] -d -p 主机端口:image 内部端口

成果展示： http://123.60.160.90:8089/

主机端口：_一定要写 4 位的_，一般不要映射到 2 位数，2 位数的端口，尤其是 2 位数的端口，很多都是系统保护端口，有内置用途的，不开放的。自己的应用一般都是运行在 4 位数的端口，比如你前端默认就是 3000 端口，Java 服务默认 8000

关于 `COPY . .`

> COPY <源路径> <目标路径> 。将 Dockerfile 所在文件夹的所有内容拷贝到 image 的 /app 文件夹下

> <源路径>：当前 dockerfile 文件所在的上下文（context）为基础的相对路径。

> <目标路径>：可以是/app 的相对路径。也可以是 container 里的【绝对路径】。

关于 anywhere:

> 启动前端 build 后的项目文件夹。就需要服务。anywhere 就是一个服务。

> 也支持在我们本地里使用。装好 anywhere 后直接 到 build 文件夹下执行：anywhere + 端口 就行了

> 这里也可以用 nginx 代替。但是需要配置文件。就没用那种方式

### 二、基于项目源文件，制作一个 image，通过 npm start 启动项目

- 1、在 项目文件根目录下 放上 Dockerfile 文件。
- 2、文件内容如下：

```js
FROM node:19-alpine
WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000
CMD ["npm","start"]
```

### 三、先在 image 里打包前端文件，再基于打包文件在 image 里启动项目

Dockerfile 文件内容如下：

```js
FROM node:19-alpine
WORKDIR /app
COPY . .

RUN npm install

RUN npm run build//就是相当于把打包这一步放到了 image 里执行。

RUN npm i anywhere -g
EXPOSE 3000
CMD anywhere -p 3000 -d ./build -s
```

下图是使用前两种方式做的 images. 可以看出 build 后使用 anywhere 会缩小 images 的 size
![Alt text](images/image-docker01.png)
