const localPath = "http://3.133.161.95:8080/";

export async function authUser(password: string) {
    const response = await fetch(localPath + "login", {
        method: "POST",
        body: JSON.stringify({ password }),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (response.status == 400) {
        console.log(data.error);
        throw new Error("Request Failed! Please Try again.");
    } else if (response.status == 401 || response.status == 403) {
        throw new Error("Not Authorized!!");
    }

    return data;
}

export async function logoutAuth() {
    const response = await fetch(localPath + "logout", {
        method: "POST",
        body: JSON.stringify({ cmd: "LOGOUT" }),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (response.status == 400) {
        console.log(data.error);
        throw new Error("Request Failed! Please Try again.");
    } else if (response.status == 401 || response.status == 403) {
        throw new Error("Not Authorized!!");
    }

    return data;
}

export async function updateAuth(auth: {
    password: string;
    newPassword: string;
}) {
    const response = await fetch(localPath + "updatePassword", {
        method: "POST",
        body: JSON.stringify(auth),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (response.status == 400) {
        console.log(data.error);
        throw new Error("Request Failed! Please Try again.");
    } else if (response.status == 401 || response.status == 403) {
        throw new Error("Not Authorized!!");
    }

    return data;
}
