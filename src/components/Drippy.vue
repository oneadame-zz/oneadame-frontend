<template>
  <div class="abs">
    <div class="max">
      <drippy-letter
        v-for="(letter, index) in letters"
        :key="`${letter}-${index}`"
        >{{ letter }}</drippy-letter
      >
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import DrippyLetter from '@/components/DrippyLetter.vue';

export default Vue.extend({
  name: 'Drippy',
  data() {
    return {
      letters: 'adamengelmeyer',
    };
  },
  props: {},
  components: {
    DrippyLetter,
  },
});
</script>

<style>
.abs {
  opacity: 0.2;
  position: absolute;
  z-index: -10;
  overflow: hidden;
}

.max {
  margin: auto;
  justify-content: left;
  height: 100vh;
  width: 100vw;
  display: flex;
}
</style>
