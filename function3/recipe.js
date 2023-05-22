const serchBox = document.querySelector(".serchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");


//function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2> Fetching Recipes...</h2>";
    try {


        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        recipeContainer.innerHTML = " ";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
       <img src="${meal.strMealThumb}">
       <h3> ${meal.strMeal}</h3>
       <p> <span> ${meal.strArea}</span> Dish</p>
       <p>Belong To <span>${meal.strCategory}</span> Category</p>

       `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);
            recipeContainer.appendChild(recipeDiv);

            // adding Event listenrt to recipe button

            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });

        });
    } catch (error) {
        recipeContainer.innerHTML=`<h2>Error in Fetching Recipes...</h2>`

    }

    // function to fetch ingridents and measurement
    const fetchIngredients = (meal) => {
        // console.log(meal);
        let ingredientsList = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                const measure = meal[`strMeasure${i}`];
                ingredientsList += `<li>${measure} ${ingredient}</li>`
            }
            else {
                break;
            }

        }
        return ingredientsList;


    }
    const openRecipePopup = (meal) => {
        recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3 >Ingredents:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="instuctions">
            <h3>Instruction:</h3>
            <p >${meal.strInstructions}</p>
        </div>
        `



        recipeDetailsContent.parentElement.style.display = "block";
    }
    recipeCloseBtn.addEventListener('click', () => {
        recipeDetailsContent.parentElement.style.display = "none";
    });

}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();// save for auto submit
    const serchInput = serchBox.value.trim();
    if (!serchInput) {
        recipeContainer.innerHTML = `<h2>Type Meal in Serch Box</h2>`
        return;
    }
    fetchRecipes(serchInput);
    console.log("button clicked");
});