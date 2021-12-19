/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-alert */

// PLACES:
export async function getPlaces() {
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

export async function updatePlaceStatus(placeId, newStatus) {
  const response = await fetch(`http://localhost:8000/places/patch/changeStatus/${placeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      statusPlace: newStatus,
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
    .then(() => {
      window.location.reload(true);
    })
    .catch((resp) => {
      console.error(resp);
    });
  return response;
}

export async function removePlace(placeId) {
  console.log(placeId);
  const response = await fetch(`http://localhost:8000/places/delete/${placeId}`, {
    method: 'DELETE',
  })
    .then((res) => res.text()) // or res.json()
    .then((res) => console.log(res));
  return response;
}

export async function updatePlace(placeId, placeName, logo, shortDescription, description,
  category, phone, email, webPage, city, street, postalCode, houseNo, district, position) {
  const response = await fetch(`http://localhost:8000/places/patch/editplace/${placeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      name: placeName,
      img: logo,
      shortDescription,
      description,
      category,
      phone,
      email,
      webPage,
      city,
      street,
      postalCode,
      houseNo,
      district,
      position,
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
    .then(() => {
      window.location.reload(true);
    })
    .catch((resp) => {
      console.error(resp);
    });
  return response;
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

export async function getUsers() {
  const response = await fetch('http://localhost:8000/users/get')
    .then((resp) => resp.json())
    .catch((error) => {
      console.error(`${error.name}: ${error.message}`);
      alert('Error retrieving data!');
    });
  return response;
}

export async function getUser(userId) {
  const response = await fetch(`http://localhost:8000/users/get/${userId}`)
    .then((resp) => resp.json())
    .catch((error) => {
      console.error(`${error.name}: ${error.message}`);
      // alert('Error retrieving data!');
    });
  console.log(response);
  return response;
}

export async function removeUser(userId) {
  console.log(userId);
  const response = await fetch(`http://localhost:8000/users/delete/${userId}`, {
    method: 'DELETE',
  })
    .then((res) => res.text()) // or res.json()
    .then((res) => console.log(res));
  return response;
}

export async function updateUser(newProfilePhoto, newUsername, newEmail, currentUserId, newDescription) {
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
      description: newDescription,
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

export async function updateUserRole(currentUserId, newRole) {
  const response = await fetch(`http://localhost:8000/users/patch/changeRole/${currentUserId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      role: newRole,
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
    .then(() => {
      window.location.reload(true);
    })
    .catch((resp) => {
      console.error(resp);
    });
  return response;
}

// COMMENTS

export async function getComments() {
  const response = await fetch('http://localhost:8000/comments/')
    .then((resp) => resp.json())
    .catch((error) => {
      console.error(`${error.name}: ${error.message}`);
      alert('Error retrieving data!');
    });
  return response;
}

export async function postComment(authorIdComment, subjectComment, messageComment, placeIdComment) {
  await fetch('http://localhost:8000/comments/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      authorId: authorIdComment,
      subject: subjectComment,
      message: messageComment,
      placeId: placeIdComment,
    }),
  });
  alert('Wyslano do bazy danych');
}

// messenger

export async function postConversation(senderId, receiverId) {
  await fetch('http://localhost:8000/conversations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      senderId,
      receiverId,
    }),
  }).then((resp) => {
    if (resp.ok) {
      return resp.text();
    }
    return resp.text().then((text) => { throw Error(text); });
  });
  alert('Stworzono nowa konwersacje');
}

export async function findConversation(user1, user2) {
  const response = await fetch(`http://localhost:8000/conversations/find/${user1}/${user2}`)
    .then((resp) => resp.json())
    .catch((error) => {
      console.error(`${error.name}: ${error.message}`);
      alert('Error retrieving data!');
    });
  return response;
}

export async function postMessage(conversationId, sender, text) {
  await fetch('http://localhost:8000/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      conversationId,
      sender,
      text,
    }),
  });
  alert('Wyslano wiadomosc do db');
}

export async function getMessages(conversationId) {
  const response = await fetch(`http://localhost:8000/messages/${conversationId}`)
    .then((resp) => resp.json())
    .catch((error) => {
      console.error(`${error.name}: ${error.message}`);
      alert('Error retrieving data!');
    });
  return response;
}

// get the newest message from conversation
export async function getLastMessage(conversationId) {
  const response = await fetch(`http://localhost:8000/messages/newestmessage/${conversationId}`)
    .then((resp) => resp.json())
    .catch((error) => {
      console.error(`${error.name}: ${error.message}`);
      alert('Error retrieving data!');
    });
  return response;
}

export async function getConversations(userId) {
  const response = await fetch(`http://localhost:8000/conversations/${userId}`)
    .then((resp) => resp.json())
    .catch((error) => {
      console.error(`${error.name}: ${error.message}`);
      alert('Error retrieving data!');
    });
  return response;
}

export async function updateConversation(conversationId) {
  const response = await fetch(`http://localhost:8000/conversations/patch/updateTimeStamp/${conversationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.text();
      }
      return resp.text().then((text) => {
        throw Error(text);
      });
    });
  return response;
}

export async function visitedConversation(conversationId) {
  const response = await fetch(`http://localhost:8000/conversations/patch/visited/${conversationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.text();
      }
      return resp.text().then((text) => {
        throw Error(text);
      });
    });
  return response;
}
