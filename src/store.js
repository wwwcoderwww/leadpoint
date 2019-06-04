import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    debug: true,
    state: {
        email: '',
        filters:{
            sources: 'Все',
            objects: 'Все',
            providers: 'Все',
        }
    },
    getters: {
      storeFilters: state => state.filters,
      storeEmail: state => state.email,
    },
    actions: {
        getFilters(context, parameters) {
            context.commit('getFilters', parameters);
        },
        getEmail(context,parameters){
            context.commit('getEmail', parameters);
        }
        //loadUserInfo(context) {}
    },
    mutations:{
        getFilters(state, value) {
          state.filters = value
        },
        getEmail(state, value){
            state.email = value
        }
    }
});
