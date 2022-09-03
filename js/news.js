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
        console.log(element)
        const{image_url,title,details,total_view,author,_id}=element;
        const newDiv=document.createElement('div')
        // card.innerHTML=''
       newDiv.classList.add('col');
       newDiv.innerHTML=`
       <div class="card">
       <img src="${image_url}" class="card-img-top" alt="...">
       <div class="card-body">
       </div>
         <h5 class="card-title">${title}</h5>
         <p class="card-text">${details.length>50? details.slice(0,150)+'...':'There is No Details Here'}</p>

         <div class="d-flex justify-content-around align-items-center mb-2">
            <div class="d-flex align-items-center ">
            <img src="${author.img}" class="img-fluid  rounded-circle img space " alt="...">
            <p class="m-0">${author.name?author.name:"Data Not Exist"}</p>
            </div>
            <div class="d-flex align-items-center">
            <i class="fa-solid fa-eye space"></i>
            <p class="m-0">${total_view?total_view:"Data Not Exist"}</p>
            </div>
            <div>
            <button  data-bs-toggle="modal" data-bs-target="#key${_id}" class="btn"><i class="fa-solid fa-arrow-right text-dark"></i></button>
             <div class="modal fade" id="key${_id}" tabindex="-1" aria-labelledby="newsDetails" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="newsDetails">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body"><img src="${image_url}" class="card-img-top" alt="..."></div>
              <div class="modal-footer">
              <p class="card-text">${details}</p>
                
              </div>
            </div>
          </div>
        </div>
            </div>
         <div>
       </div>
       `;
       card.appendChild(newDiv)


    });
}


checkById('01')


