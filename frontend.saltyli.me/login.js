export function renderLogin(appState) {
    const content = document.querySelector('content');
    content.innerHTML = `
        <div class="text-center">
        <main class="form-signin">
            <img class="mb-4" src="/static/img/lime1.svg" alt="" width="72" height="57">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
            <input type="email" class="form-control" id="emailInput" placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
            <input type="password" class="form-control" id="passwordInput" placeholder="Password">
            <label for="floatingPassword">Password</label>
            </div>
            <div class="checkbox mb-3">
            <label>
                <input type="checkbox" id="checkboxInput" checked> Remember me
            </label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" id="loginButton" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </main>
        </div>
    `;
    function getLoginValues() {
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;
        const isChecked = document.getElementById("checkboxInput").checked;

        return { email, password, isChecked };
    };

    function setLoading(isLoading) {
        const loginSubmit = document.getElementById("loginButton");
        if ( isLoading ) {
            loginSubmit.outerHTML = `<button class="w-100 btn btn-lg btn-primary" id="loginButton" type="submit">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button>`
        } else {
            loginSubmit.outerHTML = `<button class="w-100 btn btn-lg btn-primary" id="loginButton" type="submit">Sign in</button>`
        }
    };
    
    const loginSubmit = document.getElementById("loginButton");
    loginSubmit.addEventListener('click', sendLogin);

    function sendLogin() {
        const loginValues = getLoginValues();
        setLoading(true);
        fetch("https://api.saltyli.me/api/auth/login", {
            "headers": {
              "accept": "*/*",
              "accept-language": "en-US,en;q=0.9",
              "content-type": "application/json",
              "sec-fetch-dest": "empty",
              "sec-gpc": "1"
            },
            "body": `{\"username_or_email\":\"${loginValues.email}\",\"password\":\"${loginValues.password}\"}`,
            "method": "POST",
            "credentials": "omit"
          })
        .then(response => {
            if (response.status === 200) {
                response.json().then( (_json) => {
                    appState.setCore('token', _json.data.token)
                    if ( loginValues.isChecked ) {
                        document.cookie = `token=${_json.data.token}; Secure`;
                    };
                    window.location.assign('#')
                });
            };
        })
        .catch(err => {
            console.log(err);
        }).finally( () => {
            setLoading(false);
            const loginSubmit = document.getElementById("loginButton");
            loginSubmit.addEventListener('click', sendLogin);
        });
    };


}
