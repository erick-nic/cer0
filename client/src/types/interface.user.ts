import { JSX } from "react/jsx-runtime";

type ObjectId = string;

interface IUsers {
    [ x: string ]: any;
    _id?: ObjectId,
    name?: string,
    email: string,
    password: string,
    address: {
        street: string,
        city: string,
        state: string,
        postalCode: string
    },
    phone: string,
    createdAt?: string,
    updatedAt?: string,
}

export default IUsers