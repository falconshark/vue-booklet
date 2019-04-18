# vue-booklet
*Vue book-like compoment for create a your own e-book*

Vue Booklet is a compoment which can let your create a flipable book fastly, and is responsive.
As it's used css animation, it will not support IE 9 and other old browser.

## Demo

http://book.sardo.work

## Installation
```bash
npm install vue-booklet --save
```

or

```bash
yarn add vue-booklet
```

## Usage

Import module from vue-booklet, then register it to Vue:

```js
import booklet from 'vue-booklet';

new Vue({
  el: '#your-dom-element',
   components: {
      booklet
   }
})
```

And import the css file in your html file:
```html
<link rel="stylesheet" href="vue-booklet.min.css">
```

After that, you can use vue-booklet on your project now.

### Without webpack

```html
<head>
  <link rel="stylesheet" href="vue-booklet.min.css">
</head>
<div id="app">
  <Book>
    <div class="page cover">
      <article class="content">
        <h1>My first book</h1>
      </article>
    </div>
    <div class="page">
      <article class="content">
        <h1>Hello World !</h1>
        <p>Using vue-booklet to create a book which can fliped.</p>
        <p>Please feel free to use it.</p>
      </article>
    </div>
  </Book>
</div>

<script type="text/javascript" src="http://vuejs.org/js/vue.min.js"></script>
<script type="text/javascript" src="vue-booklet.min.js"></script>
<script>
var VueBooklet = window.VueBooklet;

new Vue({
  el: '#vue-booklet-container',
  components: {
    Book: VueBooklet,
  }
})
</script>
```

## Example
```html
<Book>
  <div class="page cover">
    <article class="content">
      <h1>My first book</h1>
    </article>
  </div>
  <div class="page">
    <article class="content">
      <h1>Hello World !</h1>
      <p>Using vue-booklet to create a book which can fliped.</p>
      <p>Please feel free to use it.</p>
    </article>
  </div>
</Book>
```
If you want to add page to book programmatically, here are one more example:

```js
const newPage = document.createElement('div');
const newContent = document.createElement('div');
newPage.className = 'page';
newContent.className= 'content';
newPage.appendChild(newContent);
pages.appendChild(newPage);
```
## Methods

#### prevPage(), nextPage()
Function for control the book without button.

```js
this.$refs.book.nextPage();
this.$refs.book.prevPage();
```

#### movePage(pageNum)
Function for allow user move to specify page.

```js
const pageNumber = '1';
this.$refs.book.movePage(pageNumber);
```

## Props

#### displayPageNumber(optional)
Default value is true. Will not show page number when it is false.

#### enableControl(optional)
Default value is true. Will not allow user control the book when it is false.
If you want to control it, add ref to book compoment and call function like this:
```js
this.$refs.book.nextPage();
this.$refs.book.prevPage();
```


#### displayButton(optional)
Default value is true. Will not show nextPage and PrevPage button when it is false.
Only work when the value of allowFlip is true.

#### enableSelectPage(optional)
Default value is true. Will not allow user select page when it is false.
Only work when the value of allowFlip is true.

#### langcode(optional)
Set the language of booklet UI.
Current support language is English (en), Traditional Chinese (zh-hant) and Simplified Chinese (zh-hans). You can add new langcode with translation props.
Default value is en.

#### translation(optional)
Define translation of booklet UI. You can pass object or JSON string with translated text to it.
Default value:
```js
{
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
}
```

#### pageTransitionTime (optional)
Set the transition time of each book page.

Default value is 0.8s.

#### onOpened(book, position) (optional)
A callback which happens after book opened. Pass the book dom which you can control it, and position of book.

#### onClosed(book, position) (optional)
A callback which happens after book closed. Pass the book dom which you can control it, and position of book.

#### onFlipStart(currentPage, direction) (optional)
A callback which happens before a page filped. Pass the page dom which you can control it,
and direction for you to know filped to next page or previous page.

#### onFlipEnd(currentPage, direction) (optional)
A callback which happens after a page filped. Pass the page dom which you can control it,
and direction for you to know filped to next page or previous page.


## Developing

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
