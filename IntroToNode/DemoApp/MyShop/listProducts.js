var faker = require('faker');

//var randomName = faker.name.findName(); // Rowan Nikolaus
//var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
//var randomCard = faker.helpers.createCard(); // random contact card containing many properties

//console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
//console.log(randomName);
//console.log(randomEmail);
//console.log(randomCard);

//var randomName = faker.commerce.productName(); 
//var randomPrice = faker.commerce.price(); 
console.log("==========================");
console.log("WELCOME TO MY SHOP");
console.log("==========================");
for(var i=0;i<10;i++){
console.log(faker.commerce.productName() + " - $" + faker.commerce.price()); 
}
