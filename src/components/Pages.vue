<template>
  <div class="pages" ref="pages" v-on:click="flip">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Pages',
  mounted() {
    // Init page index
    const pages = document.getElementsByClassName('page');
    const firstPage = pages[0];
    const lastPage = pages[pages.length - 1];

    firstPage.classList.add('firstPage');
    firstPage.classList.add('currentPage');
    firstPage.style.zIndex = '2';
    lastPage.classList.add('lastPage');
  },
  props: {
    opened: false,
  },
  data() {
    return {
      clickable: true,
    };
  },
  methods: {
    flip(e) {
      if (this.clickable) {
        if (e.target.classList.contains('page')) {
          this.clickable = false;
          const clickedPage = e.target;
          const currentPage = document.getElementsByClassName('currentPage')[0];
          currentPage.classList.remove('currentPage');
          clickedPage.classList.add('currentPage');

          // If user click on cover and book not opened
          if (clickedPage.classList.contains('cover') && !this.opened) {
            this.$parent.$emit('onOpened');
          }

          // If user click on cover and book opened
          if (clickedPage.classList.contains('cover') && this.opened) {
            this.$parent.$emit('onClosed');
          }

          // If page is fliped, change the z-index to 1 and next page to 2
          if (!clickedPage.classList.contains('fliped')) {
            clickedPage.classList.add('fliped');

            //Set timeout to avoid flip animation broken
            setTimeout(() => {
              clickedPage.style.zIndex = '1';
              if (clickedPage.nextElementSibling) {
                clickedPage.nextElementSibling.style.zIndex = '2';
              }
            }, 200);

            //Set timeout to avoid user click too fast
            setTimeout(() => {
              this.clickable = true;
              this.$parent.$emit('onFlip');
            }, 400);

          } else {
            // Undo fliped
            clickedPage.classList.remove('fliped');

            setTimeout(() => {
              this.clickable = true;
              clickedPage.style.zIndex = '2';

              if (clickedPage.nextElementSibling) {
                clickedPage.nextElementSibling.style.zIndex = '1';
              }
            }, 200);

            setTimeout(() => {
              this.$parent.$emit('onFlip');
              this.clickable = true;
            }, 400);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
*{
  box-sizing: border-box;
}
</style>
