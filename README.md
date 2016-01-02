# 部署

## 安装 nvm

参考：[https://github.com/creationix/nvm](https://github.com/creationix/nvm)

## 设置 NODE_ENV

```
$ export NODE_ENV=production
```

## 清理 redis

```
$ cd /usr/local/redis/bin
$ ./redis-cli
$ FLUSHALL
```

## 启动

```
$ pm2 start ./bin/www
```
