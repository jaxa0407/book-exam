//Selection
let tempLeft = document.querySelector("#left").content
let tempRight = document.querySelector("#right").content
let rightWrapper = document.querySelector(".right__list")
let leftWrapper = document.querySelector(".left__list")
let headerSwitchTheme = document.querySelector(".header__back-switch")
let body = document.querySelector("body")
let inputSearch = document.querySelector(".header__search-input").value
let itemResult = document.querySelector(".books-result")

let localSave = JSON.parse(localStorage.getItem("markedBooks"))

// let markedArray = []

if(localSave){
    markedArray = localSave
    rightWrapper.addEventListener("click", function(evt) {

        let getById = evt.target.dataset.bookId

        localStorage.setItem("markedBooks", JSON.stringify(markedArray))
    
        console.log(markedArray);
    
        if (getById) {
            fetch(`https://www.googleapis.com/books/v1/volumes/${getById}`)
            .then(response => response.json())
            .then(json => markedArray.push(json))
            
            renderBookMarks(markedArray, leftWrapper)
        }
    })

}else markedArray = []

headerSwitchTheme.addEventListener("click", function () {
    body.classList.toggle("back_dark")
})


function renderBooks(array, wrapper) {
    
    
    wrapper.innerHTML = null
    
    itemResult.textContent = array.length
    let newFragment = document.createDocumentFragment();
    
    
    for (const item of array) {
        let newLi = tempRight.cloneNode(true)

        // let dt_title = item.volumeInfo?.title
        // let dt_auth = item.volumeInfo.authors[0]
        // let dt_id = item.id
        
        
        newLi.querySelector(".right__item-img").src = item.volumeInfo.imageLinks?.thumbnail;
        newLi.querySelector(".right__item-heading").textContent = item.volumeInfo?.title;
        newLi.querySelector(".right__item-auth").textContent = item.volumeInfo.authors[0];
        newLi.querySelector(".right__item-year").textContent = item.volumeInfo.publishedDate;
        newLi.querySelector(".right__bookmark").dataset.bookId = item.id;
        newLi.querySelector(".right__info").dataset.bookIdModal = item.id;
        newLi.querySelector(".right__read").href= item.volumeInfo.previewLink;
        newFragment.appendChild(newLi);
    }
    
    wrapper.appendChild(newFragment);
}

//renderBookmarkss -----------------------------------------------------

function renderBookMarks(array, wrapper) {

    
    wrapper.innerHTML = null;
    
    let newFragment = document.createDocumentFragment();
    
    for (const item of array) {

        let newLi = tempLeft.cloneNode(true)
        newLi.querySelector(".left__item-heading").textContent = item.volumeInfo.title;
        newLi.querySelector(".left__item-auth").textContent = item.volumeInfo.authors;
        newLi.querySelector(".left__item-delete").dataset.localId = item.id;


        // newLi.querySelector(".left__bookmark").dataset.book = JSON.stringify(item);

        
        newFragment.appendChild(newLi);
    }
    
    wrapper.appendChild(newFragment);
}



function getApi(el) {

    let query = el?.value
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(response => response.json())
        .then((json) => {
            renderBooks(json.items, rightWrapper)

        }) 
} 

// function renderFromLocal() {
//     let arrayOfBooks = JSON.parse(localStorage.getItem('markedBooks'))

//     console.log(arrayOfBooks);

// }

//modall

let modalTitle = document.querySelector(".modal-title")
let modalBody = document.querySelector(".modal-body")



// rightWrapper.addEventListener("click", function(evt) {

//     let getById = evt.target.dataset.bookId

//     console.log(markedArray);

//     if (getById) {
//         fetch(`https://www.googleapis.com/books/v1/volumes/${getById}`)
//         .then(response => response.json())
//         .then(json => markedArray.push(json))
//     }
    

//         // localStorage.setItem("markedBooks", JSON.stringify(markedArray))
//         // let parsedArray = localStorage.getItem(JSON.parse("markedBooks"))    

    
//     // let localStorageMarkedBooks = localStorage.getitem("localStorageMarkedBooks") ? JSON.parse(localStorage.getitem('localStorageMarkedBooks')) : []
//     // let booksMarked = 
    
//     // if (evt.target.dataset) {
//     //     let obj = {
//     //         title: evt.target.dataset.title,
//     //         id: evt.target.dataset.id,
//     //         auth: evt.target.dataset.auth
//     //     }

//     //     let arr = localStorage.getItem("markedBooks") ? JSON.parse(localStorage.getItem("markedBooks")) : []
//     //     if (!arr.includes(obj.id)) {
//     //         arr.push(obj)
//     //     }
//     //     localStorage.setItem('markedBooks', JSON.stringify(arr))
//     //     renderBookMarks(leftWrapper)
        
//     // }
// })

rightWrapper.addEventListener("click", function (evt) {
    
    if (evt.target.dataset.bookIdModal) {
        let modalInfo =  evt.target.dataset.bookIdModal
        fetch(`https://www.googleapis.com/books/v1/volumes/${modalInfo}`)
        .then(response => response.json())
        .then(json => {
            modalTitle.textContent =  json.volumeInfo.title
            modalBody.textContent = json.volumeInfo.description
        })

        
    }
})


