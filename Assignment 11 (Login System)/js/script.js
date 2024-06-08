var toggle = document.querySelector('.checkbox');
var flip = document.querySelector('.flip');

function isChecked() {
    if (toggle.checked) {
        flip.style.transform = "rotateY(180deg)"
    }
    else {
        flip.style.transform = "rotateY(0)"
    }
}

toggle.addEventListener('click', isChecked)

var liEmail = document.getElementById('li-email');
var liPassword = document.getElementById('li-password');
var suName = document.getElementById('su-name');
var suEmail = document.getElementById('su-email');
var suPassword = document.getElementById('su-password');
var loginBtn = document.getElementById('loginBtn');
var signupBtn = document.getElementById('signupBtn');
var loginSystem = document.getElementById('login-system');
var data = document.getElementById('data');
var info = document.getElementById('info');
var logoutBtn = document.getElementById('logoutBtn');


const toastAlert = document.getElementById('liveToast');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastAlert)

var users = [];

if (localStorage.getItem('users') != null) {
    users = JSON.parse(localStorage.getItem('users'));
}

function Alert(type, tite, message) {
    toastAlert.innerHTML = `
			                </div>
                            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                    <strong>${tite}</strong>  ${message}
                               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                            `
    toastBootstrap.show()
}

function signUp() {

    const searchForEmail = users.some((obj) => obj.email === suEmail.value);

    if (!searchForEmail) {
        var user = {
            name: suName.value,
            email: suEmail.value,
            password: suPassword.value
        };

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users))

        toggle.click();
        Alert('success', 'Sign Up Successfully,', 'Thank you for registration');

        clearSignUpData();
    }
    else {
        Alert('danger', 'Sign Up Error,', 'The email you enterd is already signed up,Kindly login or use another email');
    }

}


function logIn() {
    const searchedItem = users.find((obj) => obj.email === liEmail.value);

    if (searchedItem) {
        if (searchedItem.password == liPassword.value) {
            loginSystem.classList.add('d-none');
            data.classList.remove('d-none');
            infoDisplay(searchedItem.name);
            info.classList.replace('d-none', 'd-flex');
            getData();
            clearLogInData();
        }
        else {
            Alert('danger',"Invalid Password,",'Please enter correct password')
        }
    }
    else {
        Alert('danger',"Unregistered Email,",'Please sign up to go on');
    }
}

loginBtn.addEventListener('click', logIn)

signupBtn.addEventListener('click',signUp)

if(logoutBtn){
    logoutBtn.addEventListener('click',logOut)
}

function infoDisplay(userName) {
    info.innerHTML = `<h4 class="bg-darkblue gold shadow px-3 py-2 rounded-pill d-inline-block" >Welcome, ${userName}</h4>
                      <button id="logoutBtn" onclick="logOut()" class="bg-transparent border-0"><i class="fa-solid fa-right-from-bracket  gold "></i></button>`
}

function clearSignUpData() {
    suName.value = "";
    suEmail.value = "";
    suPassword.value = "";
}

function clearLogInData() {
    liEmail.value = "";
    liPassword.value = "";
}

var responsedData = [];

async function getData() {
    var data = await fetch('https://forkify-api.herokuapp.com/api/search?q=pizza');
    var dataAsArray = await data.json();
    responsedData = dataAsArray.recipes;
    displayData();
}

function displayData() {   
    var items = '';

    for (var i = 0; i < responsedData.length; i++) {
        items += `<div class="col-md-3">
				    <div class="gap-2 item d-flex flex-column justify-content-center align-items-center">
				        <img class="w-100 mb-1" src="${responsedData[i].image_url}" alt="${responsedData[i].title}">
					    <h6 class="gold mb-3">${responsedData[i].title.split(' ').slice(0,3).join(' ')}</h6>
				    </div>
			    </div>`
    }

    data.innerHTML = items;
   
}

function logOut(){
    data.innerHTML=`<div class="load mt-3 d-flex justify-content-center align-items-center">
				        <div class="spinner">
					        <div class="cube1"></div>
					        <div class="cube2"></div>
				        </div>
			        </div>`

    data.classList.add('d-none');
    loginSystem.classList.remove('d-none');
    info.classList.add('d-none');
}


