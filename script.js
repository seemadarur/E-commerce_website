const Product=[
    {id: 1,name:"Watch",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/s/i/u/-original-imah76jt64ffmwg4.jpeg?q=70",price:999},
    {id: 2,name:"TV",Image:"https://rukminim2.flixcart.com/image/312/312/ko8xtow0/monitor/t/a/y/d24-20-66aekac1in-lenovo-original-imag2qwzazcdmqtb.jpeg?q=70",price:25999},
    {id: 3,name:"BUDS",Image:"https://m.media-amazon.com/images/I/61+AbtSQH9L._AC_SY200_.jpg",price:1500},
    {id: 4,name:"Cycle",Image:"https://m.media-amazon.com/images/I/81sqQZ-AOwL._AC_UY218_.jpg",price:15999},
    {id: 5,name:"Tent",Image:"https://m.media-amazon.com/images/I/6148MFX3APL._AC_UL320_.jpg",price:5000},
    {id: 6,name:"Denver",Image:"https://m.media-amazon.com/images/I/61wC3YkNsoL._AC_UL320_.jpg",price:400},
    {id: 7,name:"Dryfruits",Image:"https://m.media-amazon.com/images/I/8116WQQe6bL._AC_UL320_.jpg",price:599},
    {id: 8,name:"Bed",Image:"https://m.media-amazon.com/images/I/717HJgZYd7L._AC_UL320_.jpg",price:8999},
    {id: 9,name:"Chair",Image:"https://m.media-amazon.com/images/I/61l34UYThXL._AC_UL320_.jpg",price:4999},
    {id: 10,name:"Traking shose",Image:"https://m.media-amazon.com/images/I/81R6YbNKOzL._AC_UL320_.jpg",price:4000},
    {id: 11,name:"Camera",Image:"https://m.media-amazon.com/images/I/710Xn-3EqJL._AC_UY218_.jpg",price:3562},
    {id: 12,name:"Helmet",Image:"https://m.media-amazon.com/images/I/61rzdy4wNUL._AC_UL320_.jpg",price:875},
    {id: 13,name:"WashingMachine",Image:"https://m.media-amazon.com/images/I/71mlv8EHZYL._AC_UY218_.jpg",price:20000},
    {id: 14,name:"Refrigator",Image:"https://m.media-amazon.com/images/I/61QKzOZbl8L._AC_UY218_.jpg",price:16235},
    {id: 15,name:"SAMSUNG S25",Image:"https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/5/e/h/-original-imah8pdna7nzdqxg.jpeg?q=70",price:114520},
    {id: 16,name:"APPLE 16 ",Image:"https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/r/k/a/-original-imah4jyfyrpxfhtk.jpeg?q=70",price:67888},
]

//Render Products

function renderProducts(Products,productList){
    const container=document.getElementById(productList);
    container.innerHTML="";
    Products.forEach(product => {
        const productDiv=document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML= `
        <img src="${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <button onclick = "addToCart(${product.id})">Add to Cart</button>
        `
        container.appendChild(productDiv);
    })
}

//Search functionality
function searchProducts(query){
    const filterProducts = Product.filter(product=>
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    renderProducts(filterProducts,"productList");
}

//Add EventListner to button
document.getElementById("searchButton")?.addEventListener("click",() => {
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
})

//Sorting
function sortProducts(criteria){
    if(criteria === "price"){
        return Product.sort((a,b) => a.price-b.price);
    }
    return Product;
}

//Adding Events listeners
document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList");
})

//Add to cart
 
function addToCart(productId){
    const product=Product.find(p => p.id === productId);
    let cart=JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${product.name}is added to cart`)
    renderCart();
}
//Render item in cart

 function renderCart(){
    const cart=JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length == 0){
        container.innerHTML="<h1>Your cart is Empty</h1>"
    }
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML=`
        <img src="${item.Image}"/>
        <h3>${item.name}</h3>
        <h2>${item.price}</h2>
        <button onclicl="removeFromCart(${item.id})">Remove</button>
        `
        container.appendChild(cartDiv);
    })
 }

 //Remove from cart
 function RemoveFormCart(productId){
    let cart=JSON.parse(localStorage.getItem("cart"))||[];
    cart= cart.filter(item => item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("product is removed successfully");
    renderCart();
 }

 //Calander subtotal
 function renderSubtotal(cart){
    const subtotal= cart.reduce((total,time) => total + item.price,0);
    const subtotalContainer=document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML =`Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML =`No items in the cart`
    }
 }
 

if(document.getElementById("productList"))renderProducts(Product,"productList");
if(document.getElementById("cartItems"))renderCart();