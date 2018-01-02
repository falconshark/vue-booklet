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
    for (let i = 0; i < pages.length; i += 1) {
      const page = pages[i];
      const lastPage = pages[pages.length - 1];
      // If is cover, Set index to top
      if (page.classList.contains('cover')) {
        page.classList.add('firstPage');
        page.classList.add('currentPage');
        page.style.zIndex = '2';
      } else {
        page.style.zIndex = '1';
      }
      lastPage.classList.add('lastPage');
    }
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

          this.$parent.$emit('onFlipStart', clickedPage, 'next');

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
              this.$parent.$emit('onFlipEnd', clickedPage, 'back');
            }, 400);

          } else {
            // Undo fliped
            this.$parent.$emit('onFlipStart', clickedPage, 'back');
            clickedPage.classList.remove('fliped');

            setTimeout(() => {
              this.clickable = true;
              clickedPage.style.zIndex = '2';

              if (clickedPage.nextElementSibling) {
                clickedPage.nextElementSibling.style.zIndex = '1';
              }
            }, 200);

            setTimeout(() => {
              this.$parent.$emit('onFlipEnd', clickedPage, 'back');
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
