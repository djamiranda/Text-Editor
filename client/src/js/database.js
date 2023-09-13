import { openDB } from 'idb';

// Function to initialize the database.
const initdb = async () => {
    // Open the 'jate' database with version 1.
    openDB('jate', 1, {
        upgrade(db) {
            // Check if the object store 'jate' already exists.
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            // If it doesn't exist, create a new object store 'jate'.
            db.createObjectStore('jate', {
                keyPath: 'id', // Use 'id' as the key path for objects.
                autoIncrement: true, // Automatically increment the 'id'.
            });
            console.log('jate database created');
        },
    });
};

// Function to add content to the database.
export const putDb = async (content) => {
    console.log('PUT to the database');
    // Open the 'jate' database with version 1.
    const jateDb = await openDB('jate', 1);
    // Start a new transaction with read-write access.
    const tx = jateDb.transaction('jate', 'readwrite');
    // Open the 'jate' object store.
    const store = tx.objectStore('jate');
    // Put the content into the object store with an auto-generated 'id'.
    const request = store.put({ id: 1, value: content });
    // Wait for the request to complete.
    const result = await request;
    console.log('🚀 - data saved to the database', result);
};

// Function to retrieve all content from the database.
export const getDb = async () => {
    // Open the 'jate' database with version 1.
    const jateDb = await openDB('jate', 1);
    // Start a new transaction with read-only access.
    const tx = jateDb.transaction('jate', 'readonly');
    // Open the 'jate' object store.
    const store = tx.objectStore('jate');
    // Use the .getAll() method to retrieve all data in the object store.
    const request = store.getAll();
    // Wait for the request to complete and get the result.
    const result = await request;
    console.log('result.value', result);
    return result.value; // Return the retrieved data.
};

// Initialize the database when the module is imported.
initdb();
