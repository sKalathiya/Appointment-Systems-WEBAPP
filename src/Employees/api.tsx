import { IEmployeePost, Shift } from "../HELPERS/types";

const localPath = "http://3.133.161.95:8080/";

export async function getEmployees() {
    const response = await fetch(localPath + "worker", {
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

export async function getEmployee(id: string) {
    const response = await fetch(localPath + "worker/" + id, {
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

export async function addEmployee(formData: string) {
    const response = await fetch(localPath + "worker/add", {
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

export async function updateEmployee(formData: IEmployeePost, id: string) {
    const response = await fetch(localPath + "worker/update/" + id, {
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

export async function updateSchedule(schedule: Shift[], id: string) {
    const response = await fetch(localPath + "worker/update/schedule/" + id, {
        method: "POST",
        body: JSON.stringify(schedule),
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

export async function deleteEmployee(_id: string) {
    const response = await fetch(localPath + "worker/" + _id, {
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
