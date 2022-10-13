'use strict';

function AbstractProduct(id, name, description, price, quantity, date){
    return{
        id : String(id),
        name : String(name),
        description : String(description),
        price : parseFloat(price),
        quantity : Number(quantity),
        date : new Date(date),
        reviews : [],
        images: [],

        getProductTileHtml : function(){
        
            var $li = document.createElement('li');
            $li.className = 'product';
            var $div = document.createElement('div');
            $div.className = 'product-overlay';
            var $a = document.createElement('a');
            $a.href = "#";
            var $img = document.createElement('img');
            $img.src = "";
            $img.alt = this.name;
            $img.width = "225";
            $img.height = "225";
            $a.appendChild($img);
            var $div2 = document.createElement('div');
            $div2.className = "img-overlay";
            var $a2 = document.createElement('a');
            $a2.href = "#";
            $a2.title = this.name;
            var $div3 = document.createElement('div');
            $div3.className = "img-overlay-area";
            var $h2 = document.createElement('h2');
            $h2.className = "heading";
            $h2.innerHTML = this.name;
            $div3.appendChild($h2);
            var $div4 = document.createElement('div');
            $div4.className = "heading-holder";
            var $strong = document.createElement('strong');
            $strong.className = "price";
            var $div5 = document.createElement('div');
            $div5.className = "price-box";
            var $span = document.createElement('span');
            $span.className = "regular-price";
            var $span2 = document.createElement('span');
            $span2.className = "price";
            $span2.innerHTML = "$" + this.price;
            $span.appendChild($span2);
            $div5.appendChild($span);
            $strong.appendChild($div5);
            $div4.appendChild($strong);
            var $div6 = document.createElement('div');
            $div6.className = "overlay-txt";
            $div3.appendChild($div6);
            $div3.appendChild($div4);
            $a2.appendChild($div3);
            $div2.appendChild($a2);
            var $div7 = document.createElement('div');
            $div7.className = "holder";
            var $a3 = document.createElement('a');
            $a3.className = "quick-view";
            $a3.rel = "nofollow";
            $a3.href = "#";
            $a3.innerHTML = "Quickview";
            $div7.appendChild($a3);
            $div2.appendChild($div7);
            $div.appendChild($div2);

            var $h3 = document.createElement('h3');
            $h3.className = "product-name";
            var $a4 = document.createElement('a');
            $a4.href = "#";
            $a4.innerHTML = this.name;
            $h3.appendChild($a4);

            var $div8 = document.createElement('div');
            $div8.className = "price-box";
            var $span = document.createElement('span');
            $span.className = "regular-price";
            var $span2 = document.createElement('span');
            $span2.className = "price";
            $span2.innerHTML = "$" + this.price;
            $span.appendChild($span2);
            $div8.appendChild($span);

            $li.appendChild($div);
            $li.appendChild($h3);
            $li.appendChild($div8);
            
            var $ul = document.querySelector('.product-grid');
            $ul.appendChild($li);
        },
        /**
         * gets product info or sets product info
         * @param {String} mode get || set 
         * @param {String} field name of the field to work with
         * @param {String} ifSet value of the fiaeld to set (ignored if mode == get)
         * @example getSet(set, name, newName)
         * @example getSet(get, price)
         * @returns this.price.value
         */
        getSet : function(mode, field, ifSet){
            if(mode == "get"){
                if(field in this){
                    return this[field];
                }
                else{
                    return "Wrong field name";
                }
            }
            if(mode == "set"){
                if(field in this){
                    if(ifSet){
                        this[field] = ifSet;
                    }
                    else{
                        return "";
                    }
                }
                else{
                    return "Wrong field name";
                }
            }
        },

        getFullInformation : function(){
            var totalString = "";
            for(var key in this){
                var value = this[key].toString();
                if(!value.includes('function')){
                    totalString += key + " : " + value + "\n";
                }
            }
            return totalString;
        },
        getPriceForQuantity :  function(n){
            var totalPrice = 0;
            var priceString = "";
            for(var i=0; i<n; i++){
                totalPrice += this.price;
            }
            priceString = "$" + totalPrice;
            return priceString;
        },
        getId : function(){
            return this.id;
        },
        getName : function(){
            return this.name;
        },
        getDescription : function(){
            return this.description;
        },
        getPrice : function(){
            return this.price;
        },
        getDate : function(){
            return this.date;
        },
        getReviews : function(){
            return this.reviews;
        },
        getImages : function(){
            return this.images;
        },
        getImage : function(index){
            return this.images[index];
        },
        setName : function(nameNew){
            this.name = String(nameNew);
        },
        setPrice : function(priceNew){
                this.price = parseFloat(priceNew);
        },
        setDate : function(dateNew){
                this.date = new Date(dateNew);
        },
        addReview : function(id, author, date, comment, rating){
            var review = new Review(id, author, date, comment, rating);
            if(review){
                this.reviews.push(review);
            }
        },
        deleteReview : function(index){
            this.reviews.splice(index);
        },
        getAverageRating : function(){
            var avgRating = 0;
            this.reviews.forEach(function(r) {
                    avgRating += (r.rating.service + r.rating.price + r.rating.value + r.rating.quality)/4;
            });
            return avgRating/this.reviews.length;
        }
    }
}

