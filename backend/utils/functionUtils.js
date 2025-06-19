

export function validateName(username) {
   let name_trimmed = username.trim();
   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;

   if (name_trimmed.length === 0) {
      return false;
   }

   return name_trimmed.match(name_pattern);
}

export function validateEmail(email) {
   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;
   let email_trimmed = email.trim();

   if (email_trimmed.length === 0) {
      return false;
   }

   return email_trimmed.match(email_pattern);

}

export function validatePassword(password) {
   const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,}$/i;
   let password_trimmed = password.trim();

   if (password_trimmed.length === 0) {
      return false;
   }

   return password_trimmed.match(password_pattern);

}

export const messageHandler = (res,  message = '', success = true, statusCode = 200, data = {},) =>
   res.status(statusCode).json({ message, success, data });

export function getFirstName(fullName) {
   let name = [];
   name = fullName.split(' ');

   return name[0];
}

export function getLastName(fullName) {
   let name = [];
   name = fullName.split(' ');
   if (name.length <= 2) {
      return name[name.length - 1];
   } else {
      name = name[1];
      name = name.replace(',', '');
      return name;
   }
}