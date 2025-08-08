export function checkUsername(username) {
  //throw error if
  // username is less than 10 characters
  // username is greater than 30 characters
  const errors = []

  if (username.length < 10) {
    errors.push("Username must be at least 10 characters long.")
  }

  if (username.length > 30) {
    errors.push("Username must be no more than 30 characters long.")
  }

  return errors
}

export function checkPassword(password) {
  //throw error if
  // password is less than 10 characters
  // password is greater than 30 characters
  //passwword does not have a capital letter
  //password does not have a number

  const errors = []

  if (password.length < 10) {
    errors.push("Must be at least 10 characters long.")
  }

  if (password.length > 30) {
    errors.push("Must be no more than 30 characters long.")
  }

  if (!password.match(/[a-z]/)) {
    errors.push("Must include at least one lowercase letter.")
  }

  if (!password.match(/[A-Z]/)) {
    errors.push("Must include at least one capital letter.")
  }

  if (!password.match(/[0-9]/)) {
    errors.push("Must include at least one number.")
  }

  return errors
}

//implement with axios request of loginAction inside Authrpovider
function checkUsernameAndPassword(response) {
  //throw error if
  //response.data !== "success"

  //highlight both username and password fields on form red
  //display "Incorrect username or password. Please try again."
  //below password field

  const errors = []

  return errors
}
