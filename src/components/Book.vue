<template>
  <div class="vue-booklet">
    <div class="book closed" ref="book">
      <div class="cover-before" />
      <Pages :opened="opened" :initPage="initPage">
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
      clickable: true,
    };
  },
  mounted() {
    const book = this.$refs.book;

    // Book opened event
    this.$on('onOpened', () => {
      this.opened = true;
      book.classList.add('opened');
      book.classList.remove('closed');
    });

    // Book page fliped event
    this.$on('onFlipStart', (direction) => {
      const currentPage = document.getElementsByClassName('currentPage')[0];
    });

    this.$on('onFlipEnd', (direction) => {
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
      this.initPage();
      book.classList.add('closed');
      book.classList.remove('opened');
    });
  },
  methods: {
    initPage(){
      const pages = document.getElementsByClassName('page');
      const firstPage = pages[0];
      const lastPage = pages[pages.length - 1];

      firstPage.classList.add('firstPage');
      firstPage.classList.add('currentPage');

      for(let i = 0; i < pages.length; i++){
        const index = i + 1;
        const page = pages[i];
        if(index % 2 === 0){
          page.classList.add('oven');
        }else{
          page.classList.add('odd');
        }
      }
      firstPage.style.zIndex = '3';
      firstPage.nextElementSibling.style.zIndex = '2';
      lastPage.classList.add('lastPage');
    },
    nextPage() {
      const currentPage = document.getElementsByClassName('currentPage')[0];

      if(this.clickable){
        this.clickable = false;
        // If user click on cover and book not opened
        if (currentPage.classList.contains('cover') && !this.opened) {
          this.$emit('onOpened');
        }

        currentPage.classList.add('fliped');
        this.$emit('onFlipStart', 'next');

        // If this page have next page, set it to current page

        setTimeout(() => {
          if (currentPage.nextElementSibling) {
            currentPage.removeAttribute('style');
            currentPage.classList.remove('currentPage');
            currentPage.nextElementSibling.style.zIndex = '3';
            currentPage.nextElementSibling.classList.add('currentPage');
          }
        }, 400);

        setTimeout(() => {
          this.clickable = true;
          this.$emit('onFlipEnd', 'next');
        }, 400);
      }
    },
    prevPage() {
      const currentPage = document.getElementsByClassName('currentPage')[0];
      const prevPage = currentPage.previousElementSibling;

      if(this.clickable){
        this.clickable = false;
        this.$emit('onFlipStart', 'back');

        // If user click on cover and book not opened
        if (prevPage) {
          // If last page fliped, undo flip only
          if(currentPage.classList.contains('lastPage') && currentPage.classList.contains('fliped')){
            currentPage.classList.remove('fliped');
          }else{
            currentPage.removeAttribute('style');
            currentPage.classList.remove('currentPage');
            prevPage.style.zIndex = '3';
            prevPage.classList.remove('fliped');
            prevPage.classList.add('currentPage');
           }

           if (prevPage.classList.contains('firstPage') && this.opened) {
             this.$emit('onClosed');
             currentPage.style.zIndex = '2';
           }
        }

        setTimeout(() => {
          this.clickable = true;
          this.$emit('onFlipEnd', 'back');
        }, 400);
      }
    },
  },
};
</script>
