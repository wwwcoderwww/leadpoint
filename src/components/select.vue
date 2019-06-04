<template>
   <div class="t_select ss" :class="{'_active': state}" >
      <input class="t_select__label ss" v-model="search" @focus="openSelects">
      <div class="t_select__content" v-if="filteredList.length > 0">
         <div class="t_select__wrap">
             <div class="t_select__option" v-for="(select, i) in filteredList" @click="activeSelect(select)" :key="i">{{select.name}}</div>
         </div>
      </div>
  </div>
</template>

<script>
   export default {
      props: ['selects','select_current'],
      mounted() {
         const self = this
         window.addEventListener('click', function(e) {
            if (!e.target.parentNode.classList.contains('ss')) {
               self.close();
            }
         }, false)
      },
      data() {
         return {
            state: false,
            search: this.select_current
         }
      },
      methods: {
         openSelects() {
            this.state = !this.state
         },
         openSel() {
            this.state = true;
         },
         activeSelect(e) {
            this.search = e.name;
            this.$emit('emitSelect', e);
         },
         close(id) {
              this.state = false;
         }
     },
     computed: {
        filteredList() {
          return this.selects.filter(post => {
            return post.name.toLowerCase().includes(this.search.toLowerCase())
          })
        }
      }
   }

</script>

<style lang="scss">
$err: #f33f3f;
$valid: #3d9abb;
$txt: #6d6d6d;
$txt: #6d6d6d;
$txt_light: lighten($txt, 15%);
$txt_lg: lighten($txt, 5%);
$t: .07s;
.t_select{
    user-select: none;
    &._active {
       .t_select__content {
          z-index: 99999;
          opacity: 1;
          visibility: visible;
       }
       .t_select__option {
          transform: none;
          @for $n from 1 through 12 {
             &:nth-of-type(#{$n}) {
                animation: downs $t*$n;
                animation-timing-function: ease-out;
             }
          }
       }
       .t_select__label {
          opacity: .8;
          &:before {
             transform: rotate(180deg) translateY(1px);
          }
       }
    }
}
    .t_select__label{
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
        margin: 15px 0 0;
        position: relative;
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
           transition: .1s;
        }
    }
    .t_select__content{
        position: absolute;
        z-index: 999999;
        top: 94px;
        width: calc(100% - 40px);
        background: #fff;
        border-radius: 24px/22px;
        box-shadow: 0 0 10px 0 #c3c3c3;
        transition: $t*3;
        z-index: -1;
        opacity: 0;
        visibility: hidden;
        text-align: left;
    }
    .t_select__wrap{
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        overflow: auto;
            margin: 10px 15px 10px 10px;
        max-height: 190px;
    }
    .t_select__option{
        width: 100%;
        font-size: 1em;
        padding: 8px 10px 8px;
        color: $txt;
        z-index: 2;
        border: none;
        cursor: pointer;
        opacity: .9;
        transition: $t*1.5;
        &:hover{
            opacity: 1;
            background: #fff;
            box-shadow: 0 0 24px 0 rgba(39, 39, 39, 0.1);
            color: $valid;
        }

        &:first-of-type{
            padding-top: 15px;
        }
        &:last-of-type{
            padding-bottom: 15px;
        }
    }
@media only screen and (max-width: 767.5px) {
    .t_select__content{
        width: 100%;
    }
}
</style>
