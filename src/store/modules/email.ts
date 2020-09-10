import {
  VuexModule,
  Module,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import Axios from 'axios';

@Module({ namespaced: true })
class Email extends VuexModule {
  public replyTo = ''

  public replyToValid = false

  public message = ''

  public messageValid = false

  public stage = 'view'

  public token = ''

  public error = false

  @Mutation
  public mutateReplyTo(addr: string): void {
    this.replyTo = addr;
  }

  @Mutation
  public mutateReplyToValid(valid: boolean): void {
    this.replyToValid = valid;
  }

  @Mutation
  public mutateMessageValid(valid: boolean): void {
    this.messageValid = valid;
  }

  @Mutation
  public mutateStage(nextStage: string): void {
    this.stage = nextStage;
  }

  @Mutation
  public mutateMessage(msg: string): void {
    this.message = msg;
  }

  @Mutation
  public mutateToken(token: string): void {
    this.token = token;
  }

  @Mutation
  public mutateError(error: boolean): void {
    this.error = error;
  }

  @Action({ rawError: true })
  public async updateToken(token: string): Promise<void> {
    // no double submit
    if (this.stage === 'loading') {
      return;
    }
    // grecaptcha
    if (token === '') {
      return;
    }
    this.context.commit('mutateToken', token);
    // bad email address
    if (this.replyTo === '') {
      return;
    }
    // no message
    if (this.message.length < 10) {
      return;
    }
    this.context.commit('mutateStage', 'loading');

    try {
      const submitMessage = await Axios.post('https://api.oneadame.com/email', { email: this.replyTo, token: this.token, message: this.message });
      if (submitMessage.status === 204) {
        this.context.commit('mutateStage', 'submitted');
      }
    } catch (error) {
      this.context.commit('mutateError', true);
      this.context.commit('mutateStage', 'view');
      console.log(error);
    }
  }

  @Action({ rawError: true })
  public updateReplyTo(addr: string): void {
    this.context.commit('mutateReplyTo', addr);
    if (/\S+@\S+\.\S+/.test(addr)) {
      this.context.commit('mutateReplyToValid', true);
    } else {
      this.context.commit('mutateReplyToValid', false);
    }
  }

  @Action({ rawError: true })
  public updateMessage(msg: string): void {
    this.context.commit('mutateMessage', msg);
    if (msg.length > 5) {
      this.context.commit('mutateMessageValid', true);
    } else {
      this.context.commit('mutateMessageValid', false);
    }
  }

  @Action({ rawError: true })
  public updateStage(newStage: string): void {
    this.context.commit('mutateStage', newStage);
  }
}
export default Email;
