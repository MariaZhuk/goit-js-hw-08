import throttle from "lodash.throttle";

const refs = {
    takeForm: document.querySelector('.feedback-form'),
    messageText: document.querySelector(".feedback-form textarea"),
    emailText: document.querySelector(".feedback-form input"),
}

// populateTextarea(); //виклик функції для отримання данних при завантаженні сторінки - якщо в ЛС були даніБ вони мають відобразитися у текстареа
const STORAGE_KEY = "feedback-form-state";
const formData = {};
populateTextarea()

refs.takeForm.addEventListener("input", event => { 
    formData[event.target.name] = event.target.value;

} )

refs.takeForm.addEventListener("submit", onFormSubmit); 
refs.messageText.addEventListener('input', throttle(onTextInput, 500));

// Функція отримання значення повідомлення
 function onTextInput(event) { 
    localStorage.setItem("STORAGE_KEY", JSON.stringify(formData))
}

// Функція відправлення повідомлення
function onFormSubmit(event) {
    event.preventDefault(); // скинули подію по замовченню
    event.currentTarget.reset(); // обнулили заповненні поля
    localStorage.removeItem("STORAGE_KEY"); //обнулили локалсторейдж
}

//Функція заповнення полів форми при невідправленній формі(щоб зберигалась введена але не відправлена інформація)
function populateTextarea(event) { 
    const savedData = localStorage.getItem("STORAGE_KEY");
    const parseData = JSON.parse(savedData)

    if (parseData) {    
        refs.emailText.value = parseData.email;
        refs.messageText.value = parseData.message 
    }
}