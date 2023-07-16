let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mod = 'Create';
let tmp;

//get total
function getTotal(){
if (price.value != "") {
    let resualt = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML =resualt + ' €';
    total.style.background = 'rgb(4, 202, 4)';
}else{
    total.innerHTML = ''
    total.style.background = 'rgb(214, 6, 93)';
}
}
//craete product
let dataPro;
if (localStorage.product != null) {
     dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = []
}

submit.onclick = function(){
    let newPro ={
        title : title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category : category.value.toLowerCase(),
    }
    //count
    if (title.value != '' && price.value != '' && category.value != ''&& count.value < 100) {
        if (mod === 'Create') {
            if (newPro.count > 1 ) {
                for(let i = 0 ; i< newPro.count; i++ ){
                 dataPro.push(newPro);
                }
            }else{
             dataPro.push(newPro);
            }
        }else{
            dataPro[tmp] = newPro;
            mod ='Create';
            count.style.display = 'block';
            submit.innerHTML = 'Create';
        }
        clearData();
    }
   
 
    
   //save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro))
    
  
    showData();
    
    
}





//clear inputs 
function clearData(){
    title.value ='';
    price.value ='';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read
function showData(){
    getTotal()
    let table = '';
    for(let i = 0 ; i < dataPro.length; i++){
        table +=`
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>

    </tr>`;
        

    }
document.getElementById('tbody').innerHTML = table;
//clean date
let btnDelete = document.getElementById('deleteAll');
if (dataPro.length > 0) {
    btnDelete.innerHTML=`<button onclick="deleteAll()">delete All (${dataPro.length})</button>`
}else{
    btnDelete.innerHTML=``
}

}
showData()

//delete
function deleteData(i){
 dataPro.splice(i,1)
 localStorage.product = JSON.stringify(dataPro)
 showData()
}
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData()
}


//update
function updateData(i) {
 title.value = dataPro[i].title;
 price.value = dataPro[i].price;
 taxes.value = dataPro[i].taxes;
 ads.value = dataPro[i].ads;
 discount.value = dataPro[i].discount;
 category.value = dataPro[i].category;
 getTotal();
 count.style.display ='none';
 submit.innerHTML = 'Update'
 mod = 'Update';
 tmp = i;
 scroll({
     top:0,
     behavior: "smooth",

 });


}

//search
let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
  if (id == 'searchTitle') {
      searchMood = 'title';
     
  }else{
    searchMood = 'category';
    
  }
  search.focus();
  
  search.placeholder = 'Search By ' + searchMood.charAt(0).toUpperCase() + searchMood.slice(1);
    console.log(searchMood)
    search.value = '';
    showData();

}

function searchData(value) {
    let table = '';
    for(let i = 0 ; i < dataPro.length; i++ ){
if (searchMood == 'title') {
    
        
        if (dataPro[i].title.includes(value.toLowerCase())) {
            table +=`
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    
        </tr>`
        }
    


}else{
   
        
        if (dataPro[i].category.includes(value.toLowerCase())) {
            table +=`
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    
        </tr>`
        }
    
}
    }
document.getElementById('tbody').innerHTML = table;
}
 let bo1 = document.getElementById('bo');
let input =  document.getElementsByTagName('input');
let boi = document.getElementById('boi');
let button = document.getElementsByTagName('button');
function mode(){
     document.body.style.backgroundColor = '#222';
     document.body.style.color = '#fff';
        for(let i=0; i <input.length; i++ ){
       input[i].classList.add('fo1')
         }
    for(let i=0; i < button.length; i++ ){
       button[i].style.color = 'white';
     }
    document.getElementById('boi').src = 'moon.svg';
    bo1.setAttribute( "onClick", "re()" );
    boi.style.transform = 'translate(40px) rotate(360deg)';
    bo1.style.background = '#111';
    
}
function re(){
    document.body.style.backgroundColor = 'rgb(223, 217, 217)';
    document.body.style.color = 'black';
    for(let i=0; i <input.length; i++ ){
        input[i].classList.remove('fo1');
    }
    for(let i=0; i < button.length; i++ ){
      button[i].style.color = 'black';
     }
    document.getElementById('boi').src = 'sunn.svg';
    bo1.setAttribute( "onClick", "mode()" );
    bo1.style.background = 'rgb(187, 183, 183)';    
    boi.style.transform = 'translate(0px) rotate(0deg)';
    setTimeout(function(){
      window.location.reload();
    },800)
}

