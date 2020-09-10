<template>
  <transition
    appear
    appear-class="appear"
    appear-to-class="appear-to"
    appear-active-class="appear-active"
  >
    <div class="letter" :class="[colorClass, heightClass]">
      <span class="end">
        <slot></slot>
      </span>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      heightClass: '',
      colorClass: '',
      isIn: false,
    };
  },
  created() {
    this.colorClass = `c${Math.floor(Math.random() * 5) + 1}`;
    this.heightClass = `h${Math.floor(Math.random() * 10) + 1}`;
    this.isIn = true;
  },
});
</script>

<style scoped>
.c1 {
  background-color: #e3dbdb;
}

.c2 {
  background-color: #c9d5b5;
}

.c3 {
  background-color: #9f9f92;
}

.c4 {
  background-color: #6d6466;
}

.c5 {
  background-color: #a79097;
}

.h1 {
  max-height: 10vh;
}
.h2 {
  max-height: 20vh;
}
.h3 {
  max-height: 30vh;
}
.h4 {
  max-height: 40vh;
}
.h5 {
  max-height: 50vh;
}
.h6 {
  max-height: 60vh;
}
.h7 {
  max-height: 70vh;
}
.h8 {
  max-height: 80vh;
}
.h9 {
  max-height: 90vh;
}
.h10 {
  max-height: 10vh;
}

.letter {
  min-width: 1.7rem;
  font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (300)));
  display: flex;
  justify-content: center;
  flex-grow: 2;
  border-radius: 0 0 1em 1em;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  box-shadow: 1px 1px 1px #42b983;
  font-family: "Space Mono", monospace;
}

.end {
  align-self: flex-end;
}

.appear {
  opacity: 0;
  max-height: 0px;
}

.appear-active {
  transition: max-height 30s ease-in-out, opacity 3s;
}

@import url("https://fonts.googleapis.com/css2?family=Space+Mono&display=swap");
</style>
