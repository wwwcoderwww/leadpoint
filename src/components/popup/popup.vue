<template lang="html">
    <div class="s_center">
        <loader-in v-if="loader" />
        <div v-else class="s_popup">
            <div @click="statePopup(false)" class="s_popup__close"><span></span></div>
            <div class="s_popup__head">
                <h2>Создать перезвон</h2>
            </div>
            <div class="s_popup__body">
                <div class="user-info">
                    <div>
                        <b>Провайдер: </b>
                        <span>{{ item.provider }}</span>
                    </div>
                    <div>
                        <b>Телефон: </b>
                        <span>{{ item.phone }}</span>
                    </div>
                    <div>
                        <b>Имя: </b>
                        <span>{{ item.name }}</span>
                    </div>
                    <div>
                        <b>Объект: </b>
                        <span>{{ item.object }}</span>
                    </div>
                    <div>
                        <b>Источник: </b>
                        <span>{{ item.source }}</span>
                    </div>
                </div>
                <div class="callback" v-if="item.comment">
                    <b>Комментарий: </b>
                    <span> {{ item.comment }} </span>
                </div>
                <div class="s_popup__wrp">
                    <div class="s_popup__left">
                        <div class="s_popup__input">
                            <h3>Конфигурация</h3>
                            <select-in v-if='!errorConfig' :selects="selects" @emitSelect="typeConfig" :select_current="select_current" placeholder="Выберите конфигурацию"/>
                            <p v-else class="text-error">При загрузке данных произошла оштбка, попробуйте позже</p>
                        </div>
                        <div class="s_popup__input">
                            <h3>Таймаут</h3>
                            <input type="number" name="" v-model="timeout" />
                        </div>
                        <div class="s_popup__input">
                            <h3>Дата</h3>
                            <datetime v-model="selectedDate" :min-datetime="minDate" type="datetime" class="theme-my" :phrases="{ok: 'Да', cancel: 'Отмена'}"></datetime>
                        </div>
                    </div>
                    <div class="s_popup__right" v-if="current.useService === 'skb'">
                        <h2>{{current.name}}</h2>
                        <div class="s_popup__item">
                            <h3>Клиент:</h3>
                            <p v-if="current.data.clientId">{{current.data.clientId}}</p>
                            <p v-else>Это поле пустое</p>
                        </div>
                        <div class="s_popup__item">
                            <h3>Домен:</h3>
                            <p v-if="current.data.domainId">{{current.data.domainId}}</p>
                            <p v-else>Это поле пустое</p>
                        </div>
                        <div class="s_popup__item">
                            <h3>Сотрудник:</h3>
                            <p v-if="current.data.phone">{{current.data.phone}}</p>
                            <p v-else>Это поле пустое</p>
                        </div>
                        <div class="s_popup__item">
                            <h3>Текст <q>(оператор выкл)</q>:</h3>
                            <p class="s_popup__item_edit" @click="editTextarea('text_with','Текст с действием оператора', current.data.text_with, true)">
                                <q v-if="current.data.text_with">{{current.data.text_with}}</q>
                                <q v-else>Это поле пустое</q>
                                <svg viewBox="0 0 300 300" width="22" height="22"><path d="M150 0C67.2 0 0 67.2 0 150S67.2 300 150 300s150-67.2 150-150S232.8 0 150 0zM221.3 107.9l-14.2 14.2 -29-29 -11 11 29 29 -71.1 71.1 -29-29L84.9 186.3l29 29 -7.1 7.1 -0.1-0.1c-0.8 1.3-2.1 2.2-3.6 2.6l-27 6c-0.4 0.1-0.8 0.1-1.2 0.1 -1.5 0-2.9-0.6-4-1.6 -1.4-1.4-1.9-3.3-1.5-5.2l6-27c0.3-1.5 1.3-2.8 2.6-3.6l-0.1-0.1L192.3 78.9c1.7-1.7 4.4-1.7 6.1 0l22.9 22.9C223 103.5 223 106.3 221.3 107.9z"/></svg>
                            </p>
                        </div>
                        <div class="s_popup__item">
                            <h3>Текст <q>(оператор вкл)</q>:</h3>
                            <p class="s_popup__item_edit" @click="editTextarea('text_without','Текст без действия оператора', current.data.text_without, true)">
                                <q v-if="current.data.text_without">{{current.data.text_without}}</q>
                                <q v-else>Это поле пустое</q>
                                <svg viewBox="0 0 300 300" width="22" height="22"><path d="M150 0C67.2 0 0 67.2 0 150S67.2 300 150 300s150-67.2 150-150S232.8 0 150 0zM221.3 107.9l-14.2 14.2 -29-29 -11 11 29 29 -71.1 71.1 -29-29L84.9 186.3l29 29 -7.1 7.1 -0.1-0.1c-0.8 1.3-2.1 2.2-3.6 2.6l-27 6c-0.4 0.1-0.8 0.1-1.2 0.1 -1.5 0-2.9-0.6-4-1.6 -1.4-1.4-1.9-3.3-1.5-5.2l6-27c0.3-1.5 1.3-2.8 2.6-3.6l-0.1-0.1L192.3 78.9c1.7-1.7 4.4-1.7 6.1 0l22.9 22.9C223 103.5 223 106.3 221.3 107.9z"/></svg>
                            </p>
                        </div>
                    </div>
                    <div class="s_popup__right" v-else-if="current.useService === 'co'">
                        <h2>{{current.name}}</h2>
                        <div class="s_popup__item">
                            <h3>Звонок:</h3>
                            <p v-if="current.data.first_call">{{current.data.first_call}}</p>
                            <p v-else>Это поле пустое</p>
                        </div>
                        <div class="s_popup__item">
                            <h3>Виртуальный номер:</h3>
                            <p v-if="current.data.virtual_phone_number">{{current.data.virtual_phone_number}}</p>
                            <p v-else>Это поле пустое</p>
                        </div>
                        <div class="s_popup__item">
                            <h3>Направление номера:</h3>
                            <p v-if="current.data.direction === 'in'">Входящие</p>
                            <p v-else-if="current.data.direction === 'out'">Исходящие</p>
                        </div>
                        <div class="s_popup__item">
                            <h3>ID сотрудника:</h3>
                            <p v-if="current.data.employee_id">{{current.data.employee_id}}</p>
                            <p v-else>Это поле пустое</p>
                        </div>
                        <div class="s_popup__item">
                            <h3>Телефон сотрудника:</h3>
                            <p v-if="current.data.employee_phone">{{current.data.employee_phone}}</p>
                            <p v-else>Это поле пустое</p>
                        </div>
                        <div class="s_popup__item">
                            <h3>Текст для сотрудника:</h3>
                            <p class="s_popup__item_edit" @click="editTextarea('employee_msg','Текст для сотрудника', current.data.employee_msg, true)">
                                <q v-if="current.data.employee_msg">{{current.data.employee_msg}}</q>
                                <q v-else>Это поле пустое</q>
                                <svg viewBox="0 0 300 300" width="22" height="22"><path d="M150 0C67.2 0 0 67.2 0 150S67.2 300 150 300s150-67.2 150-150S232.8 0 150 0zM221.3 107.9l-14.2 14.2 -29-29 -11 11 29 29 -71.1 71.1 -29-29L84.9 186.3l29 29 -7.1 7.1 -0.1-0.1c-0.8 1.3-2.1 2.2-3.6 2.6l-27 6c-0.4 0.1-0.8 0.1-1.2 0.1 -1.5 0-2.9-0.6-4-1.6 -1.4-1.4-1.9-3.3-1.5-5.2l6-27c0.3-1.5 1.3-2.8 2.6-3.6l-0.1-0.1L192.3 78.9c1.7-1.7 4.4-1.7 6.1 0l22.9 22.9C223 103.5 223 106.3 221.3 107.9z"/></svg>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="s_popup__btn">
                    <div class="btn" @click="getCallback">Создать</div>
                    <div class="btn" @click="statePopup(false)">Отменить</div>
                    <p class="s_popup__error" :class="{'active': error.useService !== false} ">{{error.txt}}</p>
                </div>
            </div>
        </div>
        <textarea-in :textarea="textarea" v-if="textarea.state" @emitSaveTextarea="saveTextarea" @emitStateTextarea="stateTextarea"/>
    </div>
