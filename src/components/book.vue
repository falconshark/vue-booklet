<template>
  <div class="vue-booklet">
    <div class="select-page-wrapper-mobile" v-show="enableSelectPage && enableControl">
      <label for="select-page">{{translateText.selectPage}}: </label>
      <select id="select-page-mobile" v-on:change="selectPageMobile">
        <option v-for="pageNumber in totolPages" :value="pageNumber">
          {{pageNumber}}
        </option>
      </select>
    </div>

    <div class="book closed" ref="book">
      <div class="pages" ref="pages">
        <div class="control-page control-page-left" v-show="enableControl" v-on:click="prevPage">
          <div class="control-page-icon control-page-text-left">
            <img class="img-responsive" src="../assets/arrow_left.png" />
          </div>
        </div>
        <div class="control-page control-page-right" v-show="enableControl" v-on:click="nextPage">
          <div class="control-page-icon control-page-text-right">
            <img class="img-responsive" src="../assets/arrow_right.png" />
          </div>
        </div>
        <slot></slot>
      </div>
    </div>

    <div class="select-page-wrapper" v-show="enableSelectPage && enableControl">
      <label for="select-page">{{translateText.selectPage}}: </label>
      <select id="select-page" v-on:change="selectPage">
        <option v-for="pageNumber in totolPages" :ref="'page' + pageNumber" :value="pageNumber">
          {{pageNumber}}
        </option>
      </select>
    </div>

    <div class="page-number" v-show="displayPageNumber">
      {{translateText.pages}} : {{currentPageNum}} / {{totolPages}}
    </div>
    <div class="book-control-buttons" v-show="displayButton && enableControl">
      <button tabindex="0" class="book-control-button prev" v-show="!front"
      v-on:keyup.enter="prevPage" v-on:click="prevPage">
      {{translateText.prev}}
    </button>
    <button tabindex="0" class="book-control-button next" v-show="!back"
    v-on:keyup.enter="nextPage" v-on:click="nextPage">
    {{translateText.next}}
  </button>
</div>
</div>
</template>

