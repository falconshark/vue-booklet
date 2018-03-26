<template>
  <div class="vue-booklet">
    <div class="book closed" ref="book">
      <div class="pages" ref="pages">
        <div class="control-page control-page-left" v-on:click="prevPage"></div>
        <div class="control-page control-page-right" v-on:click="nextPage"></div>
        <slot></slot>
      </div>
    </div>
    <div class="select-page-wrapper">
      <label for="select-page">Select page: </label>
      <select id="select-page" v-on:change="selectPage">
        <option v-for="pageNumber in totolPages" :value="pageNumber">{{pageNumber}}</option>
      </select>
    </div>

    <div class="page-number" v-if="currentPageNum !== 0">
      Pages: {{currentPageNum}} / {{totolPages}}
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
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

export default {
  name: 'Book',
  data() {
    return {
      opened: false,
      front: true,
      back: false,
      clickable: true,
      totolPages: 0,
      currentPageNum: 0,
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
    this.initPage();
    this.initContent();

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

      if(currentPage.classList.contains('firstPage') && currentPage.nextElementSibling){
        currentPage.nextElementSibling.style.zIndex = '2';
      }

      this.onFlipStart(currentPage, direction);
    });

    this.$on('onFlipEnd', (direction) => {
      const currentPage = document.getElementsByClassName('currentPage')[0];
      const pageNumber = parseInt(currentPage.dataset.index);
      this.currentPageNum = pageNumber;

      if(currentPage.classList.contains('back') && currentPage.classList.contains('fliped')){
        this.currentPageNum = pageNumber + 1;
      }

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
      let pages = document.getElementsByClassName('page');

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

        page.dataset.index = index;

        if(index % 2 === 0){
          page.classList.add('oven');
        }else{
          page.classList.add('odd');
        }
      }
      firstPage.style.zIndex = '3';
      if(firstPage.nextElementSibling){
        firstPage.nextElementSibling.style.zIndex = '2';
      }
      lastPage.classList.add('lastPage');

      this.totolPages = pages.length + 1;
    },
    initContent(){
      const contents = document.getElementsByClassName('content');
      for(let i = 0; i < contents.length; i++){
        const content = contents[i];
        const ps = new PerfectScrollbar(content);
      }
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
        if (prevPage && !prevPage.classList.contains('control-page')) {
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
        }else{
          //If the book only have one page, undo flip only
          if(currentPage.classList.contains('firstPage') && currentPage.classList.contains('fliped')){
            this.$emit('onClosed', 'front');
            currentPage.classList.remove('fliped');
          }
        }

        setTimeout(() => {
          this.clickable = true;
          this.$emit('onFlipEnd', 'back');
        }, timeOut);
      }
    },
    selectPage(e){
      const selectedPageNum = e.target.value;
      const currentPage = document.getElementsByClassName('currentPage')[0];
      var selectedPage = document.querySelector('[data-index="' + selectedPageNum + '"]');

      if(!selectedPage){
        selectedPage = document.getElementsByClassName('lastPage')[0];
        selectedPage.classList.add('fliped');
        this.$emit('onClosed', 'back');
      }else{
        //Set selected page to current page and top
        selectedPage.classList.remove('fliped');

        //If book is closed, opened it
        if (!this.opened) {
          this.$emit('onOpened', 'front');
        }
      }

      const prevPages = Array.from(this.getAllPrevPage(selectedPage));
      const nextPages = Array.from(this.getAllNextPage(selectedPage));

      currentPage.classList.remove('currentPage');
      selectedPage.classList.add('currentPage');
      selectedPage.style.zIndex = 3;

      if(selectedPage.classList.contains('firstPage') && selectedPage.nextElementSibling){
        this.$emit('onClosed', 'front');
        selectedPage.nextElementSibling.style.zIndex = '2';
      }

      //Flip all of the previous page
      prevPages.forEach(function(page){
        page.classList.add('fliped');
        page.style.zIndex = '1';
      });

      //Hidden all of the old page
      nextPages.forEach((page) => {
        page.classList.remove('fliped');
        if(!page.classList.contains('lastPage')){
          page.style.zIndex = '-1';
        }else{
          page.style.zIndex = '-3';
        }
      });

      this.$emit('onFlipStart', 'front');
      this.$emit('onFlipEnd', 'front');
    },
    getAllPrevPage(currentPage){
      const pages = [];
      let prevPage = currentPage.previousElementSibling;
      while (prevPage) {
        if(prevPage.classList.contains('control-page')){
          break;
        }
        pages.push(prevPage);
        prevPage = prevPage.previousElementSibling;
      }
      return pages;
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
