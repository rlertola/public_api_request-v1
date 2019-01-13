const body = document.getElementsByTagName('body')[0];
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');

// let results;
// let parsedResults;
// let profilePic;
// let firstName;
// let lastName;
// let fullName;

const fetchUser = () => {
  // const employee = {};

  fetch('https://randomuser.me/api/')
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      results = JSON.stringify(myJson.results[0]);
      parsedResults = JSON.parse(results);

      // GALLERY ITEM
      // profile pic
      profilePic = parsedResults.picture['large'];
      // // first and last name
      firstName = parsedResults.name.first;
      lastName = parsedResults.name.last;
      fullName = `${firstName} ${lastName}`;
      // email
      email = parsedResults.email;
      // city and state
      city = parsedResults.location.city;
      state = parsedResults.location.state;
      location = `${city}, ${state}`;

      // // MODAL
      // // profile pic
      // console.log(JSON.stringify(myJson.results[0].picture['large']));
      // // first and last name
      // console.log(JSON.stringify(myJson.results[0].name.first));
      // console.log(JSON.stringify(myJson.results[0].name.last));
      // // email
      // console.log(JSON.stringify(myJson.results[0].email));
      // // city
      // console.log(JSON.stringify(myJson.results[0].location.city));;
      // // phone
      // console.log(JSON.stringify(myJson.results[0].cell));
      // // address
      // console.log(JSON.stringify(myJson.results[0].location.street));
      // console.log(JSON.stringify(myJson.results[0].location.city));
      // console.log(JSON.stringify(myJson.results[0].location.state));
      // console.log(JSON.stringify(myJson.results[0].location.postcode));
      // // bday xx/xx/xxxx
      // const getDOB = () => {
      //   const dateStr = JSON.parse(JSON.stringify(myJson.results[0].dob.date.slice(0, 10)));
      //   const splitDate = dateStr.toString().split('-');
      //   const date = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
      //   return date;
      // }
    })
  return employee;
}

const createSearch = () => {
  const form = document.createElement('form');
  form.action = '#';
  form.method = 'get';

  const searchBox = document.createElement('input');
  searchBox.type = 'search';
  searchBox.id = 'search-input';
  searchBox.className = 'search-input';
  searchBox.placeholder = 'Search...';

  const searchButton = document.createElement('input');
  searchButton.type = 'submit';
  searchButton.value = 'Search';
  searchButton.id = 'search-input';
  searchButton.className = 'search-submit';

  form.appendChild(searchBox);
  form.appendChild(searchButton);
  searchContainer.appendChild(form);
}

const createCard = (name, email, city, state) => {
  const div = document.createElement('div');
  div.className = 'card';

  const imgContainer = document.createElement('div');
  imgContainer.className = 'card-img-container';
  const image = document.createElement('img');
  image.className = 'card-img';
  image.src = 'https://placehold.it/90x90';
  image.alt = 'profile picture';
  imgContainer.appendChild(image);

  const infoContainer = document.createElement('div');
  infoContainer.className = 'card-info-container';

  const h3Name = document.createElement('h3');
  h3Name.id = 'name';
  h3Name.className = 'card-name cap';
  h3Name.textContent = name;

  const pEmail = document.createElement('p');
  pEmail.className = 'card-text';
  pEmail.textContent = email;

  const pLocation = document.createElement('p');
  pLocation.className = 'card-text cap';
  pLocation.textContent = `${city}, ${state}`;

  infoContainer.appendChild(h3Name);
  infoContainer.appendChild(pEmail);
  infoContainer.appendChild(pLocation);
  div.appendChild(imgContainer);
  div.appendChild(infoContainer);
  gallery.appendChild(div);
}

const createModal = (name, email, city, phone, address, dob) => {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';

  const modal = document.createElement('div');
  modal.className = 'modal';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.id = 'modal-close-btn';
  closeButton.className = 'modal-close-btn';
  closeButton.style.textDecoration = 'strong';
  closeButton.textContent = 'X';

  const modalInfoContainer = document.createElement('div');
  modalInfoContainer.className = 'modal-info-container';

  const modalImage = document.createElement('img');
  modalImage.className = 'modal-img';
  modalImage.src = 'https://placehold.it/125x125';
  modalImage.alt = 'profile picture';

  const h3Name = document.createElement('h3');
  h3Name.id = 'name';
  h3Name.className = 'modal-name cap';
  h3Name.textContent = name;

  const pEmail = document.createElement('p');
  pEmail.className = 'modal-text';
  pEmail.textContent = email;

  const pCity = document.createElement('p');
  pCity.className = 'modal-text cap';
  pCity.textContent = city;

  const hr = document.createElement('hr');

  const pPhone = document.createElement('p');
  pPhone.className = 'modal-text';
  pPhone.textContent = phone;

  const pAddress = document.createElement('p');
  pAddress.className = 'modal-text';
  pAddress.textContent = address;

  const pDOB = document.createElement('p');
  pDOB.className = 'modal-text';
  pDOB.textContent = `Birthday: ${dob}`;

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
  const modalButtons = modalBtnContainer();
  modalContainer.appendChild(modalButtons);

  body.appendChild(modalContainer);
}

const modalBtnContainer = () => {
  const container = document.createElement('div');
  container.className = 'modal-btn-container';

  const previous = document.createElement('button');
  previous.type = 'button';
  previous.id = 'modal-prev';
  previous.className = 'modal-prev btn';
  previous.textContent = 'Prev';

  const next = document.createElement('button');
  next.type = 'button';
  next.id = 'modal-next';
  next.className = 'modal-next btn';
  next.textContent = 'Next';

  container.appendChild(previous);
  container.appendChild(next);
  return container;
}

fetchUser();