<script>
export default {
  name: 'Book',
  data() {
    return {
      opened: false,
      front: true,
      back: false,
      clickable: true,
      totolPages: 0,
      currentPageNum: 1,
    };
  },
  props: {
    langcode: {
      type: String,
      default: 'en',
    },
    displayPageNumber: {
      type: Boolean,
      default : true,
    },
    displayButton: {
      type: Boolean,
      default: true,
    },
    enableControl: {
      type: Boolean,
      default: true,
    },
    enableSelectPage: {
      type: Boolean,
      default : true,
    },
    translation: {
      default: () =>{
        return JSON.stringify({
          'en': {
            'selectPage': 'Select page',
            'pages': 'Pages',
            'prev': 'Prev',
            'next': 'Next',
          },
          'zh-hant': {
            'selectPage': '跳至指定頁數',
            'pages': '頁數',
            'prev': '上一頁',
            'next': '下一頁',
          },
          'zh-hans': {
            'selectPage': '跳至指定页数',
            'pages': '页数',
            'prev': '上一页',
            'next': '下一页',
          },
        });
      }
    },
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
    },
  },
  computed: {
    translateText: function() {
      const langcode = this.langcode;
      try{
        var translation = JSON.parse(this.translation);
      }catch(ex){
        var translation = this.translation;
      }
      return translation[langcode];
    }
  },
  mounted() {
    const book = this.$refs.book;
    this.initPage();

    // Book opened event
    this.$on('onOpened', (position) => {
      this.opened = true;
      book.classList.add('opened');
      book.classList.remove('closed');
      book.classList.remove('closed-back');
      this.onOpened(book, position);
    });

    // Book page fliped event
    this.$on('onFlipStart', (direction) => {
      const currentPage = document.getElementsByClassName('currentPage')[0];
      const nextPages = this.getAllNextPage(currentPage);
      const prevPages = this.getAllPrevPage(currentPage);

      if(direction === 'prev'){
        //Hidden page for performance(Not inculde first previous page)
        prevPages.forEach((page, index) => {
          if(page.previousElementSibling){
            const prevPage = page.previousElementSibling;
            if(!prevPage.classList.contains('lastPage') && !prevPage.classList.contains('control-page')){
              page.previousElementSibling.style.display = 'none';
              page.previousElementSibling.style.zIndex = '-1';
            }else{
              page.previousElementSibling.style.display = 'none';
              page.previousElementSibling.style.zIndex = '-3';
            }
          }
        });
      }else{
        prevPages.forEach((page, index) => {
          if(page.previousElementSibling){
            const prevPage = page.previousElementSibling;
            //Will not hidden first and second previous page to make animation smooth
            if(!prevPage.classList.contains('control-page')){
              if(index !== 0){
                prevPage.style.display = 'none';
              }
              if(!prevPage.classList.contains('lastPage')){
                prevPage.style.zIndex = '-1';
              }else{
                prevPage.style.zIndex = '-3';
              }
            }
          }
        });
      }

      nextPages.forEach((page, index) => {
        //Will not hidden next page of current page to make animation smooth
        if(index !== 0){
          if(!page.classList.contains('lastPage')){
            page.style.display = 'none';
            page.style.zIndex = '-1';
          }else{
            page.style.display = 'none';
            page.style.zIndex = '-3';
          }
        }else{
          page.style.zIndex = '-1';
        }
      });

      this.onFlipStart(currentPage, direction);
    });

    this.$on('onFlipEnd', (direction) => {
      const currentPage = document.getElementsByClassName('currentPage')[0];
      const selecter = document.getElementById('select-page');
      const pageNumber = parseInt(currentPage.dataset.index);

      if(currentPage.classList.contains('lastPage') && currentPage.classList.contains('fliped')){
        this.currentPageNum = pageNumber + 1;
      }else{
        this.currentPageNum = pageNumber;
      }

      selecter.value = this.currentPageNum;

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
        page.style.display = 'none';
        page.style.transition = 'transform ' + pageTransitionTime + 's';
        page.dataset.index = index;

        if(index % 2 === 0){
          page.classList.add('oven');
        }else{
          page.classList.add('odd');
        }
      }
      firstPage.style.display = 'block';
      firstPage.style.zIndex = '3';

      if(firstPage.nextElementSibling){
        firstPage.nextElementSibling.style.display = 'block';
        firstPage.nextElementSibling.style.zIndex = '2';
      }

      lastPage.classList.add('lastPage');

      this.totolPages = pages.length + 1;
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

        //Display next page
        if (nextPage) {
          nextPage.style.display = 'block';
        }

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

          if(prevPage.previousElementSibling){
            prevPage.previousElementSibling.style.display = 'block';
          }

          //If current page is last page , book not opened and it is not filped, open the book
          if (currentPage.classList.contains('lastPage') && !currentPage.classList.contains('fliped') && !this.opened) {
            this.$emit('onOpened', 'back');
          }

          //If previous page is first page and book not opened, close the book
          if (prevPage.classList.contains('firstPage') && !prevPage.classList.contains('fliped') && this.opened) {
            this.$emit('onClosed', 'front');
          }

        }else{
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
      const currentPageNum = this.currentPageNum;
      const selectedPageNum = e.target.value;
      if(parseInt(selectedPageNum) > currentPageNum){
        this.movePage(selectedPageNum, 'next');
      }else{
        this.movePage(selectedPageNum, 'prev');
      }
    },
    movePage(index, direction){
      const currentPage = document.getElementsByClassName('currentPage')[0];
      var selectedPage = document.querySelector('[data-index="' + index + '"]');
      const timeOut = this.pageTransitionTime * 4 * 100;

      if(!selectedPage){
        selectedPage = document.getElementsByClassName('lastPage')[0];
        selectedPage.classList.add('fliped');
        this.$emit('onClosed', 'back');
      }else{
        //Set selected page to current page and top
        setTimeout(() => {
          selectedPage.classList.remove('fliped');
        }, 100);

        //If book is closed, opened it
        if (!this.opened) {
          this.$emit('onOpened', 'front');
        }
      }

      const prevPages = Array.from(this.getAllPrevPage(selectedPage));
      const nextPages = Array.from(this.getAllNextPage(selectedPage));

      currentPage.classList.remove('currentPage');
      selectedPage.classList.add('currentPage');
      selectedPage.style.display = 'block';
      selectedPage.style.zIndex = 3;

      if(selectedPage.classList.contains('firstPage') && selectedPage.nextElementSibling){
        this.$emit('onClosed', 'front');
      }

      //Flip all of the previous page
      prevPages.forEach(function(page, index){
        if(index === 0){
          page.style.zIndex = '1';
        }
        page.style.display = 'block';
        setTimeout(() => {
          page.classList.add('fliped');
        }, 50);
      });

      //Hidden other pages
      nextPages.forEach(function(page){
        page.style.display = 'block';
        page.classList.remove('fliped');
      });

      this.$emit('onFlipStart', direction);

      setTimeout(() => {
        this.$emit('onFlipEnd', direction);
      }, timeOut);
    },
    selectPageMobile(e){
      const selectedPageNum = e.target.value;
      const lastPageNum = parseInt(selectedPageNum) - 1;
      var selectedPage = document.querySelector('[data-index="' + selectedPageNum + '"]');
      if(!selectedPage){
        selectedPage = document.querySelector('[data-index="' + lastPageNum + '"]');
      }
      selectedPage.scrollIntoView();
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
        if(nextPage.classList.contains('control-page')){
          break;
        }
        pages.push(nextPage);
        nextPage = nextPage.nextElementSibling;
      }
      return pages;
    },
  },
};
</script>
