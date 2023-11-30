<template>
  <ul class="k-cron box">
    <li v-for="(i,x) in crons" :key="x" @mouseenter="hoverCron" @mouseleave="blurCron" @dblclick="showInfo($event,i)"
        :class="{'show-info':i.showInfo}">
      <i :style="'width:'+i.timeProgress*100+'%'" class="progress" v-if="i.processing"></i>
      <div class="contains">
        <svg-icon @click="stopThis(i)" type="mdi" class="c-pointer icon-runanime" v-if="i.processing"
                  :path="mdiStopCircleOutline"></svg-icon>
        <svg-icon @click="runThis(i)" type="mdi" class="c-pointer" v-else :path="mdiMotionPlayOutline"></svg-icon>
        <span v-text="i.name"></span>
      </div>
      <svg-icon type="mdi" class="poper" v-if="i.processing" :path="mdiShuriken"></svg-icon>
      <div v-if="i.showInfo" class="cron-info">

        <div class="info-chip">
          <label>ID：</label>
          <span v-text="i.id"></span>
        </div>

        <div class="info-chip">
          <label>时间定义：</label>
          <span v-text="i.time"></span>
        </div>

        <div class="info-chip">
          <label>绑定命令：</label>
          <span v-text="i.bind"></span>
        </div>

        <div class="info-chip">
          <label>绑定定时器：</label>
          <span v-text="i.then"></span>
        </div>

        <div class="info-chip">
          <label>cron解析结果：</label>
          <table v-if="i.nextList">
            <thead>
            <tr>
              <td>年份</td>
              <td>月</td>
              <td>日</td>
              <td>时</td>
              <td>分</td>
              <td>秒</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(m,n) in i.nextList" :key="n">
              <td>{{ m[0] }}</td>
              <td>{{ m[1] }}</td>
              <td>{{ m[2] }}</td>
              <td>{{ m[3] }}</td>
              <td>{{ m[4] }}</td>
              <td>{{ m[5] }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiMotionPlayOutline, mdiStopCircleOutline, mdiShuriken} from '@mdi/js';
import {storeToRefs} from "pinia";
import useApp from "../store/useApp";

const {crons, cmds, msgBox} = storeToRefs(useApp())

function runThis(o: any) {
  o.showInfo = false
  o.timeProgress = 0;
  o.processing = true
  window.electronAPI.getCronTime(o.time).then((s: string) => {
    let timeArray
    const times = s.split(/\r\n/);
    o.nextList = [];
    for (let i = 4; i < 9; i++) {
      timeArray = times[i].split(/\s+/);
      timeArray.pop();
      timeArray.splice(3, 1)
      o.nextList.push(timeArray);
    }
    let next = o.nextList[0];
    let now = new Date();
    let nextDate = new Date(`${next[0]}-${next[1]}-${next[2]} ${next[3]}:${next[4]}:${next[5]}`);
    let time1 = now.getTime();
    let time2 = nextDate.getTime();
    let timeLength = time2 - time1;
    let timeSpent = 0;
    o.interval = setInterval(() => {
      timeSpent += 1000;
      o.timeProgress = timeSpent / timeLength;
      if (o.timeProgress >= 1) {
        if (o.send) {
          window.electronAPI.openAlertWindow()
          window.electronAPI.msgToMain({
            to: 1,
            title: o.name,
            text: o.send
          })
        }
        if (/[zc]/.test(o.time)) {
          o.nextList.shift();
          if (o.nextList.length === 0) {
            return runThis(o);
          }
          next = o.nextList[0];
          now = new Date();
          nextDate = new Date(`${next[0]}-${next[1]}-${next[2]} ${next[3]}:${next[4]}:${next[5]}`);
          time1 = now.getTime();
          time2 = nextDate.getTime();
          timeLength = time2 - time1;
          timeSpent = 0;
        } else {
          o.processing = false
          o.nextList = []
          clearInterval(o.interval)
        }
        if (o.then) {
          let f = crons.value.findIndex(a => a.id === o.then);
          if (f > -1) {
            runThis(crons.value[f]);
          } else {
            window.electronAPI.openAlertWindow()
            window.electronAPI.msgToMain({
              to: 1,
              title: '定时器',
              text: '从定时器中找不到id为“' + o.then + '”的配置，请检查配置是否正确。'
            })
          }
        }
        if (o.bind) {
          let f = cmds.value.findIndex(a => a.id === o.bind);
          if (f > -1) {
            useApp().runCmd(cmds.value[f]);
          } else {
            window.electronAPI.openAlertWindow()
            window.electronAPI.msgToMain({
              to: 1,
              title: '定时器',
              text: '从命令中找不到id为“' + o.bind + '”的配置，请检查配置是否正确。'
            })
          }
        }
      }
    }, 1000)
  })
}

function stopThis(o: any) {
  o.processing = false
  o.nextList = []
  o.showInfo = false
  clearInterval(o.interval)
}

function showInfo(e: MouseEvent, o: any) {
  if (!o.showInfo) {
    crons.value.forEach(a => {
      a.showInfo = false
    })
    o.showInfo = true;
  } else {
    o.showInfo = false
  }
}

function hoverCron() {
  msgBox.value = '可以通过鼠标双击查看此定时器的详细信息。'
}

function blurCron() {
  useApp().resetMsgbox()
}
</script>

<style lang="scss">
.k-cron {
  .contains {
    display: flex;
    align-items: center;
  }

  .info-chip {
    margin: 8px 0;
  }

  td {
    text-align: center;
  }

  table {
    width: 100%;
  }

  thead {
    line-height: 22px;
  }

  .cron-info {
    color: #9fadc7;
    position: absolute;
    bottom: 0;
    left: 12px;
    height: 96px;
    width: 94%;
    box-shadow: inset 0 1px #e3e3e326;
    overflow: auto;
  }

  span {
    margin: 0 10px;
    z-index: 1;
  }

  &.box {

  }

  .progress {
    background-color: rgb(53 28 77 / 45%);
    height: 100%;
    left: 0;
    position: absolute;
    transition: width 232ms;
  }

  li {
    position: relative;
    height: 36px;
    display: flex;
    padding: 0 12px;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    white-space: nowrap;
    background-color: rgb(48 45 55 / 56%);
    margin: 0 0 8px 0;
    letter-spacing: 0.11em;
    transition: all .2s;

    &.show-info {
      height: 120px;
      padding: 6px 12px;
      align-items: baseline;
    }

    &:hover {
      svg {
        color: #adff25 !important;
      }

      background-color: rgb(44, 44, 56);
      box-shadow: 0 0 6px 2px rgba(146, 118, 255, 0.66);
    }
  }
}

.poper {
  width: 19px;
  height: 19px;
  color: #ff133a;
  animation: zpoper 2s infinite linear;
}

@keyframes zpoper {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>