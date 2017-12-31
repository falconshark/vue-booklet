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
      // If is cover, Set index to top
      if (page.classList.contains('cover')) {
        page.classList.add('currentPage');
        page.style.zIndex = '2';
      } else {
        page.style.zIndex = '1';
      }
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

            this.$parent.$emit('onFlip', clickedPage, 'next');

            //Set timeout to avoid flip animation broken
            setTimeout(() => {
              clickedPage.style.zIndex = '1';
              if (clickedPage.nextElementSibling) {
                clickedPage.classList.remove('currentPage');
                clickedPage.nextElementSibling.classList.add('currentPage');
                clickedPage.nextElementSibling.style.zIndex = '2';
              }
            }, 200);

            //Set timeout to avoid user click too fast
            setTimeout(() => {
              this.clickable = true;
            }, 400);

          } else {
            // Undo fliped
            this.$parent.$emit('onFlip', clickedPage, 'back');

            clickedPage.classList.remove('fliped');

            setTimeout(() => {
              this.clickable = true;
              clickedPage.style.zIndex = '2';
              if (clickedPage.nextElementSibling) {
                clickedPage.nextElementSibling.style.zIndex = '1';
              }

              if (clickedPage.previousElementSibling) {
                clickedPage.classList.remove('currentPage');
                clickedPage.previousElementSibling.classList.add('currentPage');
              }
            }, 200);

            setTimeout(() => {
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
