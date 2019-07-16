<template>
    <div class="m-modal" :class="{opened: value}">
        <div class="m-modal-overlay" @click="close" v-if="showOverlay"></div>
        <div class="m-modal-dialog" ref="wrapper">
            <div class="m-modal-close-btn" v-if="showCloseBtn" @click="close"></div>
            <div class="m-modal-content" ref="content">
                <slot></slot>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['value', 'closeBtn', 'overlay', 'width', 'height'],
        data() {
            return {
                defaults: {
                    width: '570px',
                    height: '410px',
                    overlay: true,
                    closeBtn: true
                }
            }
        },
        methods: {
            close() {
                document.getElementById('player1').contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
                document.getElementById('player2').contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
                this.$emit('on-close');
                this.$emit('input',false);
            }
        },
        computed: {
            showOverlay() {
                return this.overlay !== undefined ? this.overlay : this.defaults.overlay;
            },
            window() {
                return {
                    width: this.width !== undefined ? this.width + 'px' : this.defaults.width,
                    _width: this.width !== undefined ? this.width : this.defaults.width,
                    height: this.height !== undefined ? this.height + 'px' : this.defaults.height,
                    _height: this.height !== undefined ? this.height : this.defaults.height,
                };
            },
            showCloseBtn() {
                return this.closeBtn !== undefined ? this.closeBtn : this.defaults.closeBtn;
            }
        },
        mounted() {
            this.$refs.content.style.width = this.window.width;
            this.$refs.content.style.height = this.window.height;
            this.$refs.wrapper.style.marginLeft = -Math.round(this.window._width / 2) + 'px';
            this.$refs.wrapper.style.marginTop = -Math.round(this.window._height / 2) + 'px';
        }

    }
</script>

<style lang="scss" scoped>
    .m-modal {
        .m-modal-overlay {
            content: "";
            display: none;
            background: rgba(0, 0, 0, 0.6);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
        }

        &.opened{
            display: block;
        }
        &.opened .m-modal-overlay {
            display: block;
        }

        &.opened .m-modal-dialog {
            -webkit-transform: translate(0, 0);
            -ms-transform: translate(0, 0);
            transform: translate(0, 0);
            //top: 20%;
            display: block;
            padding: 20px 0;
        }

        .m-modal-dialog {
            color: black;
            margin-left: -379px;
            text-align: center;
            position: fixed;
            left: 50%;
            top: 50%;
            z-index: 11;
            background: #003770;;
            border: 1px solid #003770;;
            box-sizing: border-box;
            box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 8px;
            -webkit-transform: translate(0, -500%);
            -ms-transform: translate(0, -500%);
            transform: translate(0, -500%);
            -webkit-transition: -webkit-transform 0.3s ease-out;
            -moz-transition: -moz-transform 0.3s ease-out;
            -o-transition: -o-transform 0.3s ease-out;
            transition: transform 0.3s ease-out;
            display: none;

            .m-modal-close-btn {
                background: url('/img/icon-close.png');
                cursor: pointer;
                position: absolute;
                top: 10px;
                right: 17px;
                width: 50px;
                height: 50px;
                border: 0;
                background-color: #003770;
            }
        }
    }

</style>