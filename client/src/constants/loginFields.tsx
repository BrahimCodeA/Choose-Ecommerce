type FieldProps = {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  name: string;
};

const email = "";
const password = "";

export const fields: FieldProps[] = [
  {
    label: "Adresse email",
    type: "email",
    placeholder: "choose@gmail.com",
    name: "email",
    value: email,
  },
  {
    label: "Mot de passe",
    type: "password",
    placeholder: "**********",
    name: "password",
    value: password,
  },
];
