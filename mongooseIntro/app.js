const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/fruitsDB" , { useNewUrlParser: true, useUnifiedTopology: true });
console.log("DB Connected!");

const fruitSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true, 
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});


const Fruit = mongoose.model("Fruit", fruitSchema);

const melon = new Fruit({
  name: "Melon",
  rating: 10,
  review: "Te amo mucho"
});

melon.save();

Fruit.find(function (err, fruits) {
  if(err) {
    console.log(err);
  } else {
    //mongoose.connection.close();
    fruits.forEach(fruit => {
      console.log(fruits);
    });
  }
});

/* something.save(() => {
  Fruit.find(function (err, fruits) {
  if(err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(fruit => {
      console.log(fruit.name);

    });
  }
})
}); */


/* Fruit.deleteOne({_id: "60551a075efa3749f0ab3d7e"}, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log("Delete success!");
  }
}); */


/* Fruit.updateOne({_id: "60551a1f8e18d70f0c3ee068"}, {name: "Grape"}, err => {
  if(err) {
    console.log(err);
  } else {
    console.log("Succesfully updated the doccument.");
  }
}) */

const petSchema = new mongoose.Schema( {
  name: String,
  age: Number,
  description: String,
  favoriteFruit: fruitSchema
});

const Pet = mongoose.model("Pet", petSchema);

const pet = new Pet({
  name: "Michi",
  age: 2,
  description: "Bien loquita!",
  favoriteFruit: melon
});

pet.save(() => {
  Pet.find(function (err, pets) {
    if(err) {
      console.log(err);
    } else {
      mongoose.connection.close();
      console.log(pets);
    }
  })
});

/* Pet.updateOne({_id: "6055047afd411d1ce8bdcff2"}, {favoriteFruit: pear}, () => {
  Pet.find(function (err, pets) {
    if(err) {
      console.log(err);
    } else {
      mongoose.connection.close();
      console.log(pets);
    }
  })
}) */


