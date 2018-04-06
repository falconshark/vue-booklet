import Book from './components/book.vue';
import './styles/lib.scss';

if (typeof window !== 'undefined') {
	window.VueBooklet = Book;
}

export default Book
