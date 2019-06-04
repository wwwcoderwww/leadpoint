<template>
    <div class="s_center">
        <loader-in v-if="loader" />
        <div v-else class="s_popup">
            <div @click="$emit('statePopup', false)" class="s_popup__close"><span></span></div>
            <div class="s_popup__head">
                <h2>История перезвонов</h2>
            </div>
            <div class="s_popup__body s_popup__body-normal">
                <div class="s_popup__btn s_popup__btn--row">
                    <div class="btn" v-if="!haveTarget" @click="createHistory">Отметить как целовой</div>
                </div>
                <table v-if="history.length != 0"  class="table-history">
                    <thead>
                        <tr>
                            <th>Статус</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in history" :key="item">
                            <td>{{ getStatus(item.status) }}</td>
                            <td>{{formatDate(item.createdAt)}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import g from './../constants/index';
import loader_in from './../loader';
import _ from 'lodash';

export default {
    props: ['id'],
    components: {
        'loader-in': loader_in,
    },
    data() {
        return {
            history: [],
            loader: true,
            haveTarget: false
        }
    },
    methods: {
        getStatus(status) {
            if ( status.toLowerCase() == 'target' ) {
                return "Целевой"
            } else if ( status.toLowerCase() == 'processed' ) {
                return "Обработано"
            } else if ( status.toLowerCase() == 'not processed' ) {
                return "Не обработано"
            }
        },
        formatDate(value){
            let d = new Date(value);
            let day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate(),
            month = d.toLocaleString('ru', {month: 'long'}),
            formatDate = day + " " + month + " " + d.getFullYear()+'г.',
            hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours(),
            minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes(),
            formatTime = hours + ":" + minutes+' '+formatDate;
            return formatTime;
        },
        createHistory() {
            this.$axios({
                method: 'post',
                url: g.baseUrl+'history',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "leadId": this.id,
                    "status": "target"
                }
            }).then( (result) => {
                if ( result.data.success == true ) {
                    this.haveTarget = []
                    this.$axios({
                        method: 'get',
                        url: g.baseUrl+this.id,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then( (result) => {
                        this.history = result.data.response.history
                        this.loader = false
                    })   
                } else {
                    this.$notify({
                        title: 'Упс, что-то пошло не так!',
                        type: 'error'
                    });
                }
            })
        }
    },
    created() {
        let id = 'history/' + this.id
        this.$axios({
            method: 'get',
            url: g.baseUrl+id,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( (result) => {
            this.history = result.data.response.history
            this.haveTarget = _.find( result.data.response.history, ( item ) => {
                return item.status == 'target' ? true : false
            })
            this.loader = false
        })
    }
}
</script>

<style lang="scss">
@import './popup.scss';
.s_popup__body-normal {
    justify-content: flex-start !important;
    .s_popup__btn .btn:hover {
        background: #3d9abb !important
    }
}

.text-error {
    margin-top: 10px;
    color: #f33f3f
}

.s_popup__btn--row {
    flex-direction: column;
    align-items: center;
}

.table-history {
    width: 100%;
    thead {
        tr {
            line-height: 45px;
            th {
                font-weight: bold;
            }
        }
    }
    tbody {
        tr {
            text-align: center;
            line-height: 30px;
        }
    }
}
</style>
