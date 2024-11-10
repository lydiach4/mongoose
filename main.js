  
  const mongoose = require('mongoose');
  require('dotenv').config();
  
  // Import mongoose
  const mongoose = require('mongoose');
  
  // Connect to MongoDB using the URI from the environment file
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err);
    })
  
  // Define the Person schema
  const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String], required: true }
  });
  
  // Create the Person model
  const Person = mongoose.model('Person', personSchema);
  
 
  

  // Create a new person instance
  const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Pasta']
  });
  
  // Save the document to the database
  person.save(function(err, data) {
    if (err) {
      console.error('Error saving person:', err);
    } else {
      console.log('Person saved:', data);
    }
  });
 
  // Array of people to add to the database
  const arrayOfPeople = [
    { name: 'Alice', age: 25, favoriteFoods: ['Burrito', 'Tacos'] },
    { name: 'Bob', age: 28, favoriteFoods: ['Pizza', 'Burgers'] },
    { name: 'Charlie', age: 32, favoriteFoods: ['Sushi', 'Ramen'] }
  ];
  
  // Create many people at once
  Person.create(arrayOfPeople, function(err, people) {
    if (err) {
      console.error('Error creating people:', err);
    } else {
      console.log('People created:', people);
    }
  });
 
  Person.find({ name: 'Alice' }, function(err, people) {
    if (err) {
      console.error('Error finding people:', err);
    } else {
      console.log('People found:', people);
    }
  });
 
  Person.findOne({ favoriteFoods: 'Burrito' }, function(err, person) {
    if (err) {
      console.error('Error finding person:', err);
    } else {
      console.log('Person found:', person);
    }
  });

  
 
  
  
  const aPersonId = 'your_person_id_here'; // Replace with an actual ID
  
  Person.findById(aPersonId, function(err, person) {
    if (err) {
      console.error('Error finding person by ID:', err);
    } else {
      console.log('Person found:', person);
    }
  });
  
  
  
  
 
  const personId = 'your_person_id_here'; // Replace with actual ID
  
  Person.findById(personId, function(err, person) {
    if (err) {
      console.error('Error finding person:', err);
    } else {
      person.favoriteFoods.push('hamburger');
      person.save(function(saveErr, updatedPerson) {
        if (saveErr) {
          console.error('Error saving updated person:', saveErr);
        } else {
          console.log('Updated person:', updatedPerson);
        }
      });
    }
  });
  
  
 
  
  
  const personName = 'John Doe';
  
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, function(err, updatedPerson) {
    if (err) {
      console.error('Error updating person:', err);
    } else {
      console.log('Updated person:', updatedPerson);
    }
  });
 
  

  
  
  const PersonId = 'your_person_id_here'; // Replace with actual ID
  
  Person.findByIdAndRemove(personId, function(err, deletedPerson) {
    if (err) {
      console.error('Error deleting person:', err);
    } else {
      console.log('Deleted person:', deletedPerson);
    }
  });
 
  
 
  
 
  Person.remove({ name: 'Mary' }, function(err, result) {
    if (err) {
      console.error('Error deleting people:', err);
    } else {
      console.log('Number of people deleted:', result.n);
    }
  });
  
  
  
  Person.find({ favoriteFoods: 'Burrito' })
    .sort({ name: 1 }) // Sort by name in ascending order
    .limit(2) // Limit results to 2
    .select('-age') // Exclude the age field
    .exec(function(err, data) {
      if (err) {
        console.error('Error finding people:', err);
      } else {
        console.log('People found:', data);
      }
    })
