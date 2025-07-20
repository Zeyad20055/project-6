let inputprodect = document.getElementById("inputprodect");
let addBtn = document.getElementById("addBtn");
let count = document.getElementById("count");
let content = document.getElementById("content");
let edit = null;

let allproducts = [
    {id:1, name:"OPPO Reno 11 Pro", price:5000, image: "imges/c1.jpeg"},
    {id:2, name:"iPhone 15 Pro Ma", price:1100, image: "imges/c2.jpeg"},
    {id:3, name:"iPhone 15 Plus", price:1500, image: "imges/c3.jpeg"},
    {id:4, name:"OPPO Reno 10", price:3000, image: "imges/c4.jpeg"},
    {id:5, name:"OPPO A98 5G", price:6000, image: "imges/c7.jpeg"},
];

function drow(){
    content.innerHTML = "";
    allproducts.forEach((item) => {
        content.innerHTML += `
        <div class="card m-2 shadow-sm" style="width: 18rem; display: inline-block; ">
            <img src="${item.image}" class="card-img-top" style="height:200px; object-fit:cover;" alt="${item.name}">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Price: ${item.price} $</p>
                <button class="btn btn-primary btn-sm mb-1" onclick="editBtn(${item.id})">Edit Name</button>
                <button class="btn btn-warning btn-sm mb-1" onclick="editPrice(${item.id})">Edit Price</button>
                <button class="btn btn-danger btn-sm" onclick="deletBtn(${item.id})">Delete</button>
            </div>
        </div>
        `;
    });
    count.innerHTML = ` NUMBER OF PRODUCTS ${allproducts.length}  `;
}
drow();

inputprodect.addEventListener('input', () => {
    if(inputprodect.value.trim() !== ""){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.setAttribute("disabled", true);
    }
});

addBtn.addEventListener('click', () => {
    let db = allproducts.some(d => d.name === inputprodect.value.trim());
    if(db){
      Swal.fire({
  title: "The Internet?",
  text: "product name already exists?",
  icon: "question"
});
        return;
    }
    if(edit !== null){
        let findprouduct = allproducts.find(f => f.id === edit);
        if(findprouduct){
            findprouduct.name = inputprodect.value.trim();
            drow();
        }
        edit = null;
        addBtn.innerText = "إضافة المنتج";
    }else{
        let LasID = allproducts.length ? allproducts[allproducts.length-1].id : 0;
        let price = prompt("ادخل سعر المنتج");
        let image = prompt("ادخل رابط صورة المنتج");

        if(price !== null && price.trim() !== "" && !isNaN(price)){
            allproducts.push({
                id: ++LasID,
                name: inputprodect.value.trim(),
                price: parseFloat(price),
                image: image || "imges/default.jpg"  // صورة افتراضية لو المستخدم مدخلش
            });
            drow();
        }
    }
    inputprodect.value = "";
    addBtn.setAttribute("disabled", true);
});

function editBtn(id){
    let findprouduct = allproducts.find(f => f.id === id);
    if(findprouduct){
        inputprodect.value = findprouduct.name;
        addBtn.removeAttribute("disabled");
        addBtn.innerText = "Save Edit";
        edit = id;
    }
}

function editPrice(id){
    let findprouduct = allproducts.find(f => f.id === id);
    if(findprouduct){
        let newPrice = prompt("ادخل السعر الجديد", findprouduct.price);
        if(newPrice !== null && newPrice.trim() !== "" && !isNaN(newPrice)){
            findprouduct.price = parseFloat(newPrice);
            drow();
        }
    }
}

function deletBtn(id){
    let index = allproducts.findIndex(item => item.id === id);
    if(index !== -1){
        allproducts.splice(index, 1);
        drow();
    }
}



