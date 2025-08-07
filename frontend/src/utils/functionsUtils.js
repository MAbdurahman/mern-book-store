
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

export function validateName(username) {
   let name_trimmed = username.trim();
   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;

   if (name_trimmed.length === 0) {
      return {isValid: false, error: 'Your first and last name is required!'};

   }
   if (!name_trimmed.match(name_pattern)) {
      return {isValid: false, error: 'Enter your first and last name!'};
   }

   return {isValid: true};

}

export function validateEmailPassword(email, password) {
   let email_trimmed = email.trim();
   let password_trimmed = password.trim();

   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   if (email_trimmed.length === 0) {
      return {isValid: false, error: 'Your email is required!'};
   }
   if (!email_trimmed.match(email_pattern)) {
      return {isValid: false, error: 'Enter a valid email!'};
   }
   if (password_trimmed.length === 0) {
      return {isValid: false, error: 'Your password is required!'};
   }
   if (password_trimmed.length < 8) {
      return {isValid: false, error: 'A password must be at least 8 characters!'};
   }
   return {isValid: true};
}

export function validateUserInfo(username, email, password) {
   let name_trimmed = username.trim();
   let email_trimmed = email.trim();
   let password_trimmed = password.trim();

   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;
   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   if (name_trimmed.length === 0) {
      return {isValid: false, error: 'Your first and last name is required!'};
   }
   if (!name_trimmed.match(name_pattern)) {
      return {isValid: false, error: 'Enter your first and last name!'};
   }
   if (email_trimmed.length === 0) {
      return {isValid: false, error: 'Your email is required!'};
   }
   if (!email_trimmed.match(email_pattern)) {
      return {isValid: false, error: 'Enter a valid email!'};
   }
   if (password_trimmed.length === 0) {
      return {isValid: false, error: 'Your password is required!'};
   }
   if (password_trimmed.length < 8) {
      return {isValid: false, error: 'A password must be at least 8 characters!'};
   }
   return {isValid: true};
}

export function formatDate(ISODate) {
   const date = new Date(ISODate);
   /*return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;*/
   return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
   });
}

export function formatWithDecimals(number) {
   return (Math.round(number * 100) / 100).toFixed(2);
}

export function updateCart(state) {
   const orderItemsPrice = state.orderItems.reduce(
      (acc, orderItem) => acc + (orderItem.price * 100 * orderItem.quantity) / 100,
      0
   );
   state.orderItemsPrice = formatWithDecimals(orderItemsPrice);

   const shippingPrice = orderItemsPrice > 100 ? 0 : 10;

   state.shippingPrice = formatWithDecimals(shippingPrice);

   const taxPrice = 0.15 * orderItemsPrice;
   state.taxPrice = formatWithDecimals(taxPrice);

   const totalPrice = orderItemsPrice + shippingPrice + taxPrice;
   state.totalPrice = formatWithDecimals(totalPrice);

   localStorage.setItem('eBook_Store_Cart', JSON.stringify(state));

   return state;
}