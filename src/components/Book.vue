<template>
  <div class="vue-booklet">
    <div class="book closed" ref="book">
      <div class="cover-before" />
      <Pages :opened="opened">
        <slot></slot>
      </Pages>
    </div>
    <div class="book-control-buttons">
      <div role="button" tabindex="0" class="book-control-button prev" v-show="!front"
      v-on:keyup.enter="prevPage" v-on:click="prevPage">
        Prev
      </div>
      <div role="button" tabindex="0" class="book-control-button next" v-show="!back"
      v-on:keyup.enter="nextPage" v-on:click="nextPage">
        Next
      </div>
    </div>
  </div>
</template>

<script>
import Pages from './Pages';

export default {
  name: 'Book',
  components: {
    Pages,
  },
  data() {
    return {
      opened: false,
      front: true,
      back: false,
    };
  },
  mounted() {
    // Book opened event
    this.$on('onOpened', () => {
      const book = this.$refs.book;
      this.opened = true;
      book.classList.add('opened');
      book.classList.remove('closed');
    });

    // Book page fliped event
    this.$on('onFlip', () => {
      const currentPage = document.getElementsByClassName('currentPage')[0];

      if (currentPage.classList.contains('firstPage') && !currentPage.classList.contains('fliped')){
        this.front = true;
      } else {
        this.front = false;
      }

      if (currentPage.classList.contains('lastPage') && currentPage.classList.contains('fliped')) {
        this.back = true;
      } else {
        this.back = false;
      }
    });

    // Book closed event
    this.$on('onClosed', () => {
      const book = this.$refs.book;
      this.opened = false;
      book.classList.add('closed');
      book.classList.remove('opened');
    });
  },
  methods: {
    nextPage() {
      const currentPage = document.getElementsByClassName('currentPage')[0];

      // If user click on cover and book not opened
      if (currentPage.classList.contains('cover') && !this.opened) {
        this.$emit('onOpened');
      }

      currentPage.classList.add('fliped');

      setTimeout(() => {
        // If this page have next page, set it to current page
        if (currentPage.nextElementSibling) {
          currentPage.style.zIndex = '1';
          currentPage.classList.remove('currentPage');
          currentPage.nextElementSibling.style.zIndex = '2';
          currentPage.nextElementSibling.classList.add('currentPage');
        }

        this.$emit('onFlip');
      }, 200);
    },
    prevPage() {
      const currentPage = document.getElementsByClassName('currentPage')[0];
      const prevPage = currentPage.previousElementSibling;

      // If user click on cover and book not opened
      if (prevPage) {
        if (prevPage.classList.contains('firstPage') && this.opened) {
          this.$emit('onClosed');
        }

        // If last page fliped, undo flip only
        if(currentPage.classList.contains('lastPage') && currentPage.classList.contains('fliped')){
          currentPage.classList.remove('fliped');
        }else{
          currentPage.style.zIndex = '1';
          currentPage.classList.remove('currentPage');
          prevPage.style.zIndex = '2';
          prevPage.classList.remove('fliped');
          prevPage.classList.add('currentPage');
         }
      }

      this.$emit('onFlip');
    },
  },
};
</script>
<style lang="scss" scoped>
*{
  box-sizing: border-box;
}
</style>
