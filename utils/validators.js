const validateRegisterInput = (name, email, password) => {
  const errors = {};
  
  if (name.trim() === '') {
    errors.name = 'Name must not be empty';
  }
  
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  
  if (password === '') {
    errors.password = 'Password must not be empty';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

const validateLoginInput = (email, password) => {
  const errors = {};
  
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  }
  
  if (password === '') {
    errors.password = 'Password must not be empty';
  }
  
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

const validateProductInput = (name, description, price, stock) => {
  const errors = {};
  
  if (name.trim() === '') {
    errors.name = 'Name must not be empty';
  }
  
  if (description.trim() === '') {
    errors.description = 'Description must not be empty';
  }
  
  if (isNaN(price)) {
    errors.price = 'Price must be a number';
  } else if (price <= 0) {
    errors.price = 'Price must be greater than 0';
  }
  
  if (isNaN(stock)) {
    errors.stock = 'Stock must be a number';
  } else if (stock < 0) {
    errors.stock = 'Stock cannot be negative';
  }
  
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateProductInput
};