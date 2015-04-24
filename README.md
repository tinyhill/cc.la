# 部署

## 安装 nvm

```
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash
```

编辑文件：

```
$ vim ~/.bash_profile
```

添加配置：

```
source ~/.nvm/nvm.sh
```

安装 node 环境：

```
$ nvm install 0.11.14
$ nvm alias default 0.11.14
```

## 安装 pm2

```
$ npm install pm2 -g
```

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

## 清理 mongodb

```
$ mongo
$ use cc_la
$ db.dropDatabase()
```

## 启动

```
$ pm2 start ./bin/www
```