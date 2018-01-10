<template>
  <div class="pages" ref="pages">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Pages',
  props: {
    initPage: Function,
  },
  mounted () {
    this.initPage();
  }
};
</script>
