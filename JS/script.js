//  Java Script Start \\

// Repeating Variables
const spinner = document.getElementById('spinner');
const booksContainer = document.getElementById('books-library');
const resultFound = document.getElementById('bookFound');
const errorMassage = document.getElementById('error-Massage');

// Button Handler 
const searchButton = () => {
    const searchFild = document.getElementById('search-Input');
    const searchTextInput = searchFild.value;

    // Clear Html Texts 
    spinner.classList.remove('d-none');
    booksContainer.textContent = '';
    resultFound.textContent = '';
    errorMassage.textContent = '';

    // Empty String Error Handling
    if (searchTextInput === '') {
        spinner.classList.add('d-none');
        errorMassage.innerHTML = `
        <h3 class="p-2 fw-bolder  animate__animated animate__flash animate__repeat-2">Please Write Something</h3>
        `;

        // Api Data Call 
    } else {
        // Api Link 
        const url = `https://openlibrary.org/search.json?q=${searchTextInput}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                spinner.classList.add('d-none');
                booksDetails(data.docs)
            })
    }

    // Clear Input Fild 
    searchFild.value = '';
}

// Append In UI 
const booksDetails = books => {

    // How Many Books Found
    booksContainer.textContent = '';
    resultFound.innerHTML = ` <h3 class="bg-white text-success p-2 mb-4 text-center fw-bolder rounded-3  animate__animated animate__flash">${books.length} Books Found</h3>`;
    console.log(books.length)

    // Book Not Found Error Massage \\
    if (books <= 0) {
        resultFound.innerHTML = '';
        errorMassage.innerHTML = `<h3 class="p-2 fw-bolder  animate__animated animate__flash animate__repeat-2">The Book Could Not Found</h3>`;
    }

    // All Books Informations \\
    else {
        books.forEach(book => {
            // All Image Url 
            const bookImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            const defaultImage = 'Images/default img.jpg'
            const div = document.createElement('div');
            div.innerHTML = `
        <div class="col">
            <div class="card card-Item">
            <img  height="250px" src="${book.cover_i === undefined ? defaultImage : bookImage}" alt="It Have No Pictures">
                <div class="card-body">
                    <h5 class="card-title"><span class="text-primary">Book Name: </span> ${book.title}</h5>
                    <p class="card-text"><span class="text-success fw-bold">Authors: </span> 
                    ${book?.author_name ? book?.author_name[0] : 'The Authors Name Was Not Given'}</p>
                    <p class="card-text"><span class="text-success fw-bold">Book Publisher: </span>
                     ${book?.publisher ? book?.publisher[0] : 'No Publisher'}</p>
                     <p class="card-text"><span class="text-success fw-bold">First Publish Year: </span>
                     ${book.first_publish_year ? book.first_publish_year : 'No Date Specified'}</p>
                </div>
            </div>
        </div>
        `;
            booksContainer.appendChild(div);

        })
    }
}
// Java Script End \\