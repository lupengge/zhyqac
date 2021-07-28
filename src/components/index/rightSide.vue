<template>
  <div class="rightSide">
    <slot></slot>
  </div>
</template>

<script>
export default{

}
</script>

<style scoped>
  .rightSide{
    position: fixed;
    width: 20vw;
    height: calc(100% - 50px);
    bottom: 0;
    right: 0;
    height: calc(100% - 50px);
    /* background: linear-gradient(to right,rgb(0 0 0 / 83%),#0808086e); */
    background-color:rgba(0 0 0 / 83%);
    border-top-left-radius: 10px;
    z-index: 2;
  }
</style>
