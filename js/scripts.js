/*
TREEHOUSE PROJECT 5 - PUBLIC API REQUEST
========================================
*/

const body = document.querySelector('body');
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');
const modals = [];

// 12 random users from only english-speaking countries(for search feature) are pulled from the API.
// New group of users is displayed everytime the page is refreshed.
const fetchUsers = () => {
  fetch('https://randomuser.me/api/?nat=us,au,ca,gb,ie,nz&results=12')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      processData(data.results);
    })
}

// Takes the incoming data and makes a new array of employees with the necessary info.
// Used to display the cards and create the modals.
const processData = (data) => {
  const employees = data.map((employee, i) => {
    return {
      index: i,
      profilePic: employee.picture.large,
      name: `${employee.name.first} ${employee.name.last}`,
      email: employee.email,
      cityState: `${employee.location.city}, ${employee.location.state}`,
      phone: employee.cell,
      address: `${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`,
      birthday: formatBirthday(employee.dob)
    }
  })
  finalList = employees;
  displayCards(finalList);
  createModals(finalList);
}

// Helper function to properly display dob.
formatBirthday = (dob) => {
  const dateStr = dob.date.slice(0, 10);
  const splitDate = dateStr.toString().split('-');
  const formattedDOB = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
  return formattedDOB;
}

// Runs createCard for each employee in the array and displays them.
const displayCards = (employees) => {
  employees.forEach((employee) => {
    createCard(employee);
  })
}

// Creates modals for each employee, which are hidden at first.
const createModals = (employees) => {
  employees.forEach((employee) => {
    modals.push(createModal(employee));
  })
}

// Functions to display, hide and close modals.
const displayModal = (i) => {
  modals[i].style.display = 'inherit';
}

const hideModal = (i) => {
  modals[i].style.display = 'none';
}

const closeModal = (e) => {
  let i = e.target.parentElement.id;
  hideModal(i);
}

// Once modal is on screen, allows user to cycle through each modal (for exceeds grade).
// User is able to scroll through entire list. When 'next' is pushed on the last employee,
// it will go back to the first employee, and vice versa when going the other direction.
const changeModal = (e) => {
  let i = parseInt(e.target.parentElement.id);
  hideModal(i);
  if (e.target.id === 'modal-prev') {
    if (i === 0) {
      i += finalList.length;
    }
    i--;
  }
  if (e.target.id === 'modal-next') {
    if (i === finalList.length - 1) {
      i -= finalList.length;
    }
    i++;
  }
  displayModal(i);
}

// Recursively gets the id of the employee of the card that is clicked on, so that the modals can be displayed.
// If one of the inner elements is clicked on, like the email, it will keep going out to the parent element,
// until it gets to the one with class 'card'.
const getCard = (e) => {
  if (e.target.className !== 'gallery') {
    getId(e.target);
  }
  function getId(target) {
    if (target.className === 'card') {
      displayModal(target.id);
    } else {
      target = target.parentNode;
      getId(target);
    }
  }
}

// As each letter is entered or deleted, the search results are updated (for exceeds grade).
const searchFromInput = (e) => {
  const searchValue = e.target.value;
  filterSearch(searchValue);
}

const filterSearch = (inputValue) => {
  finalList.forEach((employee, i) => {
    if (!employee.name.includes(inputValue)) {
      cards[i].style.display = 'none';
    } else {
      cards[i].style.display = 'inherit';
    }
  })
}

// THE SEARCH BUTTON IS UNNECESSARY SINCE CARDS ARE FILTERED AS USER TYPES, BUT IT WOULD LOOK LIKE THIS IF IT WERE NECESSARY.
// const searchFromButton = (e) => {
//   const searchInput = document.getElementById('search-input');
//   searchInput.blur();
//   const searchValue = searchInput.value;
//   filterSearch(searchValue);
// }

// Creates the search input box and button.
const createSearch = () => {
  const form = document.createElement('form');
  form.action = '#';
  form.method = 'get';

  const searchBox = document.createElement('input');
  searchBox.type = 'search';
  searchBox.id = 'search-input';
  searchBox.className = 'search-input';
  searchBox.placeholder = 'Search...';
  searchBox.addEventListener('keyup', searchFromInput);

  const searchButton = document.createElement('input');
  searchButton.type = 'submit';
  searchButton.value = 'Search';
  searchButton.id = 'search-input';
  searchButton.className = 'search-submit';
  // searchButton.addEventListener('click', searchFromButton);

  form.appendChild(searchBox);
  form.appendChild(searchButton);
  searchContainer.appendChild(form);
}

