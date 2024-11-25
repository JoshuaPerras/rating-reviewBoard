function Validation(values) {
    let errors = {};
  
    // Check if username is empty
    if (!values.username || values.username.trim() === "") {
      errors.username = "Username should not be empty";
    }
  
    // Check if password is empty
    if (!values.password || values.password.trim() === "") {
      errors.password = "Password should not be empty";
    }
  
    return errors;
  }
  
  export default Validation;
  
