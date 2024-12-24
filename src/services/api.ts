"use server"

export default async function fetchBook() {

    const books = await fetch(' https://simple-books-api.glitch.me/books');

   if(!books.ok) {
    throw new Error('Failed to fetch books');
   }

   return books.json();
    
}


