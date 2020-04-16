import {userModel} from "../models/UserModel";


export function userSignIn(userAuthData) {

    fetch('/api/users/sign_in', {
        method: "POST",
        dataType: "JSON",
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
