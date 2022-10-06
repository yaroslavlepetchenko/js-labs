'use strict'

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

        getSet : function(mode, field, ifSet){
            //mode : get or set
            //field : field to work with
            //ifSet : value of field to set (ignored if mode == get)
            if(mode == "get"){
                if(field in this){
                    return this[field]
                }
                else{
                    return "Wrong field name"
                }
            }
            if(mode == "set"){
                if(field in this){
                    if(ifSet){
                        this[field] = ifSet
                    }
                    else{
                        return
                    }
                }
                else{
                    return "Wrong field name"
                }
            }
        },

        getFullInformation : function(){
            var totalString = ""
            for(var key in this){
                var value = this[key].toString()
                if(!value.includes('function')){
                    totalString += key + " : " + value + "\n"
                }
            }
            return totalString
        },
        getPriceForQuantity :  function(n){
            var totalPrice = 0
            var priceString = ""
            for(var i=0; i<n; i++){
                totalPrice += this.price
            }
            priceString = "$" + totalPrice
            return priceString
        },
        getId : function(){
            return this.id
        },
        getName : function(){
            return this.name
        },
        getDescription : function(){
            return this.description
        },
        getPrice : function(){
            return this.price
        },
        getDate : function(){
            return this.date
        },
        getReviews : function(){
            return this.reviews
        },
        getImages : function(){
            return this.images
        },
        getImage : function(index){
            return this.images[index]
        },
        setName : function(nameNew){
            this.name = String(nameNew)
        },
        setPrice : function(priceNew){
                this.price = parseFloat(priceNew)
        },
        setDate : function(dateNew){
                this.date = new Date(dateNew)
        },
        addReview : function(id, author, date, comment, ...rating){
            var review = new Review(id, author, date, comment, ...rating)
            if(review){
                this.reviews.push(review)
            }
        },
        deleteReview : function(index){
            this.reviews.splice(index)
        },
        getAverageRating : function(){
            var avgRating = 0
            this.reviews.forEach(function(r) {
                    avgRating += (r.rating.service + r.rating.price + r.rating.value + r.rating.quality)/4
            })
            return avgRating/this.reviews.length
        }
    }
}

function Clothes(id, name, description, price, material, color, brand, activeSize, quantity, date){
    var prod = new AbstractProduct(id, name, description, price, quantity, date)
    var item = new Object({
        __proto__ : prod,
        material : String(material),
        color : String(color),
        brand : String(brand),
        sizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        activeSize : String(activeSize),
        
        getMaterial : function(){
            return this.material
        },
        getColor : function(){
            return this.color
        },
        getBrand : function(){
            return this.brand
        },
        getSizes : function(){
            return this.sizes
        },
        getActiveSize : function(){
            return this.activeSize
        },
        setBrand : function(brandNew){
            this.brand = String(brandNew)
        },
        setMaterial : function(materialNew){
            this.material = String(materialNew)
        },
        setColor : function(colorNew){
            this.color = String(colorNew)
        },
        addSize : function(sizeNew){
            this.sizes.push(sizeNew)
        },
        deleteSize : function(index){
                this.sizes.splice(index)
        },
        setActiveSize : function(activeSize){
                if(this.sizes.indexOf(activeSize)){
                    this.activeSize = activeSize
                }
                else{
                    return
                }
            }
    })
    return item
}

