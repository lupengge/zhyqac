<template>
  <div class="leftSide">
    <slot></slot>
  </div>
</template>

<script>

export default {
  components:{

  },
}
</script>

<style>
  .leftSide{
    position: fixed;
    width: 20vw;
    height: calc(100% - 50px);
    bottom: 0;
    left: 0;
    /* background: linear-gradient(to left,rgb(0 0 0 / 83%),#0808086e); */
    background-color:rgba(0 0 0 / 83%);
    border-top-right-radius: 10px;
    z-index: 2;
  }

</style>
