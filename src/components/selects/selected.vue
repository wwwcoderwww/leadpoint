<template>
<div class="t_selected ss _active" :class="['_'+name]">
  <!-- <div class="t_selected__label ss" :class="['_'+name]" @click="openSelects"><span>{{label}}</span></div> -->
  <div class="t_selected__content-inside ss">
      <div class="t_selected__option ss" @click="activeSelect('Все', name)" >Все</div>
    <div class="t_selected__option ss" v-for="(select, i) in selects" @click="activeSelect(select, name)" :key="i">{{select}}</div>
  </div>
</div>
</template>

<script>
export default {
  props: ['selects', 'name', 'label'],
  mounted() {
    const self = this
    window.addEventListener('click', function(e) {
      if (!e.target.parentNode.classList.contains('_'+self.name)) {
        self.close();
      }
    }, false)
  },
  data() {
    return {
      state: false
    }
  },
  methods: {
    openSelects() {
      this.state = !this.state
    },
    activeSelect(e, name) {
      this.$emit('emitSelected', e, name);
    },
    close() {
      this.state = false;
    }
  }
}
</script>

<style lang="scss">
$err: #f33f3f;
$valid: #3d9abb;
$txt: #6d6d6d;
$t: 0.07s;

.t_selected{
    user-select: none;
    position: relative;
    width: 100%;
    &._active {
       .t_selected__content {
           z-index: 99999;
           opacity: 1;
           visibility: visible;
       }
       .t_selected__option {
           transform: none;
           @for $n from 1 through 12 {
               &:nth-of-type(#{$n}) {
                   animation: downs $t*$n;
                   animation-timing-function: ease-out;
               }
           }
       }
       .t_selected__label {
           opacity: 0.8;
           &:before {
               transform: rotate(180deg) translateY(1px);
           }
       }
   }
   &__label {
       border-radius: 24px/22px;
       overflow: hidden;
       box-shadow: 0 0 10px 0 #c3c3c3;
       display: -webkit-flex;
       display: -ms-flex;
       display: flex;
       transition: $t*2 ease-out;
       width: 100%;

       font-size: 1em;
       font-weight: 500;
       padding: 10px 20px;
       color: $txt;
       z-index: 2;
       border: none;
       margin: 0 0 15px ;
       position: relative;
       cursor: pointer;
       &:before {
           content: '';
           position: absolute;
           width: 0;
           height: 0;
           border-left: 4px solid transparent;
           border-right: 4px solid transparent;
           border-top: 6px solid rgba(0, 0, 0, 0.6);
           right: 15px;
           bottom: 14px;
           transition: 0.1s;
       }
   }
  &__content {
       position: absolute;
       z-index: 999999;
       top: 40px;
       width: 100%;
       background: #fff;
       border-radius: 24px/22px;
       box-shadow: 0 0 10px 0 #c3c3c3;
       display: -webkit-flex;
       display: -ms-flex;
       display: flex;
       justify-content: center;
       align-items: center;
       flex-direction: column;

       transition: $t*3;
       z-index: -1;
       opacity: 0;
       visibility: hidden;
       text-align: left;
       max-height: 300px;
       overflow: auto;
   }
   &__option {
       width: 100%;
       font-size: 1em;
       padding: 8px 20px;
       color: $txt;
       z-index: 2;
       border: none;
       cursor: pointer;
       opacity: 0.9;
       transition: $t*1.5;
       &:hover {
           opacity: 1;
           background: #fff;
        //    box-shadow: 0 0 24px 0 rgba(39, 39, 39, 0.1);
           color: $valid;
       }

       &:first-of-type {
           padding-top: 15px;
       }
       &:last-of-type {
           padding-bottom: 15px;
       }
   }
}
// .t_select {
//
//
// }
// .t_select
// }
// .t_select
// .t_select
</style>
