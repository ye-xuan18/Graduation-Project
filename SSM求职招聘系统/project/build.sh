#!/bin/sh
if [ "$1" = "build" ];then
    mkdir /home/changsheng/project/project25284/project
    cp -a /home/changsheng/project/project25284/server/. /home/changsheng/project/project25284/project/
    cd /home/changsheng/project/project25284/project
    rm -rf /home/changsheng/project/project25284/server
    echo "执行成功"
fi
