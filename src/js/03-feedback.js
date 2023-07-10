import throttle from "lodash.throttle";

const refs = {
    takeForm: document.querySelector('.feedback-form'),
}

const STORAGE_KEY = "feedback-form-state";
let formData = {};
//прослуховуємо подію введення даних на самій формі(спідьний батько для инпуту та тексареа)
//викликаємо функцію збереження данних у локалсторедж з відкладенням у 500мс - через бібілотеку троттл
refs.takeForm.addEventListener("input", throttle(onTextInput, 500));


//Функція збереження данних у локалсторедж внесенних у поля форми
function onTextInput(event) { 
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));// зберігаємо у локалсторедж введені значення у текстареа та інпут
}

refs.takeForm.addEventListener("submit", onFormSubmit); 

// Функція відправлення повідомлення
function onFormSubmit(event) {
    event.preventDefault(); // скинули подію по замовченню
    event.currentTarget.reset(); // обнулили заповненні поля
    localStorage.removeItem(STORAGE_KEY); //обнулили локалсторейдж
    console.log(formData)//виводимо обєкт отриманних значень у консоль
    formData = {}; //обнуляємо значення 
}

//Функція при перезавантаженні сторінки(форма не була відправлена)

function onReload() { 
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (!savedData) return;
        formData = JSON.parse(savedData);
        // console.log(formData);

        
        Object.entries(formData).forEach(([key, val]) => {//[key, val] - дуструктуризація масива
            //отримуємо доступ до значень інпутів форми та записуємо туди значення val
            // console.log(refs.takeForm.elements) //посилання на масив едементів форми
            //console.log(refs.takeForm.elements[key]); //доступ до елементів форми окремо
            
            refs.takeForm.elements[key].value = val; // присовєння значень инпутам. Значення взяті із збереженних значень у локалсторедж які
            //збережені у глобальну змінну formData (значення цієї змінної були деструктиризовані [key, val])
        });
    } catch (error) {
        console.log(error.message);
    }
}
window.addEventListener("load", onReload)

