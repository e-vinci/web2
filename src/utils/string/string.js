const getNamesFromEmail = (email) => {
  let names = email.substring(0, email.indexOf("@"));
  let firstname = names.substring(0, names.indexOf("."));
  let lastname = names.substring(names.indexOf(".") + 1);
  firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
  lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);
  // deal with cases where Extra info is added to the name, when there is a second dot
  if (lastname.indexOf(".") >= 0) {
    lastname = lastname.substring(lastname.indexOf(".") + 1);
    lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);
  }
  return firstname + " " + lastname;
};

export { getNamesFromEmail };
