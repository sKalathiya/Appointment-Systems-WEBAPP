import { slotSearch } from "./Slots";

const localPath = "http://localhost:8080/";

export async function getAppointments() {
    const response = await fetch(localPath + "appointments", {
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

export async function filterAppointment(formData: {
    from: string;
    to: string;
}) {
    const response = await fetch(
        localPath +
            "appointment/filter?from=" +
            encodeURIComponent(formData.from) +
            "&to=" +
            encodeURIComponent(formData.to),
        {
            credentials: "include",
        }
    );
    const data = await response.json();
    if (response.status == 400) {
        console.log(data.error);
        throw new Error("Request Failed! Please Try again.");
    } else if (response.status == 401 || response.status == 403) {
        throw new Error("Not Authorized!!");
    }

    return data;
}

export async function changeStatus(formData: {
    status: string;
    _id: string;
    paid: string;
    tip: string;
}) {
    const response = await fetch(
        localPath + "appointment/update/" + formData._id,
        {
            method: "POST",
            body: JSON.stringify(formData),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();
    if (response.status == 400) {
        console.log(data.error);
        throw new Error("Request Failed! Please Try again.");
    } else if (response.status == 401 || response.status == 403) {
        throw new Error("Not Authorized!!");
    }

    return data;
}

export async function getSlots(formData: slotSearch) {
    const response = await fetch(localPath + "appointment/slots", {
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

export async function addAppointment(formData: string) {
    const response = await fetch(localPath + "appointment/add", {
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

export function getStringFromDate(date: Date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return year + "-" + month + "-" + day;
}

export function getDateFromString(date: string) {
    var dateArray = date.split("-");
    var year = parseInt(dateArray[0]);
    var month = parseInt(dateArray[1], 10) - 1;
    var day = parseInt(dateArray[2]);
    var _entryDate = new Date(year, month, day);
    return _entryDate;
}
