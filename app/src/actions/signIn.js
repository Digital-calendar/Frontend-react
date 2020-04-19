import {userModel} from "../models/UserModel";


export async function userSignIn(userAuthData) {

    const response = await fetch('/api/users/sign_in', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(userAuthData),
        headers: {
            "Content-Type": "application/json"
        }
    });

    userModel.user = await response.json();

}
