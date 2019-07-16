

<script>
    export default {
        data(){
            return{
                current:1,
                total:0,
                width:0
            }
        },
        methods:{
            next(){
                this.current = (this.current < this.total) ? this.current+1: 1;
                console.log(this.current);
                console.log('-' + (this.current-1)*this.width + 'px');
                this.$refs.line.style.marginLeft = '-' +  (this.current-1)*this.width + 'px';
            }
        },
        mounted(){
            let childs = this.$refs.line.querySelectorAll('.dio-item');
            this.total = childs.length;
            this.width = childs[0].offsetWidth;
        }
    }
</script>

<style scoped>

</style>