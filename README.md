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
new Vue({
  el: '#vue-booklet-container',
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

## Props
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
