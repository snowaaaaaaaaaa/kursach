document.addEventListener('DOMContentLoaded', () => {
    const specialtiesList = document.getElementById('specialties-list');
    const booksList = document.getElementById('books-list');
    const currentSpecialty = document.getElementById('current-specialty');

    function loadBooksForSpecialty(specialty) {
        fetch(`get_books.php?specialty=${encodeURIComponent(specialty)}`)
            .then(response => response.json())
            .then(books => {
                booksList.innerHTML = ''; 
                if (books.length === 0) {
                    booksList.innerHTML = '<li>Немає доступних книг для цієї спеціальності.</li>';
                } else {
                    books.forEach(book => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <strong>${book.title}</strong><br>
                            <em>${book.author}</em><br>
                            <span>${book.year}</span>
                        `;
                        booksList.appendChild(li);
                    });
                }
            })
            .catch(err => {
                console.error('Ошибка загрузки книг:', err);
            });
    }

    specialtiesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('specialty')) {
            document.querySelectorAll('.sidebar .specialty').forEach(li => li.classList.remove('selected'));
            event.target.classList.add('selected');
            const specialty = event.target.dataset.specialty;
            currentSpecialty.textContent = specialty;
            loadBooksForSpecialty(specialty);
        }
    });


    loadBooksForSpecialty('121');
});

document.getElementById('search-bar').addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    const books = document.querySelectorAll('.book-item');
    let foundBooks = 0;

    books.forEach(book => {
        const title = book.querySelector('.book-title').textContent.toLowerCase();
        if (title.includes(query)) {
            book.style.display = 'flex'; 
            foundBooks++;
        } else {
            book.style.display = 'none'; 
        }
    });

    const booksContainer = document.querySelector('.books-container');
    if (foundBooks === 1) {
        booksContainer.classList.add('single-result');
        books.forEach(book => {
            if (book.style.display === 'flex') {
                book.classList.add('single-result');
            } else {
                book.classList.remove('single-result');
            }
        });
    } else {
        booksContainer.classList.remove('single-result');
        books.forEach(book => book.classList.remove('single-result'));
    }
});


   
