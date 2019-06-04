<template lang="html">
      <div class="s_section">
          <loader-in v-if="loader"/>
          <div class="s_section__wrap" :class="{'loader': loader, 'opacity': popup.state}">
              <div class="s_section__head">
                  <div class="s_section__head_url">
                      <router-link to="/home" class="logo">Leadpoint.<q>ru</q></router-link>
                      <router-link to="/home">Home</router-link>
                  </div>
                  <div class="s_section__head_profile">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="36" height="36"><path d="M150 0C67.2 0 0 67.2 0 150c0 82.8 67.2 150 150 150s150-67.2 150-150C300 67.2 232.8 0 150 0zM150.5 220.8v0h-0.9H85.5c0-46.9 41.2-46.8 50.3-59.1l1-5.6c-12.8-6.5-21.9-22.2-21.9-40.5 0-24.2 15.7-43.7 35.1-43.7 19.4 0 35.1 19.6 35.1 43.7 0 18.2-8.9 33.8-21.6 40.4l1.2 6.3c10 11.7 49.8 12.4 49.8 58.5H150.5z" /></svg>
                      <div class="s_profile">
                         <div class="s_profile__content">
                              <h3 v-if="email">{{email}}</h3>
                             <div @click="getLogout" class="s_profile__exit">Выйти</div>
                         </div>
                      </div>
                  </div>
              </div>
              <div class="s_section__body">
                  <filter-in @emitSearch="getParameter" :filters="filters"/>
                  <table-in @emitPopup="statePopup" :leads="leads" :height="height" :loaderTable="loaderTable"/>
                  <pagination-in v-if="!loaderTable && leads !== null" :pagination="pagination" @emitPage="getParameter" @page="addPage"/>
              </div>
          </div>
          <popup-in v-if="popup.state":class="{'visible':popup.animate}"  @emitPopup="statePopup" />
      </div>
</template>

<script>
import g from './../constants/index';
import head from './../constants/header';
import axios from 'axios';

import test from './../../dev/lead'

import table_in from './../table/table';
import filter_in from './../filter/filter';
import pagination_in from './../pagination/pagination';
import popup_in from './../popup/popup.test';

import loader_in from './../loader';
export default {
  components: {
    'table-in': table_in,
    'loader-in': loader_in,
    'filter-in': filter_in,
    'popup-in': popup_in,
    'pagination-in': pagination_in
  },
  data() {
    return {
      loader: true,
      loaderTable: true,
      popup: {
        animate: false,
        state: false,
        load: false
      },
      leads: null,
      pagination: {},
      filters: {},
      parameters: {
        leadId: '',
        page: '',
        limit: 'limit=',
        phone: '',
        callback: '',
        name: '',
        object: '',
        source: '',
        date: ''
      },
      parameter: '?limit=6',
      push: '',
      height: 'auto',
      success: false,
    }
  },
  created() {
    this.getHeight();
    this.getLoader();
    this.getFilters();
    this.getLead();
  },
  methods: {
    getHeight() {
      if (window.innerWidth > 998) {
        let height_out = 74 + 74 + 38 + 25 + 50 + 20;
        let height = (window.innerHeight - height_out) / 65;

        this.height = (height.toFixed() * 65) + 74;
        this.parameters.limit = 'limit=' + height.toFixed();
        this.parameter = '?limit=' + height.toFixed();
      }
    },
    getLoadLead() {
      this.getFilters();
      this.getLead();
    },

     getLead() {
        this.loaderTable = true;

        this.success = test.success;

        this.pagination = test.response.pagination;

        let page = this.pagination.page,
         limit = this.pagination.limit;
        this.leads=[];
        for(let i=page-1;i<page*limit;i++){
            this.leads[i] = test.response.leads[i];
        }



        this.loaderTable = false;
    },
    getFilters() {
        this.$axios.get(g.baseUrl + g.filter).then(result => {
          this.success = result.data.success;
          this.filters = result.data.response;
        }).finally(() => {
          if (!this.success) {
            this.getRouter('/login');
          }
        });
    },

    getParameter(value, name) {
      let s = '',
        parameter = '',
        text = [];

      if (name === 'filters') {
        this.parameters['object'] = value.object;
        this.parameters['source'] = value.source;
      } else {
        this.parameters[name] = value;
      }

      if (name !== 'page') {
        this.parameters['page'] = 'page=1';
      }

      for (let i = 0; i < Object.keys(this.parameters).length; i++) {
        if (this.parameters[Object.getOwnPropertyNames(this.parameters)[i]] !== '') {
          text.push(this.parameters[Object.getOwnPropertyNames(this.parameters)[i]]);
        }
      }
      for (let i = 0; i < text.length; i++) {
        if (i == 0) {
          parameter += '?' + text[i];
        } else {
          parameter += '&' + text[i];
        }
      };
      this.parameter = parameter;
      this.getLead();
    },
    addPage(e) {
      this.pagination.page = e;
    },
    statePopup(value) {
      let one, two;
      if (value == true) {
        one = 'state';
        two = 'animate';
      } else {
        two = 'state';
        one = 'animate';
      }
      this.popup[one] = value;
      this.popup['load'] = true;
      setTimeout(() => {
        this.popup[two] = value;
        this.getLoadLead();
      }, 400);
    },
    getLoader() {
      setTimeout(() => {
        this.loader = false;
      }, 1000);
    },
    getLoaderTable() {
      this.loaderTable = true;
      setTimeout(() => {
        this.getLead();
        this.loaderTable = false;
      }, 1000);
    },
    getLogout() {
      this.$axios({
        method: 'post',
        url: g.baseUrl + g.logout,
        withCredentials: true,
        headers: head.headers
      }).then(result => {
        if (result.data.success) {
          this.getRouter('/login');
        }
      })
    },
    getRouter(item) {
      this.$router.push({
        path: item
      });
    }
  },
  computed: {
    email() {
      return this.$store.getters.storeEmail
    },
  }

}
</script>

<style lang="scss">
@import './home.scss';
</style>
