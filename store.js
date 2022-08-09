if (document.readyState == 'loading'){
    documnet.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready(){
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        console.log(removeCartItemButtons)
        for (var i=0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i=0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-btn')
    for (var i=0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 0
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imagesrc = shopItem.getElementsByClassName('shop-item-img')[0].src
    console.log(title, price, imagesrc)
    addItemToCart(title, price, imagesrc)
    updateCartTotal()
}

function addItemToCart(title, price, imagesrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i=0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-coloum">
                <img class="cart-item-img" src="${imagesrc}" height="100px" width="100px">
                <span class="cart-item-title">${title}</span>
           </div>
            
            <span class="cart-price cart-coloum">${price}</span>
            
            <div class="cart-quantity cart-coloum">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger cart-quantity-btn" role="button">REMOVE</button>
            </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i=0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
        [0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
        document.getElementsByClassName('cart-total-price')[0].innerText = total + 'Tk'
        total = Math.round(total * 100) / 100
}  