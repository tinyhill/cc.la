# 部署

## 安装 nvm

参考：[https://github.com/creationix/nvm](https://github.com/creationix/nvm)

## 设置 NODE_ENV

```
$ export NODE_ENV=production
```

## 配置 redis 密码

在项目根目录中创建 `.env` 文件，并配置 `redis` 密码：

```
REDIS_PASSWORD=[你的 redis 密码]
```

## 启动

```
$ pm2 start ./bin/www
```
