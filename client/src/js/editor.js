// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';

// Import the 'header' from './header.js' (assuming it contains some default content)
import { header } from './header';

// Create a class
export default class {
  constructor() {
    // Get content from localStorage
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Initialize CodeMirror editor
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, load data from IndexedDB
    // Fall back to localStorage if nothing is stored in IndexedDB, and if neither is available, set the value to 'header'.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    // Event handler for editor change
    this.editor.on('change', () => {
      // Save the editor's content to localStorage whenever it changes
      localStorage.setItem('content', this.editor.getValue());
    });

    // Event handler for when the editor loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      // Save the content to the IndexedDB database and localStorage
      putDb(localStorage.getItem('content'));
    });
  }
}
