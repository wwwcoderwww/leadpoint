<template lang="html">
    <div class="s_center">
        <div class="s_popup-comment">
            <div @click="statePopupComment(false)" class="s_popup-comment__close"><span></span></div>
            <div class="s_popup-comment__head">
                <h2>Комментарий</h2>
            </div>
            <div class="s_popup-comment__body">
                <p>{{contentPopupComment}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['contentPopupComment'],
  methods: {
    statePopupComment(state) {
      this.$emit('emitPopupComment', state, '')
    }
  }
}
</script>

<style lang="scss">
@import './popup-comment.scss';
</style>
