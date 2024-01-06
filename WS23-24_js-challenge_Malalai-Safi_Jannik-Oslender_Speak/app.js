const form = document.querySelector("#signUp");
const email = document.querySelector("#email input");
const emailExplainer = document.querySelector("#email .explainer")
const username = document.querySelector("#username input");
const usernameExplainer = document.querySelector("#username .explainer")
const password = document.querySelector("#password input");
const passwordExplainer = document.querySelector("#password .explainer")
const passwordExplainerValid = document.querySelector("#password .explainer #allValid")
const button = document.querySelector("button");

let emailAllValid = [false];
let usernameAllValid = [false];
let passwordAllValid = [false];
let allValid = [];

//prevent form from redirection & console.logs input

form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(email.value);
    console.log(username.value);
    console.log(password.value);
})

//generic function to toggle the explainer texts

const updateExplainer = (id, valid) => {
    const requirement = document.querySelector(id);
    if (valid) {
        requirement.classList.remove("show")
        return true
    } else {
        requirement.classList.add("show")
        return false
    }
}



//input Email

//turn red when not in focus & not valid

email.addEventListener("blur", function () {
    if (emailAllValid.every(Boolean)) {
        email.classList.remove("faulty");
        emailExplainer.classList.remove("faulty");
    } else {
        email.classList.add("faulty");
        emailExplainer.classList.add("faulty");
    }
})

//turn black when in focus again

email.addEventListener("focus", function () {
    email.classList.remove("faulty");
    emailExplainer.classList.remove("faulty");
})

//show Explainer during typing

email.addEventListener("input", function () {
    emailAllValid[0] = updateExplainer("#email #hasUsername", email.value.length > email.value.indexOf("@") && email.value.length !== 0 && email.value.indexOf("@") !== 0);
    emailAllValid[1] = updateExplainer("#email #hasAt", email.value.indexOf("@") != -1);
    emailAllValid[2] = updateExplainer("#email #hasDomain", email.value.indexOf("@") != -1 && email.value.length > email.value.indexOf("@") + 4 && email.value.indexOf(".") !== -1 && email.value.indexOf(".") < email.value.length - 2);
})



//input Username

//turn red when not in focus & not valid

username.addEventListener("blur", function () {
    if (usernameAllValid.every(Boolean)) {
        username.classList.remove("faulty");
        usernameExplainer.classList.remove("faulty");
    } else {
        username.classList.add("faulty");
        usernameExplainer.classList.add("faulty");
    }
})

//turn black when in focus again

username.addEventListener("focus", function () {
    username.classList.remove("faulty");
    usernameExplainer.classList.remove("faulty");
})

//show Explainer during typing

username.addEventListener("input", function () {
    usernameAllValid[0] = updateExplainer("#username #hasUpperStart", username.value.charAt(0) === username.value.charAt(0).toUpperCase());
    usernameAllValid[1] = updateExplainer("#username #hasNoSpecial", /^[a-zA-Z0-9äöüÄÖÜ]*$/.test(username.value));
})



//input Password

//turn red when not in focus & not valid

password.addEventListener("blur", function () {
    if (passwordAllValid.every(Boolean)) {
        password.classList.remove("faulty");
        passwordExplainer.classList.remove("faulty");
    } else {
        password.classList.add("faulty");
        passwordExplainer.classList.add("faulty");
    }
})

//turn black when in focus again

password.addEventListener("focus", function () {
    password.classList.remove("faulty");
    passwordExplainer.classList.remove("faulty");
})

//show Explainer during typing

password.addEventListener("input", function () {
    passwordAllValid[0] = updateExplainer("#password #hasMin", password.value.length >= 10);
    passwordAllValid[1] = updateExplainer("#password #hasUpper", /[A-Z]/.test(password.value));
    passwordAllValid[2] = updateExplainer("#password #hasLower", /[a-z]/.test(password.value));
    passwordAllValid[3] = updateExplainer("#password #hasNum", /[0-9]/.test(password.value));
    if (passwordAllValid.every(Boolean)) {
        setTimeout(() => passwordExplainerValid.classList.add("show"), 1000);
    } else if (!passwordAllValid.every(Boolean)) {
        passwordExplainerValid.classList.remove("show");
    }
})

//prevents button from being clicked when inputs are invalid

window.addEventListener("keydown", function () {
    setTimeout(() => {
        allValid = [...emailAllValid, ...usernameAllValid, ...passwordAllValid]
        if (allValid.every(Boolean)) {
            button.disabled = false
        } else {
            button.disabled = true
        }
    }, 1000);
})