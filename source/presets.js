export const CreditCard = [
    { char: /\d/, repeat: 4 },
    { exactly: "-" },
    { char: /\d/, repeat: 4 },
    { exactly: "-" },
    { char: /\d/, repeat: 4 },
    { exactly: "-" },
    { char: /\d/, repeat: 4 }
];

export const CreditCardDate = [
    { char: /[01]/ },
    { char: /[0-9]/ },
    { exactly: "/" },
    { char: /2/ },
    { char: /[0-9]/, repeat: 3 }
];
