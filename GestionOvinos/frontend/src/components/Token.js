function theToken() {
    let token = null;
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
        token = JSON.parse(loggedUserJSON);
    };
    const config = {
        headers: {
            "Authorization": token
        }
    };
    return config;
}    


export default theToken;