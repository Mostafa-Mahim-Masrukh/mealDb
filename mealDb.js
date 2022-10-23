
//fetch the seached text
const loadData = (search) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => loadMeals(data.meals));
}

//show single single meal into a card
const loadMeals = (meals) => {
    const noResultFoundText = document.getElementById('no-result-found');
    if (meals == null) {
        //no Result fount text showing


        clearLoadingData();
        noResultFoundText.classList.remove('d-none');
    }
    else {
        //if any result find -- show this
        clearLoadingData();
        noResultFoundText.classList.add('d-none');
        for (const meal of meals) {
            //each meal
            const mealCard = document.getElementById(' meal-card');
            const mealDiv = document.createElement('div');
            mealDiv.classList.add('card');
            mealDiv.innerHTML = `
            <div class="card">
            <img class="w-50 mx-auto border rounded p-2" src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${meal.strMeal}</h5>
                <p class="card-text text-center">${meal.strInstructions.slice(0, 100)}...</p>
            </div>
            <div class=" mx-auto m-2">
<button type="button" class="btn btn-primary" onclick="showMore(${meal.idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal"> More Info </button>

             </div>
        </div>
    `;
            mealCard.appendChild(mealDiv);
        }
    }


}


// individual data load or we can say more info of each Meal
const showMore = (data) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`)
        .then(res => res.json())
        .then(data => moreInfo(data.meals[0]));
}


const moreInfo = (info) => {
    console.log(info);
    const modalContainer = document.getElementById('modal-dialog');
    const div = document.createElement('div');
    div.classList.add('modal-content');
    div.innerHTML = `
    <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">${info.strMeal}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
    <h6>Category: ${info.strCategory}</h6>
<p>Descriptions ${info.strInstructions.slice(1, 100)}.... </p>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary">Save changes</button>
</div>
    `
    modalContainer.appendChild(div);
}







//get the input search value and pass to the load data function
document.getElementById('searchButton').addEventListener('click', function () {
    const inputTextValue = document.getElementById('InputField');
    const inputText = inputTextValue.value;
    loadData(inputText);
});

//clear loading data
const clearLoadingData = () => {
    const mealCard = document.getElementById(' meal-card');
    mealCard.innerText = '';
}



//search foods by Enter key on Key-Board
const input = document.getElementById("InputField");
input.addEventListener("keypress", function (event) {
    // console.log(event.key);
    if (event.key === "Enter") {
        const inputTextValue = document.getElementById('InputField');
        const inputText = inputTextValue.value;
        loadData(inputText);
    }
});
