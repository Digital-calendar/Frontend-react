import {userModel, UserModel} from "../models/UserModel";

interface userAuthDataInterface {
    id: number,
    email: string,
    pass: string
}

export function userSignIn(userAuthData: userAuthDataInterface) {

    fetch('/api/users/sign_in', {
        method: "POST",
        body: JSON.stringify(userAuthData),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        userModel.user = data;
    })

}
