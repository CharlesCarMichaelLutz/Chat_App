export function checkUsername(username, isSignUp) {
  const errors = []

  if (isSignUp) {
    if (username.length < 10) {
      errors.push("Username must be at least 10 characters long.")
    }

    if (username.length > 30) {
      errors.push("Username must be no more than 30 characters long.")
    }
  }

  return errors
}

export function checkPassword(password, isSignUp) {
  const errors = []

  if (isSignUp) {
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
  }

  return errors
}

export function renderLoginErrors(args) {
  const errors = []
  if (args !== 200) {
    errors.push("Invalid username or password.")
  }
  return errors
}
