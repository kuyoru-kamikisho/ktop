## KTop

这是一个用于监控电脑性能状态的小工具，
基于[electron](https://www.electronjs.org/)开发，
同时集成了一些小功能。

### 安装

从[下载页面](https://github.com/kuyoru-kamikisho/ktop/releases)下载最新版本到您的电脑上，
然后双击运行解压到您喜欢的目录即可，本程序是免安装版程序，只需要删除程序所在目录即可完成卸载。

### 使用

#### 常规

- 点击图标⚔图标进入、离开扩展页面
- 在各种各样的模式下尝试使用 `Tab` 键吧，你会发现一些小惊喜
- 编辑`resources`目录下的`sites.yaml`以配置你的快捷网站
- 编辑`resources`目录下的`searchEngine.yaml`以配置你的搜索引擎
- 编辑`resources`目录下的`cmds.yaml`以配置你的命令，请编辑有效的`windows cmd`命令
- 编辑`resources`目录下的`crons.yaml`以配置你的定时任务，定时任务可以和命令模块中定义的`id`建立关联，下面是`time`
  字段的编辑规则，按照下面的顺序，该字段接受8个参数，您也可以在文档后面查看使用示例
    - 执行方式
        - `w` 等待一段时间后执行一次
        - `c` 每隔一段时间后都会执行一次
        - `z` 每次准点执行一次

    1. `Year` 年份，正整数
    2. `Month` 月份，正整数
    3. `Day` 日期，正整数
    4. `Week` 星期，正整数
    5. `hours` 时 ，正整数
    6. `minutes` 分，正整数
    7. `seconds` 秒，正整数
- 非开发人员请不要改动`resources`目录下的`config.yaml`文件
- 在游戏全屏模式下，您可以通过电脑托盘区域的小图标可以设置是否启用鼠标穿透模式

#### 执行器

目前在规划中内置了以下执行器的模板

- [hysteria](https://github.com/apernet/hysteria)
- [xray](https://github.com/XTLS/Xray-core)

更新：默认情况下，ktop不会自动下载最新的 net core， 如果您需要使用特定版本的核心， 请自行下载并替换`runners`目录下对应的可执行文件

在ktop的规划中不会内置任何 net core，这意味着想要通过ktop实现代理您需要自行下载，并且编辑`runners`目录下对应的配置文件

### 定时器示例

```shell
# 立即执行，0可以使用英文短横线代替
w - - - - - - -

# 10分钟后执行，超出特定单位的部分会自动换算并向前累加
w - - - - - - 600

# 10秒后执行
w - - - - - - 10

# 1年2个小时1分10秒后执行
w 1 - - - 2 - 70

# 每隔2小时1分10秒执行一次
c - - - - 2 - 70

# 每隔1年3个月12小时执行一次
c 1 3 - - - 12 -

# 在每年4月份第二个星期的12点执行一次
z - 4 - 2 12 - -

# 每小时的第10分钟执行一次
z - - - - - - 600

# 每小时的第10分钟执行一次
z - - - - - 10 -

```

## 致谢

本项目的一些设计受到以下项目的启发，特此感谢：

- [Hi_Hysteria](https://github.com/emptysuns/Hi_Hysteria)
- [kamikisho_web](https://github.com/kuyoru-kamikisho/kamikisho/tree/4.x)
- [v2rayN](https://github.com/2dust/v2rayN)

## 常见问题

#### 为什么我的电脑无法正常运行定时任务？

ktop使用的定时字符串解析工具是由kamikisho亲自设计并开发的命令行工具[kcron](https://github.com/kuyoru-kamikisho/kcron)，
为了让该工具被更多项目使用，
`kcron`被设计为一个独立项目，
因此如果您无法使用定时任务，
请检查是否缺失了该软件，默认情况下是内置的，
如果依然无法使用，请前往[kcron](https://github.com/kuyoru-kamikisho/kcron)查看文档。