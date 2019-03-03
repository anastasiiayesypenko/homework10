'use strict'


function getAllUsers() {
    fetch('https://test-users-api.herokuapp.com/users/')
        .then(response => {
            if (response.ok) return response.json();

            throw new Error('Error' + response.statusText)
        })
        .then(users => getAllField.textContent = JSON.stringify(users.data))
        .catch(error => console.log('Error! ' + error));
};

function getUserById(id) {
  fetch(`https://test-users-api.herokuapp.com/users/${id}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error' + response.statusText);
    })
    .then(user => {
      if (user.data === undefined) {
        getIDResult.textContent = 'Нет такого пользователя!';
      } else {
        getIDResult.textContent = JSON.stringify(user.data);
      }
    }).catch(error => console.log('Error! ' + error));
}

function addUser(name, age) {
  fetch('https://test-users-api.herokuapp.com/users/', {
    method: 'POST',
    body: JSON.stringify({name, age}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (response.ok) return response.json();
    throw new Error('Error' + response.statusText)
    })
    .then(user => 
      newUserResult.textContent = 
      `Пользователь ${user.data.name} успешно добавлен!`)
    .catch(error => 'Error! ' + error);
}

function removeUser(id) {
  fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
    method: 'DELETE',
  }).then(response => {
    if (response.ok) return response.json();
    throw new Error('Error' + response.statusText);
  })
  .then(user => {
    if (user.data === undefined) {
      removedUser.textContent = 'Такого юзера нет в базе!';
    } else {
      removedUser.textContent = (user.data.name + ' successfully deleted!')
    }
  })
  .catch(error => console.log('Error! ' + error));
}

function updateUser(id, {name, age}) {
  fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({name, age}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (response.ok) return response.json();
    throw new Error('Error' + response.statusText);
  })
  .then(changeduser => {
    if (changeduser.data === undefined) {
      updateUserResult.textContent = 'Нет такого пользователя!';
    } else {
      updateUserResult.textContent = 'Новые данные: ' + JSON.stringify(changeduser.data);
    }
  })
  .catch(error => console.log('Error! ' + error));
}


// getUserById('5c7631c6c5adfc0014f0925f');
// addUser('Elena Malysheva', 57);
// removeUser('5c7af25998ab3600140cf9fd');
// const newUser = {
//   name: 'Philip Kirkorov777',
//   age: 51,
// }


// create interface

const wrapper = document.querySelector('.wrapper');

// GET ALL
const getAllWrapper = document.createElement('div');
getAllWrapper.classList.add('js-form-getAll')
const getAllButton = document.createElement('button');
const getAllField = document.createElement('div');
getAllField.classList.add('js-result');
getAllField.textContent = '';

getAllButton.textContent = 'Получить список всех пользователей';

getAllButton.addEventListener('click', getAllUsers);
getAllWrapper.append(getAllButton, getAllField);


// GET ONE BY ID
const getByIDButton = document.createElement('button');
const getIDInput = document.createElement('input');
const getIDForm = document.createElement('form');
const getIDResult = document.createElement('div');

getIDInput.setAttribute('placeholder', 'Введите id пользователя');

getIDResult.classList.add('js-result');
getByIDButton.textContent = 'Найти пользователя';
function onGetID(event) {
  event.preventDefault();
  getUserById(getIDInput.value);  
};
getIDForm.addEventListener('submit', onGetID);
getIDForm.append(getIDInput, getByIDButton, getIDResult);



// ADD USER
const addUserButton = document.createElement('button');
const getNameInput = document.createElement('input');
const getAgeInput = document.createElement('input');
const newUserResult = document.createElement('div');
newUserResult.classList.add('js-result');
const addUserForm = document.createElement('form');

addUserButton.textContent = 'Добавить пользователя'
getNameInput.setAttribute('placeholder', 'Введите имя');
getAgeInput.setAttribute('placeholder', 'Введите возраст');
getNameInput.required = true;
getAgeInput.required = true;

function onUserAdd(event) {
  event.preventDefault();
  addUser(getNameInput.value, getAgeInput.value);
}
addUserForm.addEventListener('submit', onUserAdd);
addUserForm.append(getNameInput, getAgeInput, addUserButton, newUserResult);


// REMOVE USER
const removeUserButton = document.createElement('button');
const removeInput = document.createElement('input');
const removedUser = document.createElement('div');
removedUser.classList.add('js-result');
const removeUserForm = document.createElement('form');

removeUserButton.textContent = 'Удалить пользователя'
removeInput.setAttribute('placeholder', 'Введите id пользователя');
function onUserRemove(event) {
  event.preventDefault();
  removeUser(removeInput.value);
}
removeUserForm.addEventListener('submit', onUserRemove);
removeUserForm.append(removeInput, removeUserButton, removedUser);



// UPDATE USER
const updateUserButton = document.createElement('button');
const IDForUpdate = document.createElement('input');
const updatedName = document.createElement('input');
const updatedAge = document.createElement('input');
const updateUserResult = document.createElement('div');
updateUserResult.classList.add('js-result');
const updateUserForm = document.createElement('form');

updateUserButton.textContent = 'Изменить данные пользователя';
IDForUpdate.setAttribute('placeholder', 'Введите id');
updatedName.setAttribute('placeholder', 'Введите новое имя');
updatedAge.setAttribute('placeholder', 'Введите новый возраст');
function onUserUpdate(event) {
  event.preventDefault();
  updateUser(IDForUpdate.value, {name: updatedName.value, age: updatedAge.value});
}
updateUserForm.addEventListener('submit', onUserUpdate);
updateUserForm.append(IDForUpdate, updatedName, updatedAge, updateUserButton, updateUserResult);




wrapper.append(getAllWrapper, getIDForm, addUserForm, removeUserForm, updateUserForm);