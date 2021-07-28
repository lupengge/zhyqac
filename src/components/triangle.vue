<template>
  <span>
    <div class="mydiv" ref="mydiv"></div>
    <slot></slot>
  </span>
</template>

<script>
export default {
  props:{
    dirTo:String,
    sideLen:Number,
    colorFill:String,
  },
  mounted(){
    switch (this.dirTo) {
      case 'up':
        this.$refs.mydiv.style.borderLeft=this.sideLen+'px solid transparent';
        this.$refs.mydiv.style.borderRight=this.sideLen+'px solid transparent';
        this.$refs.mydiv.style.borderBottom=this.sideLen+'px solid '+this.colorFill;
        break;
      case 'down':
        this.$refs.mydiv.style.borderLeft=this.sideLen+'px solid transparent';
        this.$refs.mydiv.style.borderRight=this.sideLen+'px solid transparent';
        this.$refs.mydiv.style.borderTop=this.sideLen+'px solid '+this.colorFill;
        break;
      case 'right':
        this.$refs.mydiv.style.borderTop=this.sideLen+'px solid transparent';
        this.$refs.mydiv.style.borderBottom=this.sideLen+'px solid transparent';
        this.$refs.mydiv.style.borderLeft=this.sideLen+'px solid '+this.colorFill;
        break;
      case 'left':
        this.$refs.mydiv.style.borderTop=this.sideLen+'px solid transparent';
        this.$refs.mydiv.style.borderBottom=this.sideLen+'px solid transparent';
        this.$refs.mydiv.style.borderRight=this.sideLen+'px solid '+this.colorFill;
        break;
    }
  }
}
</script>

<style scoped>
  .mydiv{
    width: 0;
    height: 0;
    display: inline-block;
  }
</style>
