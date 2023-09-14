function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// submit modal event
async function validate(event){
  await stockFormDatasEnter();
  if(error){
    event.preventDefault();
  }
}

// check form
const formDataEnter = {};
var error = false;

function stockFormDatasEnter(){
  error = false;
  formData.forEach(formDataElement => {
    cleanError(formDataElement)
    var input = formDataElement.querySelectorAll('input');
    if(input.length > 2){
      stockLocation(input);
    } else if(input.length == 2){
      stockCheckboxDatas(input);
    } else {
      oneInputFormData(input);
    }
  });
  
}

// clean text error
function cleanError(divFormData) {
  divFormData.setAttribute('data-error-visible', 'false');
  textError = divFormData.querySelector(".text-error");
  if(textError) {
    divFormData.removeChild(textError);
  }
}

// search input type and stock data
function oneInputFormData(input){
  switch(input[0].id){
    case 'first': 
    formDataEnter[input[0].id] = input[0].value;
    if (input[0].value.length < 2){
      error = true;
      let divParent = input[0].parentElement;
      let errorText = document.createElement("p");
      errorText.innerHTML = "Veuillez entrer un prénom de 2 caractères ou plus";
      errorText.className = "text-error";
      divParent.appendChild(errorText);
      divParent.setAttribute('data-error-visible', 'true');
    }
    break;
    case 'last': 
    formDataEnter[input[0].id] = input[0].value;
    if (input[0].value.length < 2){
      error = true;
      let divParent = input[0].parentElement;
      let errorText = document.createElement("p");
      errorText.innerHTML = "Veuillez entrer un nom de 2 caractères ou plus";
      errorText.className = "text-error";
      divParent.appendChild(errorText);
      divParent.setAttribute('data-error-visible', 'true');
    }
    break;
    case 'email': 
    formDataEnter[input[0].id] = input[0].value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input[0].value) == false){
      error = true;
      let divParent = input[0].parentElement;
      let errorText = document.createElement("p");
      errorText.innerHTML = "Veuillez entrer une adresse mail valide";
      errorText.className = "text-error";
      divParent.appendChild(errorText);
      divParent.setAttribute('data-error-visible', 'true');
    }
    break;
    case 'birthdate':
    formDataEnter[input[0].id] = input[0].value;
    if(input[0].value == ''){
      error = true;
      let divParent = input[0].parentElement;
      let errorText = document.createElement("p");
      errorText.innerHTML = "Veuillez entrer votre date de naissance";
      errorText.className = "text-error";
      divParent.appendChild(errorText);
      divParent.setAttribute('data-error-visible', 'true');
    }
    break;
    case 'quantity':
      formDataEnter[input[0].id] = input[0].value;
      if(input[0].value == ''){
        error = true;
        let divParent = input[0].parentElement;
        let errorText = document.createElement("p");
        errorText.innerHTML = "Veuillez donner un nombre de tournois";
        errorText.className = "text-error";
        divParent.appendChild(errorText);
        divParent.setAttribute('data-error-visible', 'true');
      }
      break;
  }
}

// test and stock location
function stockLocation(radio_inputs){
  formDataEnter['location'] = '';
  for(let i=0; i<radio_inputs.length;i++){
    if(radio_inputs[i].checked){
      formDataEnter['location'] = radio_inputs[i].value;
      break;
    }
  }
  if(formDataEnter['location'] == ''){
    error = true;
    let divParent = radio_inputs[0].parentElement;
    let errorText = document.createElement("p");
    errorText.innerHTML = "Veuillez choisir une option";
    errorText.className = "text-error";
    divParent.appendChild(errorText);
    divParent.setAttribute('data-error-visible', 'true');
  }
}

// test and stock checkbox datas
function stockCheckboxDatas(checkbox_inputs){
  formDataEnter['checkbox1'] = checkbox_inputs[0].checked;
  if(checkbox_inputs[0].checked == false){
    error=true;
    let divParent = checkbox_inputs[0].parentElement;
    let errorText = document.createElement("p");
    errorText.innerHTML = "Vous devez valider les conditions d'utilisation";
    errorText.className = "text-error";
    divParent.insertBefore(errorText, checkbox_inputs[1]);
    divParent.setAttribute('data-error-visible', 'true');
  }
  formDataEnter['2'] = checkbox_inputs[1].checked;
}