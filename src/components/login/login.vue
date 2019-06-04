<template lang="html">
    <div class="s_auth">
    <div class="s_auth__block" :class="{'loader': loader}">
        <div class="s_auth__head">
            <h2 @click="sign = 'login'" :class="{'current': sign == 'login'}">Вход</h2>
            <h2 @click="sign = 'signup'" :class="{'current': sign == 'signup'}">Регистрация</h2>
        </div>
        <form>
          <div class="s_auth__body">
              <div class="s_auth__input">
                  <input name="email" v-model="email" v-validate :class="{'empty': email == '' && !error.email, 'is-danger': errors.has('email'),'valid': email !== ''}" type="email" v-focus required/>
                  <span>Email</span>
              </div>
              <div class="s_auth__input">
                  <input v-validate="'required|min:4'" :class="{'empty': password == '' && !error.password, 'is-danger': errors.has('password'), 'valid': password !== '' }"  type="password" name="password" v-model="password" required/>
                  <span>Пароль</span>
              </div>
          </div>
          <div class="s_auth__footer">

              <button class="btn" :class="{'error': error.server !== null}" @click.prevent="checkLogged"><q v-if="sign === 'login'">Войти</q><q v-else-if="sign === 'signup'">Зарегистрироваться</q></button>
              <p class="s_auth__error" :class="{'active': error.server !== null} ">{{error.server}}</p>
          </div>
        </form>

    </div>
    <loader-in v-if="loader"/>
</div>
</template>

<script>
import g from './../constants/index';
import head from './../constants/header';
import loader_in from './../loader';
export default {
  components: {
    'loader-in': loader_in
  },
  data() {
    return {
      sign: 'login',
      email: '',
      password: '',
      stateLogged: true,
      error: {
        email: false,
        password: false,
        server: null
      },
      loader: true,
      url: g.baseUrl+ g.lead
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    },
    click: {
      inserted: function(el) {
        el.click()
      }
    }
  },
  created() {
    this.getLoader();
  },
  methods: {
    checkLogged() {
      const vm = this,
        user = {
        email: this.email,
        password: this.password
      }
      console.log(g.baseUrl + this.sign)
      if (user.email !== '' && user.password !== '') {
        vm.$axios({
          method: 'post',
          url: g.baseUrl + this.sign,
          data: {
            email: user.email,
            password: user.password
          },
          withCredentials: true,
          headers:head.headers
        }).then(result => {
          if (result.data.success) {
            vm.$store.dispatch('getEmail',user.email);
            vm.getRouter('/home');
          } else {
              if(result.data.error.status){
                  vm.errorServer(result.data.error.status);
              }else if(result.data.error.code){
                  vm.errorServer(result.data.error.code);
              }
          }
        }).catch(err => {
          vm.errorServer(66);
      });
      } else {

        if (user.email == '' && user.password == '') {
            this.errorServer(99);
            this.errorWarning('email');
            this.errorWarning('password');
        }else if(user.password == ''){
            this.errorServer(98);
            this.errorWarning('password');
        }else if(user.email == ''){
            this.errorServer(97);
            this.errorWarning('email');
        }
      }
    },
    errorWarning(item) {
      this.error[item] = true;
      setTimeout(() => {
        this.error[item] = false;
      }, 2500);
    },
    errorServer(code) {
      if (code == 10) {
        this.error.server = 'Электронная почта уже существует';
      } else if (code == 66) {
        this.error.server = 'Неверный email или пароль';
        }else if(code == 401){
            this.error.server = 'Пройдите регистрацию или укажите правильный email или пароль.'
        }else if(code == 400){
            this.error.server = 'Неверный формат email'
        }else if(code == 99){
            this.error.server = 'Введите email и пароль'
        }else if(code == 98){
            this.error.server = 'Введите пароль'
        }else if(code == 97){
            this.error.server = 'Введите пароль'
        }
      setTimeout(() => {
        this.error.server = null;
      }, 1000);
    },
    getLoader() {
      setTimeout(() => {
        this.loader = false;
      }, 2000);
    },
    getRouter(item) {
      this.$router.push({
        path: item
      });
    }
  }
}
</script>

<style lang="scss">
@import './login.scss';
</style>
