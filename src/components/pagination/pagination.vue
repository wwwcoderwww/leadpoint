<template lang="html">
    <div class="s_pagination">
        <div class="s_pagination__left" @click="prev" :class="{'default': pagination.page == 1}">&laquo;</div>
        <div class="s_pagination__section" :style="{width: widthWindow+'px'}">
          <!--  @mousedown.prevent="getMousedown" @mouseup.prevent="getMouseup" -->
            <div class="s_pagination__wrp" :style="{'transform': 'translateX(-'+transform+'px)'}">
                <div 
                  v-for="item in pagination.pages" 
                  :key="item" class="s_pagination__numb" 
                  :class="[{'current':item  == pagination.page}]" 
                  @click="addPage(item)"
                >
                    <span>{{item}}</span>
                </div>
            </div>
        </div>
        <div class="s_pagination__right" @click="next" :class="{'default': pagination.page == pagination.pages}">&raquo;</div>
    </div>
</template>

<script>
export default {
  props: ['pagination'],
  data() {
    return {
      transform: 0,
      mousedown: 0,
      mouseup: 0,
      widthWindow: 0
    }
  },
  created() {
    this.paginationWidth(this.pagination.pages);
  },
  methods: {
    // getMousedown(event) {
    //   let x = event.clientX;
    //   this.mousedown = x;
    // },
    // getMouseup(event) {
    //   let x = event.clientX;

    //   let result = ((((this.mousedown - x) * 2) / 50).toFixed(0) * 50);
    //   let max = 50 * (this.pagination.pages - 5);
    //   let trans = this.transform + result;
    //   if (trans < 0) {
    //     this.transform = 0;
    //   } else if (trans > max) {
    //     this.transform = max;
    //   } else {
    //     this.transform += result;
    //   }
    // },
    prev() {
      this.getPagination(1)
    },
    next() {
      this.getPagination(this.pagination.pages)
    },
    addPage(e) {
      this.getPagination(e)
    },
    getPagination(e) {
      let transform = 0,
        page;
      if (e < 3) {
        transform = 0;
      } else if (e > (this.pagination.pages - 2)) {
        transform = 50 * (this.pagination.pages - 5);
      } else {
        transform = (e - 3) * 50;
      }
      this.transform = transform;
      if (e == 1) {
        page = '';
      } else {
        page = 'page=' + e;
      }

      this.$emit('emitPage', page, 'page')
      this.$emit('page', e);

    },
    paginationWidth(pages) {
      let oneSet = 50,
        indentation = 10,
        accessible = 5,
        fullSet = (accessible * oneSet) + indentation;

      if (pages > 5) {
        this.widthWindow = 260;
      } else {
        this.widthWindow = (oneSet * pages) + 10;
      }
    }
  }
}
</script>

<style lang="scss">
@import './pagination.scss';
</style>
