/**
 * Este es un mini proyecto de interfaz gráfica. Su función es consumir los
 * recursos del servicio de backend y renderizarlos en pantalla.
 */

/**
 * URL base a ser utilizada por la aplicación.
 */
const url = `http://localhost:3000`

/**
 * Declarar los elementos <button> a utilizar.
 */
const getUsersButton = document.getElementById('getUsersButton')
const postUsersButton = document.getElementById('postUsersButton')
const deleteUsersButton = document.getElementById(`deleteUsersButton`)
const protectedUsersButton = document.getElementById(`protectedUsersButton`)

/**
 * Declarar los elementos <ul> a utilizar.
 */
const usersUl = document.getElementById('usersUl')

/**
 * Declarar los elementos <input> a utilizar.
 */
const postUserInput = document.getElementById(`postUserInput`)
const postUserPassword = document.getElementById(`postUserPassword`)
const deleteUserInput = document.getElementById(`deleteUserInput`)
const protectedUserInput = document.getElementById(`protectedUserInput`)

/**
 * Declarar los elementos <img> a utilizar.
 */
const protectedImg = document.getElementById(`protectedImg`)

/**
 * Función que renderiza todos los usuarios en el <ul> correspondiente.
 * Previamente borra si existe alguno.
 */
function getUsers() {
  // Hace la petición GET para obtener a todos los usuarios.
  fetch(`${url}/users`, requestOptions)
    // Convierte el body de la respuesta en objecto JSON usando JSON.parse.
    .then(response => response.json())
    .then(users => {
      // Limpia a todos los ususarios que estén renderizados en pantalla.
      document.querySelectorAll(`#usersUl li`).forEach(e => e.remove())
      // Renderiza a cada usario y hace append a `usersUl`
      users.forEach(user => {
        const userLi = document.createElement(`li`)
        userLi.textContent = `${user.id} - ${user.username}`
        usersUl.appendChild(userLi)
      });
    })
    .catch(error => console.error('error', error));
}

/**
 * ADD EVENT LISTENERS
 */

/**
 * Reload todos los usuarios del servicio de backend.
 */
getUsersButton.addEventListener(`click`, _event => getUsers())

/**
 * Crea un nuevo usuario en el servicio de backend.
 */
postUsersButton.addEventListener(`click`, _event => {
  // Crea cabeceras.
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Crear el cuerpo a enviar a backend.
  const body = {
    "username":postUserInput.value,
    "password":postUserPassword.value
  }

  // Crea las opciones utilizadas por `fetch`.
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: 'follow'
  };

  // Hace la petiución POST y vuelve a renderizar a todos los usuarios.
  fetch(`${url}/users/`, requestOptions)
    .then(_response => getUsers())
    .catch(error => console.error('error', error));
})

/**
 * Elimina a un usuario en el servicio de backend por id.
 */
deleteUsersButton.addEventListener(`click`, _event => {
  // Crea las opciones utilizadas por `fetch`.
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  // Hace la petición DELETE y vuelve a renderizar a todos los usuarios. 
  fetch(`${url}/users/${deleteUserInput.value}`, requestOptions)
    .then(_response => getUsers())
    .catch(error => console.log('error', error));
})

/**
 * Elimina a un usuario en el servicio de backend por id.
 */
protectedUsersButton.addEventListener(`click`, _event => {
  // Crea cabeceras.
  const myHeaders = new Headers();

  /** Agrega la cabecera `Authorization` que va a ser utilizada por el servicio
   *  de backend.
   * 
   *  El `Header` `Authorization` necesita tener el valor en el siguiente
   *  formato:
   *    "Bearer username:password"
   * 
   *   * Estos requerimientos son específicos de este servicio de backend.
   *   * Esto es una sobre simplificación de autorización.
   */
  myHeaders.append("Authorization", `Bearer ${protectedUserInput.value}`);

  // Crea las opciones utilizadas por `fetch`.
  const requestOptions = {
    method: `GET`,
    headers: myHeaders
  }

  fetch(`${url}/protected`, requestOptions)
    .then(response => response.text())
    .then(response => protectedImg.src = response)
})
