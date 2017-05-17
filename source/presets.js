export const CreditCard = [
    { match: /^\d{4}/ },
    { exactly: "-" },
    { match: /^\d{4}/ },
    { exactly: "-" },
    { match: /^\d{4}/ },
    { exactly: "-" },
    { match: /^\d{4}/ }
];

export const CreditCardDate = [
    { match: /^[01][0-9]/ },
    { exactly: "/" },
    { match: /^2[0-9]{3}/ }
];
