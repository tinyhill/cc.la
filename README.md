# 部署指南

## 安装 nvm

```bash
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash
```

编辑文件：

```
~/.bash_profile
```

添加配置：

```
source ~/.nvm/nvm.sh
```

安装 node 环境：

```bash
$ nvm install 0.11.14
$ nvm default 0.11.14
```

## 安装 pm2

```bash
$ npm install pm2 -g
```

## 设置 NODE_ENV

```bash
$ export NODE_ENV=production
```

## 启动

```bash
$ pm2 start ./bin/www
```