// Creates card for each employee. The index is given as an id so that corresponding modals are easily displayed.
const createCard = (employee) => {
  const div = document.createElement('div');
  div.className = 'card';
  div.id = employee.index;

  const imgContainer = document.createElement('div');
  imgContainer.className = 'card-img-container';
  const image = document.createElement('img');
  image.className = 'card-img';
  image.src = employee.profilePic;
  image.alt = 'profile picture';
  imgContainer.appendChild(image);

  const infoContainer = document.createElement('div');
  infoContainer.className = 'card-info-container';

  const h3Name = document.createElement('h3');
  h3Name.id = 'name';
  h3Name.className = 'card-name cap';
  h3Name.textContent = employee.name;

  const pEmail = document.createElement('p');
  pEmail.className = 'card-text';
  pEmail.textContent = employee.email;

  const pLocation = document.createElement('p');
  pLocation.className = 'card-text cap';
  pLocation.textContent = employee.cityState;

  infoContainer.appendChild(h3Name);
  infoContainer.appendChild(pEmail);
  infoContainer.appendChild(pLocation);
  div.appendChild(imgContainer);
  div.appendChild(infoContainer);
  gallery.appendChild(div);
}

// Modals are created for each employee at the start, but are hidden until the cards are clicked.
const createModal = (employee) => {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';

  const modal = document.createElement('div');
  modal.className = 'modal';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.id = 'modal-close-btn';
  closeButton.className = 'modal-close-btn';
  closeButton.style.textDecoration = 'strong';
  closeButton.textContent = 'x';
  closeButton.addEventListener('click', closeModal);

  const modalInfoContainer = document.createElement('div');
  modalInfoContainer.className = 'modal-info-container';
  modalInfoContainer.id = employee.index;

  const modalImage = document.createElement('img');
  modalImage.className = 'modal-img';
  modalImage.src = employee.profilePic;
  modalImage.alt = 'profile picture';

  const h3Name = document.createElement('h3');
  h3Name.id = 'name';
  h3Name.className = 'modal-name cap';
  h3Name.textContent = employee.name;

  const pEmail = document.createElement('p');
  pEmail.className = 'modal-text';
  pEmail.textContent = employee.email;

  const pCity = document.createElement('p');
  pCity.className = 'modal-text cap';
  pCity.textContent = employee.cityState;

  const hr = document.createElement('hr');

  const pPhone = document.createElement('p');
  pPhone.className = 'modal-text';
  pPhone.textContent = employee.phone;

  const pAddress = document.createElement('p');
  pAddress.className = 'modal-text cap';
  pAddress.textContent = employee.address;

  const pDOB = document.createElement('p');
  pDOB.className = 'modal-text';
  pDOB.textContent = `Birthday: ${employee.birthday}`;

  modalInfoContainer.appendChild(closeButton);
  modalInfoContainer.appendChild(modalImage);
  modalInfoContainer.appendChild(h3Name);
  modalInfoContainer.appendChild(pEmail);
  modalInfoContainer.appendChild(pCity);
  modalInfoContainer.appendChild(hr);
  modalInfoContainer.appendChild(pPhone);
  modalInfoContainer.appendChild(pAddress);
  modalInfoContainer.appendChild(pDOB);

  modal.appendChild(modalInfoContainer);

  modalContainer.appendChild(modal);
  const modalButtons = modalBtnContainer(employee.index);
  modalContainer.appendChild(modalButtons);
  modalContainer.style.display = 'none';

  body.appendChild(modalContainer);
  return modalContainer;
}

// Holds the previous and next buttons to scroll through the modals.
// Old card is hidden and new one is displyed.
const modalBtnContainer = (index) => {
  const container = document.createElement('div');
  container.className = 'modal-btn-container';
  container.id = index;

  const previous = document.createElement('button');
  previous.type = 'button';
  previous.id = 'modal-prev';
  previous.className = 'modal-prev btn';
  previous.textContent = 'Prev';
  previous.addEventListener('click', changeModal);

  const next = document.createElement('button');
  next.type = 'button';
  next.id = 'modal-next';
  next.className = 'modal-next btn';
  next.textContent = 'Next';
  next.addEventListener('click', changeModal);

  container.appendChild(previous);
  container.appendChild(next);
  return container;
}

gallery.addEventListener('click', getCard);
createSearch();
fetchUsers();


