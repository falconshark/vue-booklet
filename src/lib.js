import Book from './components/book.vue';
import './styles/lib.scss';

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.component('Book', Book);
}

export default Book
