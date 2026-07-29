const validator = require('validator')

const validateSignUp = (req) =>{
    const {firstName, lastName, password, email} = req.body
    if(!firstName || !lastName){
        throw new Error("Please enter valid name")
    } else if(!validator.isEmail(email)){
        throw new Error("Please enter valid email")
    } else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password")
    }
}

const validateProfileEditData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "email",
        "photoUrl",
        "gender",
        "age",
        "desc",
        "skills",
      ];
      const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
      );
    
      return isEditAllowed;
}

const validatePasswordUpdate = (req) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        throw new Error("Current password and new password are required");
    } else if (!validator.isStrongPassword(newPassword)) {
        throw new Error("Please enter strong password");
    } else if (currentPassword === newPassword) {
        throw new Error("New password must be different from current password");
    }
}

module.exports = {
    validateSignUp,
    validateProfileEditData,
    validatePasswordUpdate
}