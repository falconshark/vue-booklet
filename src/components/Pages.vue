<template>
  <div class="pages" ref="pages">
    <slot></slot>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar';

export default {
  name: 'Pages',
  props: {
    initPage: Function,
  },
  mounted () {
    this.initPage();
    this.initContent();
  },
  methods: {
    initContent(){
      const contents = document.getElementsByClassName('content');
      for(let i = 0; i < contents.length; i++){
        const content = contents[i];
        //const ps = new PerfectScrollbar(content);
      }
    },
  }
};
</script>
