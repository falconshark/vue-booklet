<template>
  <div class="vue-booklet">
    <div class="book closed" ref="book">
      <div class="cover-before" />
      <Pages :opened="opened">
        <slot></slot>
      </Pages>
    </div>
    <div class="book-control-buttons">
      <div role="button" tabindex="0" class="book-control-button prev" v-show="!front"  v-on:keyup.enter="prevPage" v-on:click="prevPage">
        Prev
      </div>
      <div role="button" tabindex="0" class="book-control-button next" v-show="!back"  v-on:keyup.enter="nextPage" v-on:click="nextPage">
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
      const content = book.querySelector('.content');
      this.opened = true;
      book.classList.add('opened');
      book.classList.remove('closed');
    });

    // Book page fliped event
    this.$on('onFlip', (page, direction) => {
      const content = page.querySelector('.content');
      if (this.checkHavePrev(page, content)) {
        this.front = false;
      } else {
        this.front = true;
      }

      if (this.checkHaveNext(page, content)) {
        this.back = false;
      } else {
        this.back = true;
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
      const page = document.getElementsByClassName('currentPage')[0];

      // If user click on cover and book not opened
      if (page.classList.contains('cover') && !this.opened) {
        this.$emit('onOpened');
      }

      page.classList.add('fliped');
      this.$emit('onFlip', page, 'next');

      setTimeout(() => {
        // If this page have next page, set it to current page
        if (page.nextElementSibling) {
          page.style.zIndex = '1';
          page.classList.remove('currentPage');
          page.nextElementSibling.style.zIndex = '2';
          page.nextElementSibling.classList.add('currentPage');
        }
      }, 200);
    },
    prevPage() {
      const page = document.getElementsByClassName('currentPage')[0];
      this.$emit('onFlip', page, 'prev');

      // If user click on cover and book not opened
      if (page.previousElementSibling) {
        if (page.previousElementSibling.classList.contains('cover') && this.opened) {
          this.$emit('onClosed');
        }
        // If book is not on back
        if (!this.back) {
          page.style.zIndex = '1';
          page.classList.remove('currentPage');
          page.previousElementSibling.style.zIndex = '2';
          page.previousElementSibling.classList.add('currentPage');
          page.previousElementSibling.classList.remove('fliped');
        } else {
          page.classList.remove('fliped');
        }
      }
    },
    // Check this page had next page
    checkHaveNext(page, content) {
      if(!page.classList.contains('fliped')){
        if(page.nextElementSibling || content.nextElementSibling){
          return true;
        }
      }else{
        if(page.nextElementSibling){
          return true;
        }
      }

      return false;
    },
    // Check this page had previous page
    checkHavePrev(page, content) {
      if (page.classList.contains('cover') && this.opened === true) {
        return true;
      }

      if (page.previousElementSibling || content.previousElementSibling) {
        return true;
      }

      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
*{
  box-sizing: border-box;
}
</style>
