<template lang="html">
    <div class="s_table"  :style="{height:height+'px'}">
        <div class="s_table__head">
            <div class="s_table__th">Провайдер</div>
            <div class="s_table__th">Телефон</div>
            <div class="s_table__th">Имя</div>
            <div class="s_table__th">Дата</div>
            <div class="s_table__th">Назначенное время</div>
            <div class="s_table__th">Источник</div>
            <div class="s_table__th">Обьект</div>
            <!-- <div class="s_table__th">Статус</div> -->
            <div class="s_table__th"></div>
        </div>
        <div class="s_table__body" v-if="!loaderTable && leads !== null">
            <div class="s_table__td" v-for="(item,i) in leads" :key="i">
                <div class="s_table__tr">
                    <q v-if="item.provider">{{item.provider}}</q>
                    <q v-else v-html="absent"></q>
                </div>
                <div class="s_table__tr">
                    <q v-if="item.phone">+{{formatNumber(item.phone)}}</q>
                    <q v-else v-html="absent"></q>
                    </div>
                <div class="s_table__tr">
                    <q v-if="item.name">{{item.name}}</q>
                    <q v-else v-html="absent"></q>
                </div>
                <div class="s_table__tr">
                    <q v-if="item.date">{{formatDate(item.createdAt)}}</q>
                    <q v-else v-html="absent"></q>
                </div>
                <div class="s_table__tr">
                    <q v-if="item.date">{{formatDate(item.date)}}</q>
                    <q v-else v-html="absent"></q>
                </div>
                <div class="s_table__tr">
                    <q v-if="item.source">{{item.source}}</q>
                    <q v-else v-html="absent"></q>
                </div>
                <div class="s_table__tr">
                    <q v-if="item.object">{{item.object}}</q>
                    <q v-else v-html="absent"></q>
                </div>
                <!-- <div class="s_table__tr">
                    <q v-if="item.object">{{(item.callback ) ? "Прозвонили" : ""}}</q>
                    <q v-else v-html="absent"></q>
                </div> -->
                <div class="s_table__tr">
                    <button @click="statePopupComment(true, item.comment)">Комментарий</button>
                    <button @click="[statePopup(true), $emit('setItemData', item)]">Перезвон</button>
                    <button @click="[popupHistory = true, id = item._id]">История</button>
                </div>
            </div>
        </div>
        <div class="s_table__null" v-else>
            <h2>Простите, по вашему запросу нет данных!</h2>
            <q v-html="absent"></q>
        </div>
        <popup-comment :class="{'visible':popupComment.state}" v-if="popupComment.state" :popup="popup" @emitPopupComment="statePopupComment" :contentPopupComment="popupComment.content"/>
        <PopupHistory :class="{'visible':popupHistory}" v-if="popupHistory" @statePopup="statePopup" :id="id"/>
    </div>
</template>

<script>
import popup_comment from './../popup-comment'
import PopupHistory from '../popup/PopupHistory'
export default {
  props: ['parameters', 'leads','loaderTable', 'height'],
  components: {
    'popup-comment': popup_comment,
    PopupHistory,
  },
  data() {
    return {
      popupHistory: false,
      id: '',
      popupComment: {
        state: false,
        content: ''
      },
      absent: '<svg viewBox="0 0 512 512" ><path d="M308.3 512H203.7c-8.4 0-15.2-6.8-15.2-15.2V370.2H125.5c-43 0-78-35-78-78V133.4c0-32 26-58 58-58s58 26 58 58v120.7h24.9V67.5C188.5 30.3 218.8 0 256 0c37.2 0 67.5 30.3 67.5 67.5v217h24.9v-70.1c0-32 26-58 58-58 32 0 58 26 58 58v108.1c0 43-35 78-78 78h-63v96.2C323.5 505.2 316.7 512 308.3 512z" data-original="#7FDC48" class="active-path" data-old_color="#3D9ABB" /><path d="M406.4 156.4c-32 0-58 26-58 58v70.1h-24.9V67.5c0-37.1-30.1-67.3-67.1-67.5v512h51.9c8.4 0 15.2-6.8 15.2-15.2v-96.2h63c43 0 78-35 78-78v-108.1C464.4 182.5 438.4 156.4 406.4 156.4z" data-original="#46A655" data-old_color="#3d9abb" /></svg>'
    }
  },
  methods: {
    statePopup(value) {
        this.popupHistory = false
      this.$emit('emitPopup', value)
    },
    statePopupComment(state, content) {
      this.popupComment = {
        state: state,
        content: content
      }
    },
    formatNumber(value) {
      let val = (value / 1).toFixed(0).replace('.', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    },
    formatDate(value){
         let d = new Date(value);
         let day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate(),
         //month = (d.getMonth() < 10) ? "0" + d.getMonth() : d.getMonth(),
         month = d.toLocaleString('ru', {month: 'long'}),
         formatDate = day + " " + month + " " + d.getFullYear()+'г.',
         hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours(),
         minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes(),
         formatTime = hours + ":" + minutes+' '+formatDate;
         return formatTime;
    }
  }
}
</script>

<style lang="scss">
@import './table.scss';
</style>
