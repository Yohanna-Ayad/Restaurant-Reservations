function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const queries = queryString.split("&");

    queries.forEach(query => {
        const [key, value] = query.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    return params;
}

// Get the query parameters
const queryParams = getQueryParams();

// Set each query parameter in local storage
for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
        if (key === "id")
            localStorage.setItem("tableId", queryParams[key]);
        else
        localStorage.setItem(key, queryParams[key]);
    }
}

// For demonstration purposes, let's log the local storage contents
// console.log("Local Storage Contents:");
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    // console.log(`${key}: ${localStorage.getItem(key)}`);
}

getQueryParams()