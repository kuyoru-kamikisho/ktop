## KTop

这是一个用于监控电脑性能状态的小工具，
基于[electron](https://www.electronjs.org/)开发，
同时集成了一些小功能。

### 安装

从[下载页面](https://github.com/kuyoru-kamikisho/ktop/releases)下载最新版本到您的电脑上，
然后双击运行解压到您喜欢的目录即可，本程序是免安装程序，只需要删除程序所在目录即可完成卸载。

更新时只要覆盖原来的安装目录即可。

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
        - `w` 等待一段时间后仅执行一次
        - `c` 每隔一段时间后都会执行一次
        - `z` 每次准点都会执行一次

    1. `Year` 年份，正整数
    2. `Month` 月份，正整数
    3. `Day` 日期，正整数
    4. `Week` 星期，正整数
    5. `hours` 时 ，正整数
    6. `minutes` 分，正整数
    7. `seconds` 秒，正整数
- 非开发人员请不要改动`resources`目录下的`config.yaml`文件
- 在游戏全屏模式下，您可以通过电脑托盘区域的小图标可以设置是否启用鼠标穿透模式

## 执行器

ktop中的代理模块并非单纯的进行网络代理，
为了让任何第三方功能都可以集成进去，
我们提出了“执行器”的概念，我们也将其称之为代理，
执行器的功能完全取决与您编写的代码，
任何功能，都可以由您自己编写的代码来实现。

目前在规划中内置了以下执行器的结构模板

- [hysteria](https://github.com/apernet/hysteria)
- [xray](https://github.com/XTLS/Xray-core)

依赖更新：依赖的更新方式取决与您编写的执行器模块代码。在ktop的内置案例中，当您删除依赖时，将自动下载对应的依赖。

### 如何编写自己的执行器

#### 前言

在开始这一节之前，您必须要拥有一定程度的编程能力和学习能力，
但是不要害怕，您不会nodejs？

**我也不会！** 

我一直做的都是前端工作，
我在公司里是一名前端开发工程师，工作也才一年多，
但是在公司内部完全没有接触过除了web三件套（html, css, js）之外的任何语言，
但是我具备基础的编程思维，我也会使用搜索引擎解决我的问题，更重要的，
我会查看各个语言的开发文档。

您可以查看我写过的仓库里面涵盖了c#、c++、ts、js、tsx等各种各样的语言，
并且都有一定成果，这得益于我每天不断地利用搜索引擎，而不是我大学学的多好。
认识我的同学都知道我在大学是几乎不学习的，
我认为使用一门新语言开发程序之前并非只能先学才能上手，
而可以现学现卖。

我完全不懂c++，但还是开发了kcron；
我完全不懂electron和nodejs，但还是开发了ktop；
我完全不懂c#，但还是开发了crommitor；

所以，只要有基本的编程思维和一点点学习能力，你也可以轻松配置出各种各样的执行器！

#### 开始

您可以参考目录[runners](./runners)下已经写好的执行器模板，
重点查看各个执行器目录下的`index.js`

index.js返回一个nodejs模块，他必须具备以下属性：

| AttrName              | Type     | Description                                                                                               |
|-----------------------|----------|-----------------------------------------------------------------------------------------------------------|
| use                   | Boolean  | Whether to use this directory as an executor and display it as a menu item.                               |
| exclusive             | Boolean  | When enabled, the execution of any menu within this executor will stop any other menu items from running. |
| menuTemplate          | Object   | A basic menu template                                                                                     |
| menuTemplate.name     | String   | Name of menu.                                                                                             |
| menuTemplate.send_on  | String   | Message when menu start.                                                                                  |
| menuTemplate.send_off | String   | Message when menu stop.                                                                                   |
| menuTemplate.click    | Function | Menu Function.                                                                                            |
| menuTemplate.kill     | Function | Menu Function, define this function when the type of program is a long-running program in the background. |
| onMounted             | Function | Triggered once when entering the "Agent" module, used to build the menu list.                             |

除了必要上述表格中的必须属性之外，
您可以在index.js定义任何函数和属性，
他们是否会被调用取决于您定义在`onMounted`的代码。

### 定时器示例

定时器模块的核心依赖是[kcron](https://github.com/kuyoru-kamikisho/kcron)，因此定时器
`time`属性的编写规则也与 `kcron` 完全一致。

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

# 在每年4月份的周二12点执行一次
z - 4 - 2 12 - -

# 每小时的第10分钟执行一次
z - - - - - - 600

# 每小时的第10分钟执行一次
z - - - - - 10 -

```

### 如何配置定时器

| 属性名  | 值类型            | 功能                                                                |
|------|----------------|-------------------------------------------------------------------|
| id   | string         | 该定时器的ID，这个ID在定时器列表里应该是唯一的                                         |
| name | string         | 定时器的名称                                                            |
| time | string         | 定时规则                                                              |
| then | string or null | 到达计时点后同步执行的定时器的ID，可以利用该属性让定时器之间互相调用，一个定时器一次只能调用一个其它定时器，通常用在“w”定时器 |
| bind | string or null | 到达计时点后同步执行的命令的ID，在这里填写一个cmd命令的ID，可以实现当到达定时端点时执行一次某命令的功能           |

ktop中内置了一些示例，比如：

- 利用then属性将w标记转化为无限执行的 **“番茄工作法定时器”**
- 利用bind属性将关机命令改变为可以反悔的 **“关机定时器”**

您可以参考这些配置来创建您专有的定时器。

⚠⚠⚠ 警告！不要滥用 `then` 属性和 `bind` 属性！ ⚠⚠⚠

这两个属性应该在 `w` 计时器下使用，否则可能会造成无限制定时器之间互相重复触发的问题！

### 命令配置示例

| 属性名  | 值类型            | 功能                                       |
|------|----------------|------------------------------------------|
| id   | string         | 命令的id，这个id主要用来被定时器模块所检索调用，该值在命令模块下应该是唯一的 |
| name | string         | 命令的别名                                    |
| cmd  | string         | 命令的具体内容                                  |
| send | string or null | 如果不为null，执行命令时会弹出一个执行提示，提示文本为send属性的值    |

## 致谢

本项目的一些设计受到以下项目的启发，特此感谢：

- [Hi_Hysteria](https://github.com/emptysuns/Hi_Hysteria)
- [kamikisho_web](https://github.com/kuyoru-kamikisho/kamikisho/tree/4.x)
- [v2rayN](https://github.com/2dust/v2rayN)

## 启动过程

![startp1](./imgs/app_start_process.png)

## 常见问题

#### 为什么我的电脑无法正常运行定时任务？

ktop使用的定时字符串解析工具是由kamikisho亲自设计并开发的命令行工具[kcron](https://github.com/kuyoru-kamikisho/kcron)，
为了让该工具被更多项目使用，
`kcron`被设计为一个独立项目，
因此如果您无法使用定时任务，
请检查是否缺失了该软件，默认情况下是内置的，
如果依然无法使用，请前往[kcron](https://github.com/kuyoru-kamikisho/kcron)查看文档。

#### 为什么我无法正常更新执行器的的程序？

如果是您自己配置的执行器且未配置update程序（使用[NodeJs](https://nodejs.org/en)编写，
需要您在执行器目录下的`map.yaml`下指定更新程序的路径），
那么您可能需要手动进行更新，
如果您配置了update程序或无法更新内置的执行器，
那么您可能需要检查您的网络环境，
可以通过启用或关闭网络代理重新尝试。
更多相关内容请查看[如何配置执行器](./runners/README.md)。
