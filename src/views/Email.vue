<template>
  <div class="home">
    <transition
      appear
      appear-class="appear"
      appear-to-class="appear-to"
      appear-active-class="appear-active"
      name="appear"
    >
      <div class="form" v-show="stage != 'submitted'">
        <error-banner />
        <div>
          <input
            :value="replyTo"
            @keyup="updateReplyTo($event.target.value)"
            class="si"
            :class="{ 'not-ready': !this.replyToValid && this.replyTo != '' }"
            placeholder="reply to"
            type="email"
          />
        </div>
        <div>
          <textarea
            placeholder="message"
            rows="5"
            class="si"
            :class="{ 'not-ready': !this.messageValid && this.message != '' }"
            :value="message"
            @keyup="updateMessage($event.target.value)"
          />
        </div>
        <div class="button-box">
          <div
            class="g-recaptcha center-me"
            data-sitekey="6LevPsgZAAAAAMs8RzQxFqlxs5Ce7ChFIgGLvhDt"
          ></div>
          <button class="si-button" @click="submit()">
            <img src="../assets/rocket.png" v-if="this.stage != 'loading'" />
            <span v-else>Submitting...</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ErrorBanner from '@/components/ErrorBanner.vue';

const email = namespace('email');

@Component({
  components: {
    ErrorBanner,
  },
})

export default class Email extends Vue {
  private recaptchaSrc = 'https://www.google.com/recaptcha/api.js';

  public submit(): void {
    const tokenVal = Vue.prototype.$grecaptcha.getResponse();
    this.updateToken(tokenVal);
  }

  @email.State
  public message!: string

  @email.State
  public replyTo!: string

  @email.State
  public stage!: string

  @email.State
  public replyToValid!: boolean

  @email.State
  public messageValid!: boolean

  @email.Action
  public updateToken!: (token: string) => void

  @email.Action
  public updateReplyTo!: (newAdr: string) => void

  @email.Action
  public updateMessage!: (newMsg: string) => void

  mounted() {
    const captcha = document.createElement('script');
    captcha.setAttribute('src', this.recaptchaSrc);
    document.head.appendChild(captcha);
  }
}
</script>

<style scoped>
@media all and (max-width: 520px) {
  div.form {
    margin-top: 1.2rem;
  }
  .si {
    margin-bottom: 1rem;
    font-size: 1rem;
    width: 75%;
  }
}

@media all and (min-width: 521px) {
  div.form {
    margin-top: 5rem;
  }
  .si {
    margin: 0 1rem 2rem 1rem;
    font-size: 2rem;
    width: 90%;
  }
}

.err {
  font-size: 2rem;
  padding-bottom: 1rem;
  color: #e44949;
}

textarea,
input,
button {
  outline: none;
}

div.form {
  opacity: 0.8;
  text-align: center;
}

.not-ready {
  border: 1px dashed #e44949 !important;
}

.si {
  max-width: 1200px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 1rem 0.5rem;
  background: #ededed;
  border: 1px solid #42b983;
  border-radius: 9px;
}

.si-button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 2rem;
  padding: 1rem;
  background: #ededed;
  border: 1px solid #42b983;
  border-radius: 9px;
  color: gray;
  width: 305px;
  height: 78px;
}

.si-button img {
  width: 20%;
  max-width: 100px;
  vertical-align: middle;
}

.button-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.button-box button,
.button-box div {
  margin: 0 2rem 1rem;
}

.center-me {
  margin: 0 0 1rem;
}

.appear {
  transform: translateX(-100%);
}

.appear-active {
  transition: all 1.5s ease-in-out;
}

.appear-leave-to {
  transform: translateX(100%);
}

.appear-leave-active {
  transition: transform 1s ease-in-out;
}
</style>
