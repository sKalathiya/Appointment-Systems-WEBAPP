import { Service } from "../HELPERS/types";

const localPath = "http://localhost:8080/";

export async function getServices() {
    const response = await fetch(localPath + "service", {
        credentials: "include",
    });
    if (response.status == 400) {
        throw new Error("Request Failed! Please Try again.");
    } else if (response.status == 401 || response.status == 403) {
        throw new Error("Not Authorized!!");
    }
    const data = await response.json();
    return data;
}

export async function getService(_id: string) {
    const response = await fetch(localPath + "service/" + _id, {
        credentials: "include",
    });
    if (response.status == 400) {
        throw new Error("Request Failed! Please Try again.");
    } else if (response.status == 401 || response.status == 403) {
        throw new Error("Not Authorized!!");
    }
    const data = await response.json();
    return data;
}

export async function addService(formData: string) {
    const response = await fetch(localPath + "service/add", {
        method: "POST",
        body: formData,
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

export async function updateService(formData: Service) {
    const response = await fetch(localPath + "service/update/" + formData._id, {
        method: "POST",
        body: JSON.stringify(formData),
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

export async function deleteService(_id: string) {
    const response = await fetch(localPath + "service/" + _id, {
        method: "DELETE",
        credentials: "include",
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
