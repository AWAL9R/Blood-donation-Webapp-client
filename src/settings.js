export const APP_NAME="BloodLink";
export const APP_NAME_FULL="BloodLink.com";

export const statusColor = (status) => {
    const statusEs = {
        "pending": "badge-info",
        "in-progress": "badge-warning",
        'done': "badge-success",
        "canceled": "badge-error"
    }
    return statusEs[status] || ''
}

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];