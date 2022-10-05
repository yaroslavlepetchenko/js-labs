'use strict'


function Product(id, name, description, price, brand, activeSize, quantity, date){
    try{
        return{
            id : String(id),
            name : String(name),
            description : String(description),
            price : parseFloat(price),
            brand : String(brand),
            sizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            activeSize : String(activeSize),
            quantity : Number(quantity),
            date : Date(date),
            reviews : [],
            images : [],

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
            getBrand : function(){
                return this.brand
            },
            getSizes : function(){
                return this.sizes
            },
            getActiveSize : function(){
                return this.activeSize
            },
            getQuantity : function(){
                return this.quantity
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
                try{
                    this.price = parseFloat(priceNew)
                }
                catch{
                    console.log("Wrong data!")
                }
            },
            setBrand : function(brandNew){
                this.brand = String(brandNew)
            },
            addSize : function(sizeNew){
                this.sizes.push(sizeNew)
            },
            deleteSize : function(index){
                try{
                    this.sizes.splice(index)
                }
                catch{
                    console.log("Wrong index")
                }
            },
            setActiveSize : function(activeSize){
                try{
                    if(this.sizes.indexOf(activeSize)){
                        this.activeSize = activeSize
                    }
                    else{
                        return
                    }
                }
                catch
                {
                    console.log("Wrong input")
                }
            },
            setDate : function(dateNew){
                try{
                    this.date = new Date(dateNew)
                }
                catch{
                    console.log("Wrong input")
                }
            },
            addReview : function(id, author, date, comment, ...rating){
                var review = new Review(id, author, date, comment, ...rating)
                if(review){
                    this.reviews.push(review)
                }
            },
            deleteReview : function(index){
                try{
                    this.reviews.splice(index)
                }
                catch{
                    console.log("Wrong index")
                }
            },
            getAverageRating : function(){
                var avgRating = 0
                this.reviews.forEach(r => {
                        avgRating += (r.rating.service + r.rating.price + r.rating.value + r.rating.quality)/4
                })
                return avgRating/this.reviews.length
            }

        }
    }
    catch(err){
        console.log('Data input is wrong ' + err)
    }    
}

function Review(id, author, date, comment, ...rating){
    try{
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
    catch(err){
        console.log('Data input is wrong ' + err)
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
            console.log(rule.field)
            return products.sort(function (a, b){
                return a.price - b.price
            })
        }
        if(rule.field == "id"){
            console.log(rule.field)
    
            return products.sort(function (a, b){
                return a.id - b.id
            })
        }
        if(rule.field == "name"){
            console.log(rule.field)
    
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
            console.log(rule.field)
            return products.sort(function (a, b){
                return b.price - a.price
            })
        }
        if(rule.field == "id"){
            console.log(rule.field)
    
            return products.sort(function (a, b){
                return b.id - a.id
            })
        }
        if(rule.field == "name"){
            console.log(rule.field)
    
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
    order: "desc", //asc or desc for ascending or descending
    field : "name" //id, name, price for selected field
}

var product1 = new Product(0, "pants", "some description", 100.50, "trussardi", "XL", 10, 10-10-2020)
var product2 = new Product(1, "shirt", "another description", 50.50, "lacoste", "XL", 10, 10-10-2020)
var product3 = new Product(2, "blazer", "blazers description", 260.99, "brioni", "XL", 5, 10-10-2020)
var product4 = new Product(3, "tracking shoes", "shoes description", 160.79, "nike", "XL", 7, 10-10-2020)
var prodArr = [product3, product4, product2, product1]
console.log(SearchProducts("shi*", prodArr))
console.log(SortProducts(prodArr, sortRule))

product1.addReview(0, "Peter", 10-10-2020, "wow!", 10, 9, 8, 10)
product1.addReview(1, "Joe", 10-10-2020, "meh!", 6, 7, 5, 7)
product1.addReview(2, "Roy", 10-10-2020, "lame!", 3, 4, 4, 3)
