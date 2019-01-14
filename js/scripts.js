const body = document.getElementsByTagName('body')[0];
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');



const fetchUsers = () => {
  fetch('https://randomuser.me/api/?results=12')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      processData(data.results);
    })
}

const processData = (data) => {
  const employees = data.map((employee, i) => {
    return {
      index: i,
      profilePic: employee.picture.large,
      name: `${employee.name.first} ${employee.name.last}`,
      email: employee.email,
      cityState: `${employee.location.city}, ${employee.location.state}`,
      phone: employee.cell,
      address: `${employee.location.street} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`,
      birthday: formatBirthday(employee.dob)
    }
  })
  displayCards(employees);
}

formatBirthday = (dob) => {
  const dateStr = dob.date.slice(0, 10);
  const splitDate = dateStr.toString().split('-');
  const formattedDOB = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
  return formattedDOB;
}

const displayCards = (employees) => {
  employees.forEach((employee) => {
    createCard(employee);
  })
}

const displayModal = (e) => {
  const parent = e.target.nextElementChild;
  console.log(parent);
  // if (e.target.className === 'card') {

  // }
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
  closeButton.textContent = 'X';

  const modalInfoContainer = document.createElement('div');
  modalInfoContainer.className = 'modal-info-container';

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
  pAddress.className = 'modal-text';
  pAddress.textContent = employee.address;

  const pDOB = document.createElement('p');
  pDOB.className = 'modal-text';
  pDOB.textContent = `Birthday: ${employee.birthday}`;

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

gallery.addEventListener('click', displayModal);
fetchUsers();
