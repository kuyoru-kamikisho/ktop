## 执行器

ktop的代理就是使用运行器设置网络代理的。

`runners`目录下可以放置可种各样的第三方程序，
所有的第三方程序都由其目录下的`kmenu.yaml`进行管理，
运行器首先会解析该文件并生成对应的交互按钮，
随后您就可以点击对应的按钮来执行相应的第三方程序或脚本。

**注意：任何一个执行器都必须存放在一个具有index.js的目录下。**

**注意：不要建立没有意义的目录。**

**注意：kcron是本程序定时功能的依赖项，因此删除kcron目录可能会导致程序崩溃。**

**注意：任何 index.js 入口文件都应该先通过您的本地测试。**

### index.js 模板

```javascript
module.exports = {
    use: false,
    exclusive: false,
    menuTemplate: {
        name: 'menu-name',
        send_on: null,
        send_off: null,
        click(killback) {
        },
        kill() {
        }
    },
    async onMounted() {
        return [this.menuTemplate]
    }
}
```
