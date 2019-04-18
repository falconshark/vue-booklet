<template>
  <div id="app">
    <Book>
      <div class="page cover">
        <article class="content">
          <h1>Vue Booklet</h1>
          <img class="img-responsive" src="./assets/black_cat_black_and_white-300px.png" />
        </article>
      </div>
      <div class="page">
        <article class="content">
          <h1>Hello World !</h1>
          <p>Using vue-booklet to create a book which can fliped.</p>
          <p>Please feel free to use it.</p>
        </article>
        <article class="content">
          <h1>It is back of page 2</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue ut lectus arcu bibendum at varius.
          Ac odio tempor orci dapibus ultrices in iaculis. Euismod in pellentesque massa placerat.
          Arcu felis bibendum ut tristique.
          Orci a scelerisque purus semper eget duis at. Dictum fusce ut placerat orci nulla.
          Rhoncus dolor purus non enim praesent. Auctor neque vitae tempus quam pellentesque nec.
          Vitae turpis massa sed elementum tempus. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor.
          Urna neque viverra justo nec ultrices dui sapien. Arcu cursus vitae congue mauris rhoncus.
          Laoreet sit amet cursus sit amet dictum sit amet. Gravida dictum fusce ut placerat orci nulla.
        </article>
      </div>
      <div class="page">
        <article class="content">
          <h1>It is page 3</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue ut lectus arcu bibendum at varius.
          Ac odio tempor orci dapibus ultrices in iaculis. Euismod in pellentesque massa placerat.
          Arcu felis bibendum ut tristique.
          Orci a scelerisque purus semper eget duis at. Dictum fusce ut placerat orci nulla.
          Rhoncus dolor purus non enim praesent. Auctor neque vitae tempus quam pellentesque nec.
          Vitae turpis massa sed elementum tempus. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor.
          Urna neque viverra justo nec ultrices dui sapien. Arcu cursus vitae congue mauris rhoncus.
          Laoreet sit amet cursus sit amet dictum sit amet. Gravida dictum fusce ut placerat orci nulla.
        </article>
        <article class="content">
          <h1>It is back of page 3</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue ut lectus arcu bibendum at varius.
          Ac odio tempor orci dapibus ultrices in iaculis. Euismod in pellentesque massa placerat.
          Arcu felis bibendum ut tristique.
          Orci a scelerisque purus semper eget duis at. Dictum fusce ut placerat orci nulla.
          Rhoncus dolor purus non enim praesent. Auctor neque vitae tempus quam pellentesque nec.
          Vitae turpis massa sed elementum tempus. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor.
          Urna neque viverra justo nec ultrices dui sapien. Arcu cursus vitae congue mauris rhoncus.
          Laoreet sit amet cursus sit amet dictum sit amet. Gravida dictum fusce ut placerat orci nulla.
        </article>
      </div>
      <div class="page">
        <article class="content">
          <h1>It is page 4</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue ut lectus arcu bibendum at varius.
          Ac odio tempor orci dapibus ultrices in iaculis. Euismod in pellentesque massa placerat.
          Arcu felis bibendum ut tristique.
          Orci a scelerisque purus semper eget duis at. Dictum fusce ut placerat orci nulla.
          Rhoncus dolor purus non enim praesent. Auctor neque vitae tempus quam pellentesque nec.
          Vitae turpis massa sed elementum tempus. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor.
          Urna neque viverra justo nec ultrices dui sapien. Arcu cursus vitae congue mauris rhoncus.
          Laoreet sit amet cursus sit amet dictum sit amet. Gravida dictum fusce ut placerat orci nulla.
        </article>
        <article class="content">
          <h1>It is back of page 4</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue ut lectus arcu bibendum at varius.
          Ac odio tempor orci dapibus ultrices in iaculis. Euismod in pellentesque massa placerat.
          Arcu felis bibendum ut tristique.
          Orci a scelerisque purus semper eget duis at. Dictum fusce ut placerat orci nulla.
          Rhoncus dolor purus non enim praesent. Auctor neque vitae tempus quam pellentesque nec.
          Vitae turpis massa sed elementum tempus. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor.
          Urna neque viverra justo nec ultrices dui sapien. Arcu cursus vitae congue mauris rhoncus.
          Laoreet sit amet cursus sit amet dictum sit amet. Gravida dictum fusce ut placerat orci nulla.
        </article>
      </div>
      <div class="page back"></div>
    </Book>
  </div>
</template>

<script>
import Book from './components/book.vue';
export default {
  name: 'app',
  components: {
    Book
  }
}
</script>
