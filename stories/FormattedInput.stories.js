import React from "react";

import { FormattedInput } from "../source/index.js";

export default {
  title: "Formatted Input",
  component: FormattedInput,
};

const Template = (args) => <FormattedInput {...args} />;

export const DateInputYearFirst = Template.bind({});
DateInputYearFirst.args = {
  format: [
        { char: /\d/, repeat: 4 },
        { exactly: "-" },
        { char: /[01]/, repeat: 1 },
        { char: /\d/, repeat: 1 },
        { exactly: "-" },
        { char: /[0-3]/, repeat: 1 },
        { char: /\d/, repeat: 1 }
    ],
    value: "2020-10-20"
};

export const DateInputDDMMYYYY = Template.bind({});
DateInputDDMMYYYY.args = {
    format: [
        { char: /[0-3]/, repeat: 1 },
        { char: /\d/, repeat: 1 },
        { exactly: "/" },
        { char: /[01]/, repeat: 1 },
        { char: /\d/, repeat: 1 },
        { exactly: "/" },
        { char: /\d/, repeat: 4 }
    ],
    value: "19/08/1990"
};

export const CreditCardNumber = Template.bind({});
CreditCardNumber.args = {
    format: [
        { char: /\d/, repeat: 4 },
        { exactly: "-" },
        { char: /\d/, repeat: 4 },
        { exactly: "-" },
        { char: /\d/, repeat: 4 },
        { exactly: "-" },
        { char: /\d/, repeat: 4 }
    ],
    value: "4111111111111111"
};