function Clothes(id, name, description, price, material, color, brand, activeSize, quantity, date){
    var prod = new AbstractProduct(id, name, description, price, quantity, date);
    var item = new Object({
        __proto__ : prod,
        material : String(material),
        color : String(color),
        brand : String(brand),
        sizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        activeSize : String(activeSize),
        
        getMaterial : function(){
            return this.material;
        },
        getColor : function(){
            return this.color;
        },
        getBrand : function(){
            return this.brand;
        },
        getSizes : function(){
            return this.sizes;
        },
        getActiveSize : function(){
            return this.activeSize;
        },
        setBrand : function(brandNew){
            this.brand = String(brandNew);
        },
        setMaterial : function(materialNew){
            this.material = String(materialNew);
        },
        setColor : function(colorNew){
            this.color = String(colorNew);
        },
        addSize : function(sizeNew){
            this.sizes.push(sizeNew);
        },
        deleteSize : function(index){
                this.sizes.splice(index);
        },
        setActiveSize : function(activeSize){
                if(this.sizes.indexOf(activeSize)){
                    this.activeSize = activeSize;
                }
                else{
                    return null;
                }
            }
    })
    return item;
}

function Electronics(id, name, description, price, quantity, date, warranty, power){
    var prod = new AbstractProduct(id, name, description, price, quantity, date);
    if(warranty < 0){
        warranty = 0;
    }
    if(warranty > 10){
        warranty = 10;
    }
    var item = new Object({
        __proto__ : prod,
        warranty : Number(warranty),
        power : Number(power),

        getWarranty : function(){
            return this.warranty;
        },
        getPower : function(){
            return this.power;
        },
        setWarranty : function(warrantyNew){
            if(warrantyNew >= 0 || warrantyNew <= 10){
                this.warranty = Number(warrantyNew);
            }
            else{
                console.log('Wrong warranty input');
            }
        },
        setPower : function(powerNew){
            this.power = Number(powerNew);
        }
    })
    return item;
}

function Review(id, author, date, comment, rating){
        this.id = String(id),
        this.author = String(author)
        this.date = Date(date),
        this.comment = String(comment),
        this.rating = {
            service : rating[0],
            price : rating[1],
            value : rating[2],
            quality : rating[3]
        }
}

function SearchProducts(search, products){
    var result = [];
    console.log("Search by: " + search);
    if(search.endsWith('*')){
        var newSearch = search.replace('*', '');
        for(var i = 0; i<products.length; i++){
            if(products[i].name.includes(newSearch) || products[i].description.includes(newSearch)){
                result.push(products[i]);
            }
        }
    }
    else{
        for(var i = 0; i<products.length; i++){
            if(products[i].name === search || products[i].description.includes(search)){
                result.push(products[i]);
            }
        }
    }
    return result;
}

function SortProducts(products, rule){
    if(rule.order == "asc")
    {
        if(rule.field == "price"){
            console.log('Sort by: ' + rule.field);
            return products.sort(function (a, b){
                return a.price - b.price;
            });
        }
        if(rule.field == "id"){
            console.log('Sort by: ' + rule.field);
    
            return products.sort(function (a, b){
                return a.id - b.id;
            });
        }
        if(rule.field == "name"){
            console.log('Sort by: ' + rule.field);
    
            return products.sort(function (a, b){
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();
    
                if (nameA < nameB) {
                    return -1;
                }
                  if (nameA > nameB) {
                    return 1;
                }
                
                return 0;
            });
        }
    }
    if(rule.order == "desc")
    {
        if(rule.field == "price"){
            console.log('Sort by: ' + rule.field);
            return products.sort(function (a, b){
                return b.price - a.price;
            });
        }
        if(rule.field == "id"){
            console.log('Sort by: ' + rule.field);
    
            return products.sort(function (a, b){
                return b.id - a.id;
            });
        }
        if(rule.field == "name"){
            console.log('Sort by: ' + rule.field);
    
            return products.sort(function (a, b){
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();
    
                if (nameA < nameB) {
                    return 1;
                }
                  if (nameA > nameB) {
                    return -1;
                }
                
                return 0;
            });
        }
    }
    
}

var sortRule = {
    order: "asc", //asc or desc for ascending or descending
    field : "price" //id, name, price for selected field
}

function Validator(){
    return {
        ValidateEmail : function(email){
            var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*){2,20}|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]){1,15}|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            var result = regex.test(String(email));
            return result;
        },
        ValidatePhone : function(phone){
            var regex = new RegExp(/^\+?([0-9]{2})?[- ]*\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/);
            var result = regex.test(String(phone));
            return result;
        },
        ValidatePassword : function(password){
            var regex = new RegExp(/^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_]{6,16}$/);
            var result = regex.test(String(password));
            return result;
        }
    }
}

var pants = new Clothes(0, "pants", "some description", 100.50, "cotton", "black", "phillip plein", "XL", 5, '10-10-2020');
var shirt = new Clothes(1, "shirt", "another description", 60.50, "cotton", "red", "lacoste", "XL", 5, '10-10-2020');
var tv = new Electronics(2, "TV", "TVs description", 1299.99, 10, '10-10-2020', 3, 0.5);
var prodArr = [tv, shirt, pants];

console.log(SearchProducts('TV', prodArr));
console.log(SortProducts(prodArr, sortRule));
console.log(pants.getFullInformation());

var validator = new Validator();
var email = "fi@secondart.end";
var phone = "+380995678901";
var password = "C00l_Pass";
console.log(validator.ValidateEmail(email));
console.log(validator.ValidatePhone(phone));
console.log(validator.ValidatePassword(password));

pants.getProductTileHtml();