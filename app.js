const btnContainer = document.getElementById('btn-container');


const fetchCategories = async () => {
  const url = 'https://openapi.programming-hero.com/api/videos/categories';
  const res = await fetch(url);
  let data = await res.json();
  data = data.data;
  data.forEach(card => {
    const newBtn = document.createElement('button');
    newBtn.classList.add('btn', 'bg-[#25252533]');
    newBtn.innerText = card.category;
    
    newBtn.addEventListener('click', () => fetchDataByCategories(card.category, card.category_id,newBtn));
    btnContainer.appendChild(newBtn);
  })

}

fetchCategories()

//load data by catagories

const fetchDataByCategories = async (category, id='1000') => {
  
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  loadingSnipped(true);
  const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
  const res = await fetch(url);
  let data = await res.json();
  data = data.data;
  
  if(data.length === 0){
    showError(true);
    loadingSnipped(false);
  }else{
    
    showError(false);
  }
  
  data.forEach(video => {
    
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

fetchDataByCategories();
