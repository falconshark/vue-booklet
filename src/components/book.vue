<template>
  <div class="vue-booklet">
    <div class="book closed" ref="book">
      <Pages :opened="opened" :initPage="initPage">
        <slot></slot>
      </Pages>
    </div>
    <div class="book-control-buttons">
      <button tabindex="0" class="book-control-button prev" v-show="!front"
      v-on:keyup.enter="prevPage" v-on:click="prevPage">
        Prev
      </button>
      <button tabindex="0" class="book-control-button next" v-show="!back"
      v-on:keyup.enter="nextPage" v-on:click="nextPage">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import Pages from './pages';

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
  props: {
    pageTransitionTime: {
      type: Number,
      default: 0.8,
    },
    onOpened:{
      type: Function,
      default: () => {},
    },
    onFlipStart: {
      type: Function,
      default: () => {},
    },
    onFlipEnd: {
      type: Function,
      default: () => {},
    },
    onClosed: {
      type: Function,
      default: () => {},
    }
  },
  mounted() {
    const book = this.$refs.book;

    // Book opened event
    this.$on('onOpened', (position) => {
      this.opened = true;
      book.classList.add('opened');
      book.classList.remove('closed');
      this.onOpened(book, position);
    });

    // Book page fliped event
    this.$on('onFlipStart', (direction) => {
      const currentPage = document.getElementsByClassName('currentPage')[0];
      const hiddenPages = this.getAllNextPage(currentPage);
      hiddenPages.forEach((page) => {
        if(!page.classList.contains('lastPage')){
          page.style.zIndex = '-1';
        }else{
          page.style.zIndex = '-3';
        }
      });
      if(currentPage.classList.contains('firstPage')){
        currentPage.nextElementSibling.style.zIndex = '2';
      }
      this.onFlipStart(currentPage, direction);
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

      this.onFlipEnd(currentPage, direction);
    });

    // Book closed event
    this.$on('onClosed', (position) => {
      const book = this.$refs.book;
      this.opened = false;

      book.classList.remove('opened');

      if(position === 'back'){
        book.classList.remove('closed');
        book.classList.add('closed-back');
      }else{
        book.classList.remove('closed-back');
        book.classList.add('closed');
      }

      this.onClosed(book, position);
    });
  },
  methods: {
    initPage(){
      const pages = document.getElementsByClassName('page');
      const firstPage = pages[0];
      const lastPage = pages[pages.length - 1];
      const pageTransitionTime = this.pageTransitionTime;

      firstPage.classList.add('firstPage');
      firstPage.classList.add('currentPage');

      for(let i = 0; i < pages.length; i++){
        const index = i + 1;
        const page = pages[i];
        page.style.zIndex = '-1';
        page.style.transition = 'transform ' + pageTransitionTime + 's';
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
      const nextPage = currentPage.nextElementSibling;
      const timeOut = this.pageTransitionTime * 4 * 100;

      if(this.clickable){
        this.clickable = false;
        // If current page is first page and book not opened
        if (currentPage.classList.contains('firstPage') && !this.opened) {
          this.$emit('onOpened', 'front');
        }

        if (currentPage.classList.contains('lastPage') && this.opened) {
          this.$emit('onClosed', 'back');
        }

        currentPage.classList.add('fliped');
        this.$emit('onFlipStart', 'next');

        setTimeout(() => {
          // If this page have next page, set it to current page
          if (nextPage) {
            nextPage.style.zIndex = '3';
            currentPage.style.zIndex = '1';
            currentPage.classList.remove('currentPage');
            nextPage.classList.add('currentPage');
          }
          this.clickable = true;
          this.$emit('onFlipEnd', 'next');
        }, timeOut);
      }
    },
    prevPage() {
      const currentPage = document.getElementsByClassName('currentPage')[0];
      const prevPage = currentPage.previousElementSibling;
      const timeOut = this.pageTransitionTime * 4 * 100;

      if(this.clickable){
        this.clickable = false;
        this.$emit('onFlipStart', 'back');

        // If user click on cover and book not opened
        if (prevPage) {
          // If last page fliped, undo flip only
          if(currentPage.classList.contains('lastPage') && currentPage.classList.contains('fliped')){
            currentPage.classList.remove('fliped');
          }else{
            currentPage.style.zIndex = '1';
            currentPage.classList.remove('currentPage');
            prevPage.style.zIndex = '3';
            prevPage.classList.remove('fliped');
            prevPage.classList.add('currentPage');
           }

           //If previous page is first page and book not opened, close the book
           if (prevPage.classList.contains('firstPage') && !prevPage.classList.contains('fliped') && this.opened) {
             this.$emit('onClosed', 'front');
             currentPage.style.zIndex = '2';
           }

           //If current page is last page , book not opened and it is not filped, open the book
           if (currentPage.classList.contains('lastPage') && !currentPage.classList.contains('fliped') && !this.opened) {
             this.$emit('onOpened', 'back');
           }
        }

        setTimeout(() => {
          this.clickable = true;
          this.$emit('onFlipEnd', 'back');
        }, timeOut);
      }
    },
    getAllNextPage(currentPage){
      const pages = [];
      let nextPage = currentPage.nextElementSibling;
      while (nextPage) {
        pages.push(nextPage);
        nextPage = nextPage.nextElementSibling;
      }
      return pages;
    },
  },
};
</script>
