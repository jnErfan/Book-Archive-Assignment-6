// Java Script Start \\
const spinner = document.getElementById('spinner');
const booksContainer = document.getElementById('books-library');
const resultFound = document.getElementById('bookFound');
const errorMassage = document.getElementById('error-Massage');

const searchButton = () => {
    const searchFild = document.getElementById('search-Input');
    const searchTextInput = searchFild.value;

    spinner.classList.remove('d-none');
    booksContainer.textContent = '';
    resultFound.textContent = '';
    errorMassage.textContent = '';
    if (searchTextInput == '') {
        spinner.classList.add('d-none');
        errorMassage.innerHTML = `
        <h3 class="p-2 fw-bolder  animate__animated animate__flash animate__repeat-2">Please Write Something</h3>
        `;
    } else {
        // Api Link 
        const url = `http://openlibrary.org/search.json?q=${searchTextInput}`;
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

const booksDetails = books => {

    booksContainer.textContent = '';
    resultFound.innerHTML = ` <h3 class="bg-white text-success p-2 text-center fw-bolder rounded-3  animate__animated animate__flash animate__repeat-2">${books.length} Books Found</h3>`

    if (books <= 0) {
        resultFound.innerHTML = '';
        errorMassage.innerHTML = `<h3 class="p-2 fw-bolder  animate__animated animate__flash animate__repeat-2">Please Enter Valid Book Name</h3>`;
    }
    else {
        // All Books Details
        books.forEach(book => {
            const div = document.createElement('div');
            div.innerHTML = `
        <div class="col">
            <div class="card">
            <img  height="250px"  src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg">
                <div class="card-body">
                    <h5 class="card-title"><span class="text-primary">Book Name: </span> ${book.title}</h5>
                    <p class="card-text"><span class="text-success fw-bold">Authors: </span> 
                    ${book.author_name ? book.author_name : 'The Authors Name Was Not Given'}</p>
                    <p class="card-text"><span class="text-success fw-bold">Book Publisher: </span>
                     ${book.publisher ? book.publisher : 'No Publisher'}</p>
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
