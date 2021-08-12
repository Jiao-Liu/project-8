//Global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const employeeSearch = document.querySelector('#search-bar');
const leftArrow = document.querySelector('#left');
const rightArrow = document.querySelector('#right');

//Fetch data from API
fetch(urlAPI)
     //Format the response as JSON
    .then(res => res.json())  
    //Return the results of the response
    .then(res => res.results)
    // Pass control to the displayEmployees function 
    .then(displayEmployees)
    // Catch any errors and display them in the console
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
     // all the employeesdata will store in eployees arry
     employees = employeeData;
     //store HTML
     let employeeHTML = '';

     //iterate the employees arry
     employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
            <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            </div>
            </div>
            `
    });
    gridContainer.innerHTML = employeeHTML;
};

//Display Modal function 
function displayModal(index) {
    let { name, 
        dob, 
        phone, 
        email, 
        location: { city, number, street, state, postcode}, 
        picture } = employees[index];

    let date = new Date(dob.date);
    const modalHTML = `
        <img class="modalAvatar" src="${picture.large}" />
        <div class="modalTextContainer modalInfo" dataInd="${index}">
        <h2 class="nameModal">${name.first} ${name.last}</h2>
        <p class="emailModal">${email}</p>
        <p class="addressModal">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="addressModal">${street.number}, ${street.name}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
};


//Event Listeners
gridContainer.addEventListener('click', e => { 
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
        overlay.classList.remove("hidden");  
    } 
    
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});



//Search Filter
employeeSearch.addEventListener("keyup", function(e){
    let searchable = e.target.value.toLowerCase();
    let a, txt;
    for (let i = 0; i < document.querySelectorAll('[class*="card"]').length; i++){
        a = document.querySelectorAll('[class*="card"]')[i];
        txt = a.querySelector(".name").textContent;
        if(txt.toLowerCase().indexOf(searchable) > -1){
          a.classList.remove("hidden");
        }
        else
        {
          a.classList.add("hidden");
        }
    
    }
});



//Preview and Next
leftArrow.addEventListener("click", (e) => {
    const modalInfo = document.querySelector(".modalInfo");
    const index = modalInfo.getAttribute("dataInd");
    const prevIndex = parseInt(index) - 1;
    const currentIndex=[];
    currentIndex.push(index);

    
    if (currentIndex > 0) {
      currentIndex.length --;
      displayModal(prevIndex);
   
    }else if(currentIndex == 0){
          currentIndex.length=11;
          displayModal(currentIndex.length);
    }
  
  
});

rightArrow.addEventListener("click", (e) => {
    const modalInfo = document.querySelector(".modalInfo");
    const index = modalInfo.getAttribute("dataInd");
    const nextIndex = parseInt(index) + 1;
    const currentIndex=[];
    currentIndex.push(index);


    if (currentIndex <11) {
      currentIndex.length ++;
      displayModal(nextIndex);

    }else if(currentIndex == 11){
        currentIndex.length =0;
        displayModal(currentIndex.length);
    }
 
});


