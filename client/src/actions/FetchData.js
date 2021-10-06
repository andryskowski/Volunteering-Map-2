/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-alert */

// PLACES:
export async function getDataFromDb() {
  const response = await fetch('http://localhost:8000/places')
    .then((resp) => resp.json())
    .catch((error) => {
      console.error(`${error.name}: ${error.message}`);
      alert('Error retrieving data!');
    });
  return response;
}

export async function postPlaces(NEW_PLACE, CURRENT_USER_USERNAME) {
  await fetch('http://localhost:8000/places/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      name: NEW_PLACE.placeName,
      img: NEW_PLACE.logo,
      shortDescription: NEW_PLACE.shortDescription,
      description: NEW_PLACE.description,
      category: NEW_PLACE.category,
      position: NEW_PLACE.latLng,
      phone: NEW_PLACE.phone,
      email: NEW_PLACE.email,
      webPage: NEW_PLACE.webPage,
      city: NEW_PLACE.city,
      street: NEW_PLACE.street,
      postalCode: NEW_PLACE.postalCode,
      houseNo: NEW_PLACE.houseNo,
      district: NEW_PLACE.district,
      smallMapOfPlace: NEW_PLACE.smallMapOfPlace,
      statusPlace: NEW_PLACE.statusPlace,
      addedBy: CURRENT_USER_USERNAME,
    }),
  });
  alert('Wyslano do bazy danych');
}

// USERS AUTHENTICATION:
export async function authLogin(emailUser, passwordUser) {
  const response = await fetch('http://localhost:8000/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      email: emailUser,
      password: passwordUser,
    }),
  }).then((resp) => {
    if (resp.ok) {
      return resp.text();
    }
    return resp.text().then((text) => { throw Error(text); });
  })
    .then((responseText) => {
      localStorage.setItem('CURRENT_USER', responseText);
      window.location = '/';
    })
    .catch((resp) => {
      alert(resp);
    });
  return response;
}

export async function authRegister(nameUser, emailUser, passwordUser) {
  const response = await fetch('http://localhost:8000/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      name: nameUser,
      email: emailUser,
      password: passwordUser,
    }),
  }).then((resp) => {
    if (resp.ok) {
      return resp.text();
    }
    return resp.text().then((text) => { throw Error(text); });
  })
    .then((responseText) => {
      localStorage.setItem('CURRENT_USER', responseText);
      alert('Rejestracja zakonczona sukcesem');
      window.location = '/';
    })
    .catch((resp) => {
      alert(resp);
    });
  return response;
}

// USERS
export async function updateUser(newProfilePhoto, newUsername, newEmail, currentUserId) {
  const response = await fetch(`http://localhost:8000/users/patch/${currentUserId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      profilePhoto: newProfilePhoto,
      name: newUsername,
      email: newEmail,
    }),
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.text();
      }
      return resp.text().then((text) => {
        throw Error(text);
      });
    })
    .then((responseText) => {
      localStorage.setItem('CURRENT_USER', responseText);
      window.location.reload(true);
    })
    .catch((resp) => {
      console.error(resp);
    });
  return response;
}
