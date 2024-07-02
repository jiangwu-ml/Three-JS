### github-actions + docker + dockerhub + 云服务器 部署一个前端项目

先决条件
1、云服务器怎么登录、基本操作、推送代码。如何本地打包好的文件 push 上去
2、如何使用 docker 构建镜像，dockerfile 的语法。运行、删除、修改镜像 tag。docker 的基本知识点
3、如何把本地的 docker images 推送到 docker hub .pull、运行
4、github-actions 的 yml 文件怎么配置。才能使用 dockerfile 生成镜像、推送 dockerhub、并在云服务器运行脚本自动拉取 dockerhub 的 images.

[参考文档](https://juejin.cn/post/7156518122617307166#heading-13)
docker login --username=$1 --password=$2
docker stop GuiguAdmin
docker rm GuiguAdmin
docker image rm nico0408/GuiguAdmin:master
docker pull nico0408/GuiguAdmin:master
docker run --rm -p 80:80 --name GuiguAdmin -d nico0408/GuiguAdmin:master
echo -e "---------deploy Success--------"
