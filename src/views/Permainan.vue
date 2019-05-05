<template>
  <div class="permainan">
    <button v-if="!onPermainan" @click="start()">Mulai Permainan</button>
    <button v-else @click="stop()">Hentikan Permainan</button>
    <br/>
    <ul v-if="onPermainan" style="list-type: none;">
      <li style="display: inline;" v-for="index in Array(soalCount).keys()" :key="index">
        <button class="small" @click="jumpSoal" data-soal-id="10">{{ index + 1 }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { startPermainan, stopPermainan } from '../api.js'

export default {
  data() {
    return {
      onPermainan: false,
      soalCount: 40,
      lastSelectedElement: undefined,
    }
  },
  methods: {
    start() {
      startPermainan().then(res => {
        let val = res.data;
        console.log(val);
        if (!val.err) {
          this.onPermainan = true;
        } else {
          console.log(val.msg);
        }
      });
    },
    stop() {
      stopPermainan().then(res => {
        let val = res.data;
        console.log(val);
        if (!val.err) {
          this.onPermainan = false;
        } else {
          console.log(val.msg);
        }
      });
    },
    jumpSoal(e) {
      let target = e.target; 

      if (target == this.lastSelectedElement) {
        return;
      }

      target.classList.add('selected');
      if (this.lastSelectedElement !== undefined) {
        this.lastSelectedElement.classList.remove('selected');
      }
      this.lastSelectedElement = target;
    }
  }
}
</script>

<style>
.permainan {
  text-align: center;
}
</style>
