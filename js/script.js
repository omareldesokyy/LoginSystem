
//Login & Signup Switching

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


//Inputs Selecting
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

//Alerts
const toastAlert = document.getElementById('liveToast');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastAlert)

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

var users = [];

if (localStorage.getItem('users') != null) {
    users = JSON.parse(localStorage.getItem('users'));
}

//Get Login Status while refresh
if (localStorage.getItem('status') != null){
    if(localStorage.getItem('status').includes('login')){
        localStorage.getItem('status').split(',')[1]
    
        loginSystem.classList.add('d-none');
        data.classList.remove('d-none');
        infoDisplay( localStorage.getItem('status').split(',')[1]);
        info.classList.replace('d-none', 'd-flex');
        getData();
        clearLogInData();
    }else{
    
    }
}

//Validation
var emailValidate=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
var passwordValidate = /^.{8,}$/;
var nameValidate = /^.{4,}$/;

suName.addEventListener('focusout',function(){
    if(!nameValidate.test(suName.value)){
        suName.classList.add('is-invalid')
        suName.classList.remove('is-valid')

        Alert('danger','Name is invalid','Should be 4 characters or more')
    }
    else{
        suName.classList.add('is-valid')
        suName.classList.remove('is-invalid')

    }
})

suEmail.addEventListener('focusout',function(){
    if(!emailValidate.test(suEmail.value)){
        suEmail.classList.add('is-invalid')
        suEmail.classList.remove('is-valid')

        Alert('danger','Email is invalid','Email does not meet internet email format standards or the email does not exist')
    }
    else{
        suEmail.classList.add('is-valid')
        suEmail.classList.remove('is-invalid')

    }
})

suPassword.addEventListener('focusout',function(){
    if(!passwordValidate.test(suPassword.value)){
        suPassword.classList.add('is-invalid')
        suPassword.classList.remove('is-valid')

        Alert('danger','Password is invalid','Should be 8 characters or more')
    }
    else{
        suPassword.classList.add('is-valid')
        suPassword.classList.remove('is-invalid')

    }
})


//SystemLogin Buttons
function signUp() {


    if(emailValidate.test(suEmail.value)&&passwordValidate.test(suPassword.value)&&nameValidate.test(suName.value)){
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
            Alert('success', 'Sign Up Successfully,', 'Thank you for registration.');
    
            clearSignUpData();

            suName.classList.remove('is-valid')
            suEmail.classList.remove('is-valid')
            suPassword.classList.remove('is-valid')

        }
        else {
            Alert('danger', 'Sign Up Error,', 'The email you enterd is already signed up,Kindly login or use another email.');
        }
    }
    else{
        Alert('danger', 'Sign Up Error,', 'Please follow input instructions to signup.');
    }

    

}

function logIn() {

    if(liEmail.value !='' && liPassword !=''){
        const searchedItem = users.find((obj) => obj.email === liEmail.value);

        if (searchedItem) {
            if (searchedItem.password == liPassword.value) {
                loginSystem.classList.add('d-none');
                data.classList.remove('d-none');
                infoDisplay(searchedItem.name);
                info.classList.replace('d-none', 'd-flex');
                getData();
                clearLogInData();
    
                localStorage.setItem('status',`login,${searchedItem.name}`);
            }
            else {
                Alert('danger',"Invalid Password,",'Please enter correct password!')
            }
        }
        else {
            Alert('danger',"Unregistered Email,",'Please sign up to go on!');
        }
    }
    else{
        Alert('danger',"Empty Inputs,",'Please enter your email and password!');
    }
   
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

loginBtn.addEventListener('click', logIn)

signupBtn.addEventListener('click',signUp)

//*****After Login****

//Welcome Information
function infoDisplay(userName) {
    info.innerHTML = `<h4 class="bg-darkblue gold shadow px-3 py-2 rounded-pill d-inline-block" >Welcome, ${userName}</h4>
                      <button id="logoutBtn" onclick="logOut()" class="bg-transparent border-0"><i class="fa-solid fa-right-from-bracket  gold "></i></button>`
}

//Get API Data
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

//Logout
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
    

    localStorage.setItem('status','logout');
}


