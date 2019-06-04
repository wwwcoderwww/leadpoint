<template>
<div class="filter-row">
   <div class="select-wrap">
    <multiselect v-model="objects" 
        :options="filters['objects']"
        :multiple="true" 
        :close-on-select="false" 
        :clear-on-select="false" 
        :preserve-search="true" 
        placeholder="Укажите обьект" 
        selectLabel=""
        deselectLabel=""
        selectedLabel=""
        @input="getObjects"
        >
        <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.toString() }}</span></template>
    </multiselect>
  </div>

   <div class="select-wrap" >
    <multiselect v-model="sources" 
        :options="filters['sources']"
        :multiple="true" 
        :close-on-select="false" 
        :clear-on-select="false" 
        :preserve-search="true" 
        placeholder="Укажите источники" 
        selectLabel=""
        deselectLabel=""
        selectedLabel=""
        @input="getSource"
        >
        <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.toString() }}</span></template>
    </multiselect>
   </div>

   <div class="select-wrap" >
    <multiselect v-model="providers" 
        :options="filters['providers']"
        :multiple="true" 
        :close-on-select="false" 
        :clear-on-select="false" 
        :preserve-search="true" 
        placeholder="Укажите провайдера" 
        selectLabel=""
        deselectLabel=""
        selectedLabel=""
        @input="getProvider"
        >
        <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.toString() }}</span></template>
    </multiselect>
   </div>
</div>
</template>

<script>
    import Multiselect from 'vue-multiselect'
   export default {
      props: ['filters'],
      components: {
        Multiselect
      },
      data() {
         return {
            sources: [],
            objects: [],
            providers: []
         }
      },
      methods: {
        getSource() {
            this.$emit('emitFilters', this.objects, this.sources, this.providers);
        },
        getObjects() {
            this.$emit('emitFilters', this.objects, this.sources, this.providers);
        },
        getProvider() {
            this.$emit('emitFilters', this.objects, this.sources, this.providers);
        },
     },
   }

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import './selects.scss';
.filter-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .select-wrap {
        width: 100%;
        margin-right: 30px;
    }
    .multiselect__option--highlight {
        background: #39A6C8
    }
}
</style>