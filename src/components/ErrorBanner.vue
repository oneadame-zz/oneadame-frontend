<template>
    <transition name="slide-down" mode="out-in">
          <div v-show="this.error" class="err">
            <span>Sorry, something went wrong. Please try again later.</span>
          </div>
        </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const email = namespace('email');

@Component
export default class Email extends Vue {
    @email.State
    public error!: boolean
}
</script>
<style scoped>
.slide-down-enter {
  opacity: 0;
  max-height: 0px;
}

.slide-down-active {
  transition: max-height 5s ease-in-out, opacity 3s;
}

.slide-down-enter-to {
  max-height: 100px;
}
</style>