</template>

<script>
import g from './../constants/index';
import select_in from './../select';
import textarea_in from './../textarea';
import loader_in from './../loader';

export default {
    props: ['item'],
  components: {
    'select-in': select_in,
    'textarea-in':textarea_in,
    'loader-in': loader_in,
  },
  data() {
    return {
      loader: true,
      timeout: 5,
      selectedDate: new Date().toISOString(),
      current: {
        useService: '',
        name: '',
        data: {}
      },
      cfg: [],
      selects: [],
      select_current: '',
      minDate: new Date().toISOString(),
      textarea: {
          name: '',
          title: '',
          content: '',
          state: false,
      },
      errorConfig: false,
      error: {
        useService: false,
        txt: ''
        },

    }
  },
  created() {
      this.selectedDate = this.item.date
      
  },
  mounted() {
    this.getCfg();
  },
  methods: {
      getDefault(){
          this.current = {
            useService: '',
            name: '',
            data: {}
        };
          this.selectedDate = this.item.date;
          this.timeout = 5;
          this.select_current = '';
      },

    getCfg() {
      this.$axios({
        method: 'get',
        url: g.baseUrl+g.cfg,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(result => {
        if ( result.data.success ) {
            this.getStore(result.data.response);
        } else {
            this.errorConfig = true
            this.$notify({
                title: 'Упс, что-то пошло не так!',
                type: 'error'
            });
        }
      }).finally(() => {

      });
    },
    getStore(cfg) {
      this.cfg = cfg;
      for (let i = 0; i < cfg.length; i++) {
        this.selects[i] = {
          _id: cfg[i]._id,
          name: cfg[i].name,
          type: cfg[i].useService
        }
      }
      this.loader = false;
    },
    getCurrent(i) {
      for (let j = 0; j < this.cfg.length; j++) {
        if (i === this.cfg[j]._id) {
          this.current.useService = this.cfg[j].useService;
          this.current.id = this.cfg[j]._id;
          if (this.cfg[j].useService === 'skb') {
            this.current.name = 'SmartCallback.ru';
            this.current.data = this.cfg[j].smartCallback;
          } else {
            this.current.name = 'CoMagic.ru';
            this.current.data = this.cfg[j].coMagic;
          }
          break;
        }
      }
    },


    getCallback() {
      if (this.current.useService !== '' && this.timeout !== '' && this.selectedDate !== null) {
          let body;
        if (this.current.useService === 'skb') {
          body = {
            leadId: this.item._id,
            cfgId: this.current.id,
            useService: this.current.useService,
            smartCallback: {
              text_without: this.current.data.text_without,
              text_with: this.current.data.text_with
            },
            phone: this.item.phone.toString(),
            timeout: this.timeout,
            date: this.selectedDate
          }
        } else if (this.current.useService === 'co') {
          body = {
            leadId: this.item._id,
            cfgId: this.current.id,
            useService: this.current.useService,
            coMagic: {
              employee_msg: this.current.data.employee_msg
            },
            phone: this.item.phone.toString(),
            timeout: this.timeout,
            date: this.selectedDate
          }
        }
        this.$axios.post(g.baseUrl+g.callback,body).finally(() => {
          this.getDefault();
          this.statePopup(false);
        });

      } else {
        this.errorWarning('useService', 'все поля');
      }

    },

    stateTextarea(state){
        this.textarea.state = state;
    },
    editTextarea(name,title,content,state){
        this.textarea={
            name:name,
            title: title,
            content:content,
            state: state
        }
    },
    saveTextarea(textarea){
        this.textarea.state=false;
        this.current.data[textarea.name] = textarea.content;

    },


    statePopup(value) {
      this.$emit('emitPopup', value)
    },
    typeConfig(value) {
     this.select_current = value.name;
      this.getCurrent(value._id);
    },
    errorWarning(item, content) {
      this.error[item] = true;
      this.error['txt'] = "Заполните " + content + ", перед тем, как создавать перезвон."
      setTimeout(() => {
        this.error[item] = false;
      }, 2500);
    },
  }
}
</script>

<style lang="scss">
@import './popup.scss';
@import './time-picker.scss';

.callback {
    border-bottom: 2px solid #ddd;
    padding-bottom: 5px;
    line-height: 1.3;
    width: 100%;
    b {
        font-weight: bold
    }
}

.user-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    b {
        font-weight: bold
    }
}

.text-error {
    line-height: 1.3;
    color: #f33f3f;
}
</style>
