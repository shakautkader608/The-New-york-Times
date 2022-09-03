const loadAllData=async()=>{
    const res=await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data= await res.json();
    return data;
}
const SetAllMenu=async()=>{
    const data= await loadAllData();
    // console.log(data);
    const menu=document.getElementById('news-menu');
    const totalnews = data.data.news_category
    totalnews.forEach(news => {
        console.log(news.category_name)
        console.log(
            news.category_id
        )
        const li=document.createElement('li');
        li.innerHTML=`
        <li onclick=checkById('${news.category_id}') class="nav-item">
                  <a class="nav-link" href="#">${news.category_name}</a>
        </li>
        `;
        menu.appendChild(li)
    });
}

SetAllMenu()

const checkById=async(category_id)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data= await res.json();
    console.log(data.data);
    const allNews = data.data
    const card=document.getElementById('card-element');
    card.textContent=''
    allNews.forEach(element => {
        console.log(element,"gtjuyt")
        const newDiv=document.createElement('div')
        // card.innerHTML=''
       newDiv.classList.add('col');
       newDiv.innerHTML=`
       <div class="card">
       <img src="${element.image_url}" class="card-img-top" alt="...">
       <div class="card-body">
       </div>
         <h5 class="card-title">${element.title}</h5>
         <p class="card-text">${element.details}</p>
       </div>
       </div>
       `;
       card.appendChild(newDiv)


    });
}

checkById()