function Electronics(id, name, description, price, quantity, date, warranty, power){
    var prod = new AbstractProduct(id, name, description, price, quantity, date)
    if(warranty < 0){
        warranty = 0
    }
    if(warranty > 10){
        warranty = 10
    }
    var item = new Object({
        __proto__ : prod,
        warranty : Number(warranty),
        power : Number(power),

        getWarranty : function(){
            return this.warranty
        },
        getPower : function(){
            return this.power
        },
        setWarranty : function(warrantyNew){
            if(warrantyNew >= 0 || warrantyNew <= 10){
                this.warranty = Number(warrantyNew)
            }
            else{
                console.log('Wrong warranty input')
            }
        },
        setPower : function(powerNew){
            this.power = Number(powerNew)
        }
    })
    return item
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
    var result = []
    if(search.endsWith('*')){
        var newSearch = search.replace('*', '')
        for(var i = 0; i<products.length; i++){
            if(products[i].name.includes(newSearch) || products[i].description.includes(newSearch)){
                result.push(products[i])
            }
        }
    }
    else{
        for(var i = 0; i<products.length; i++){
            if(products[i].name === search || products[i].description.includes(search)){
                result.push(products[i])
            }
        }
    }
    return result
}

function SortProducts(products, rule){
    if(rule.order == "asc")
    {
        if(rule.field == "price"){
            console.log('Sort by: ' + rule.field)
            return products.sort(function (a, b){
                return a.price - b.price
            })
        }
        if(rule.field == "id"){
            console.log('Sort by: ' + rule.field)
    
            return products.sort(function (a, b){
                return a.id - b.id
            })
        }
        if(rule.field == "name"){
            console.log('Sort by: ' + rule.field)
    
            return products.sort(function (a, b){
                var nameA = a.name.toUpperCase()
                var nameB = b.name.toUpperCase()
    
                if (nameA < nameB) {
                    return -1;
                }
                  if (nameA > nameB) {
                    return 1;
                }
                
                return 0;
            })
        }
    }
    if(rule.order == "desc")
    {
        if(rule.field == "price"){
            console.log('Sort by: ' + rule.field)
            return products.sort(function (a, b){
                return b.price - a.price
            })
        }
        if(rule.field == "id"){
            console.log('Sort by: ' + rule.field)
    
            return products.sort(function (a, b){
                return b.id - a.id
            })
        }
        if(rule.field == "name"){
            console.log('Sort by: ' + rule.field)
    
            return products.sort(function (a, b){
                var nameA = a.name.toUpperCase()
                var nameB = b.name.toUpperCase()
    
                if (nameA < nameB) {
                    return 1;
                }
                  if (nameA > nameB) {
                    return -1;
                }
                
                return 0;
            })
        }
    }
    
}

var sortRule = {
    order: "asc", //asc or desc for ascending or descending
    field : "price" //id, name, price for selected field
}

/*var product1 = new Product(0, "pants", "some description", 100.50, "trussardi", "XL", 10, 10-10-2020)
var product2 = new Product(1, "shirt", "another description", 50.50, "lacoste", "XL", 10, 10-10-2020)
var product3 = new Product(2, "blazer", "blazers description", 260.99, "brioni", "XL", 5, 10-10-2020)
var product4 = new Product(3, "tracking shoes", "shoes description", 160.79, "nike", "XL", 7, 10-10-2020)
var prodArr = [product3, product4, product2, product1]
console.log(SearchProducts("shi*", prodArr))
console.log(SortProducts(prodArr, sortRule))

product1.addReview(0, "Peter", 10-10-2020, "wow!", [10, 9, 8, 10])
product1.addReview(1, "Joe", 10-10-2020, "meh!", [6, 7, 5, 7])
product1.addReview(2, "Roy", 10-10-2020, "lame!", [3, 4, 4, 3])
*/

var pants = new Clothes(0, "pants", "some description", 100.50, "cotton", "black", "phillip plein", "XL", 5, '10-10-2020')
var shirt = new Clothes(1, "shirt", "another description", 60.50, "cotton", "red", "lacoste", "XL", 5, '10-10-2020')
var tv = new Electronics(2, "TV", "TVs description", 1299.99, 10, '10-10-2020', 3, 0.5)
var prodArr = [tv, shirt, pants]

console.log(SearchProducts('TV', prodArr))
console.log(SortProducts(prodArr, sortRule))
console.log(pants.getFullInformation())