<template lang="html">
    <div class="s_textarea">
        <div class="vdatetime-overlay" @click="stateTextarea(false)"></div>
        <div class="s_textarea__popup">
            <div class="s_textarea__header">
                <h2>{{textarea.title}}</h2>
            </div>
            <div class="s_textarea__body">
                <textarea :placeholder="textarea.title" autofocus rows="4" v-model="textarea.content"></textarea>
                <div class="s_textarea__btns">
                    <div class="btn" @click="saveTextarea(textarea)">Да</div>
                    <div class="btn" @click="stateTextarea(false)">Отменить</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['textarea'],
    methods:{
        stateTextarea(state){
            this.$emit('emitStateTextarea',state);
        },
        saveTextarea(textarea){
            this.$emit('emitSaveTextarea',textarea);
        }
    }
}
</script>

<style lang="scss">
.s_textarea{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999999999999;
    display: flex;
    justify-content: center;
    align-items: center;
    .vdatetime-overlay{
        animation: opacitys .2s;
        animation-timing-function: ease-in-out;
    }

    &__popup{
        box-sizing: border-box;
        z-index: 1000;
        position: fixed;
        min-width: 500px;
        width: 50%;
        max-width: calc(100% - 30px);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .3);
        color: #444;
        background: #fff;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        border-radius: 3px;

        animation: shows .2s;
        animation-timing-function: ease-in;
    }
    &__header{
        background: #fff;
        padding: 10px 0;
        border-bottom: 2px solid #ddd;
        margin: 10px 20px;
        font-size: 32px;
        h2{
            font-size: 1.5rem;
            color: #6d6d6d;
            position: relative;
            font-weight: 600;
        }
    }
    &__body{
                padding: 0 20px 10px;
            textarea{
                margin: 5px 0 20px;
                font-size: 1rem;
                color: #6d6d6d;
                padding: 5px 7px;
                font-weight: 400;
                display: inline;
                width: 100%;
                border-radius: 5px;
            }
    }
    &__btns{
        display: flex;
        justify-content: center;
        padding: 0 20px 10px 30px;
        text-align: right;
        .btn{
            margin: 0 10px;
            font-size: 1em;
            padding: 10px 10px 9px;
            width: 100%;
            border: 1px solid #ddd;
            cursor: pointer;
            font-weight: 600;
            color: #6d6d6d;
            transition: 0.14s ease-in-out;
            text-align: center;
            max-width: 170px;
            &:first-of-type {
              &:hover {
                background: #3d9abb;
                color: #fff;
              }
            }

            &:last-of-type {
              &:hover {
                background: #f33f3f;
                color: #fff;
              }
            }
        }

    }

}
@keyframes shows {
  0% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  100% {
      opacity: 1;
  }
}

@keyframes opacitys {
  0% {
    opacity: 0;
  }
  100% {
      opacity: 1;
  }
}

@media only screen and (max-width: 767.5px) {
    .s_textarea__popup{
        min-width: auto;
        width: 100%;
        max-width: calc(100% - 30px);
    }

}
</style>
