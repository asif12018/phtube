const btnContainer = document.getElementById('btn-container');

//setting default category
let selectedCategory = '1000';
let sortByView = false;

//getting sort btn
const sortBtn = document.getElementById('sort-btn');

//fetch data by category to create category btn dynamically
const fetchCategories = async () => {
  const url = 'https://openapi.programming-hero.com/api/videos/categories';
  const res = await fetch(url);
  let data = await res.json();
  data = data.data;
  data.forEach(card => {
    const newBtn = document.createElement('button');
    newBtn.classList.add('btn', 'bg-[#25252533]','category-btn');
    newBtn.innerText = card.category;
    
    newBtn.addEventListener('click', () => {
      fetchDataByCategories( card.category_id,sortByView);
      
      const allBtns = document.querySelectorAll('.category-btn');
      //this function add the color or style to the selected button
      for(let btn of allBtns){
         btn.classList.remove('bg-red-600','text-white','font-bold');
      }
      newBtn.classList.add('bg-red-600','text-white','font-bold');
    });
    btnContainer.appendChild(newBtn);
  })
  
  
}

//calling fetchCategories function to added category btn by default dynamically
fetchCategories();

//load data by catagories function

const fetchDataByCategories = async (id,sortByView) => {
  // setting default selectedCategory data to id so that if category btn got clicked it can load data by category
  selectedCategory = id;
  //creating music card
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  loadingSnipped(true);
  const url = `https://openapi.programming-hero.com/api/videos/category/${selectedCategory}`;
  const res = await fetch(url);
  let data = await res.json();
  data = data.data;
  //function to sort the card by view
  if(sortByView){
    data.sort((a,b)=>{
       let totalViewFirst = a.others?.views;
       let totalViewsSecond = b.others?.views;
       let totalViewFirstNumber = parseFloat(totalViewFirst.replace('K','') || 0);
       let totalViewSecondNumber = parseFloat(totalViewsSecond.replace('K','')||0);
       return totalViewSecondNumber - totalViewFirstNumber;
    });
  }
  
  //this function trigger the error page if no data found from category btn and also trigger the loading snipped function
  if(data.length === 0){
    showError(true);
    loadingSnipped(false);
  }else{
    
    showError(false);
  }
  
  data.forEach(video => {
    //this function check if the auther is verified or not
    let verifiedBadged = '';
    if(video.authors[0].verified){
      verifiedBadged = '<img src="./Design-in-png/verified.svg">';
    }
    const div = document.createElement('div');
    div.className = "col-span-1 max-w-[312px]shadow-2xl";
    div.innerHTML = `
    <div class="w-[312px] h-[200px]">
    <img class="max-w-[312px] max-h-[200px]" src="${video.thumbnail}" alt="">
</div>
<!-- card use img and title -->
<div class="flex gap-2 py-3">
    <div class="">
    <img class="w-[40px] h-[40px] rounded-full" src="${video.authors[0].profile_picture}" alt="">
    </div>
    <div class=" mt-0 pt-0">
        <h3 class="text-[16px] text-black font-bold">${video.title}</h3>
        <div class="flex gap-3">
        <p class="text-[14px] text-[#171717B2]">${video.authors[0].profile_name}</p>
        ${verifiedBadged};
        </div>
        <p class="text-[14px] text-[#171717B2]">${video.others.views}</p>
    </div>
</div>
    `;

    
    cardContainer.appendChild(div);
    loadingSnipped(false);
    
  })
  
  
}

//loading snipped
const loadingSnipped = (value) =>{
  const loading = document.getElementById('loading-snipped');
  if(value===true){
    loading.classList.remove('hidden');
  }else{
    loading.classList.add('hidden');
  }
}

//error page
const showError=(value)=>{
  const error = document.getElementById('error');

    if(value===true){
      error.classList.remove('hidden');
    }else{
      error.classList.add('hidden');
    }
}
//short by view function
sortBtn.addEventListener('click',()=>{
  sortByView = true;
  fetchDataByCategories(selectedCategory,sortByView)
})
//calling the fetch by data function by default so that it can load default data id=1000
fetchDataByCategories(selectedCategory,sortByView);

