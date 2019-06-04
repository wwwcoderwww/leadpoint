<template lang="html">
<div>
    <div class="s_filter">
        <form class="s_filter__search">
            <input type="text" placeholder="Имя" v-model="parameters.name"/>
            <button class="btn" @click.prevent="getSearch(parameters.name, 'name')">Найти</button>
        </form>
        <form class="s_filter__search">
            <input type="text" placeholder="Телефон" v-model="parameters.phone"/>
            <button class="btn" @click.prevent="getSearch(parameters.name, 'phone')">Найти</button>
        </form>

        <div class="s_filter__date">
            <!-- <span >x</span> -->
            <v-date-picker class="btn" mode='range' v-model='selectedDate' :theme-styles='themeStyles' @input="getDate(selectedDate)" :class="{'null': selectedDate.start == null}" show-caps></v-date-picker>
        </div>
    </div>
    <div class="s_filter s_filter__provider" style="margin-bottom: 15px;">
        <selects-in :filters="filters" @emitFilters="getFilters"/>
    </div>
</div>
</template>

<script>
import selects_in from './../selects/selects'
export default {
    props: ['filters'],
    components: {
        'selects-in':selects_in
    },
    data(){
        return{
            selectedDate: {
                start: new Date,
                end: new Date
            },
            themeStyles: {
                weekdays: {
                  color: '#3d9abb',
              },
            },
            parameters: {
                name: '',
                phone: ''
            }
        }
    },
    methods: {
        getSearch(value, name){
            let search = ''+name+'='+value;
            this.$emit('emitSearch', search, name)
        },
        getFilters(object, source, providers){
            let value = '';
            if ( object !== '' ) {
                object = 'object='+object;
            } else {
                object = '';
            }
            if ( source !== '' ) {
                source = 'source='+source;
            } else {
                source = '';
            }
            if ( providers !== '' ) {
                providers = 'provider='+providers;
            } else {
                providers = '';
            }

            value = {
                object: object,
                source: source,
                provider: providers,
            }
            this.$emit('emitSearch',value,'filters')
        },
        getDate(item) {
            let start = item.start.toISOString(),
                end = item.end.toISOString(),
                date = 'dateStart=' +start+'&dateEnd='+end;

            this.$emit('emitSearch', date, 'date')
        },
    }
}
</script>

<style lang="scss">
@import './filter.scss';
</style>
