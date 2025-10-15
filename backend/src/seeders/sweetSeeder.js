const Sweet = require('../models/Sweet');

const seedSweets = async () => {
  try {
    // Check if products already exist
    const existingCount = await Sweet.countDocuments();
    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} products. Skipping seed.`);
      return;
    }

    const sampleSweets = [
      {
        name: "Classic Gulab Jamun",
        description: "Traditional soft and spongy milk solid balls in sugar syrup",
        price: 249,
        category: "indian",
        imageUrl: "/gulabjamun.jpeg",
        stock: 30,
        rating: 4.9,
        isActive: true,
        ingredients: ["Milk solids", "Sugar", "Cardamom", "Rose water"],
        tags: ["traditional", "festival", "sweet"]
      },
      {
        name: "Bengali Rasgulla",
        description: "Soft cottage cheese balls in light sugar syrup",
        price: 199,
        category: "indian",
        imageUrl: "/rasgulla.jpeg",
        stock: 25,
        rating: 4.7,
        isActive: true,
        ingredients: ["Cottage cheese", "Sugar", "Cardamom"],
        tags: ["bengali", "light", "refreshing"]
      },
      {
        name: "Kaju Katli",
        description: "Diamond shaped cashew sweets with silver foil",
        price: 459,
        category: "indian",
        imageUrl: "/kaju.jpeg",
        stock: 15,
        rating: 4.8,
        isActive: true,
        ingredients: ["Cashews", "Sugar", "Silver foil"],
        tags: ["premium", "cashew", "festival"]
      },
      {
        name: "French Macarons",
        description: "Delicate almond cookies with buttercream filling",
        price: 399,
        category: "pastries",
        imageUrl: "/macarons.jpeg",
        stock: 20,
        rating: 4.6,
        isActive: true,
        ingredients: ["Almond flour", "Sugar", "Egg whites", "Buttercream"],
        tags: ["french", "delicate", "colorful"]
      },
      {
        name: "Motichoor Laddu",
        description: "Traditional round sweets made with gram flour",
        price: 179,
        category: "indian",
        imageUrl: "/motichur.jpeg",
        stock: 35,
        rating: 4.6,
        isActive: true,
        ingredients: ["Gram flour", "Sugar", "Ghee", "Nuts"],
        tags: ["traditional", "festival", "round"]
      },
      {
        name: "Chocolate Brownies",
        description: "Fudgy chocolate brownies with walnuts",
        price: 249,
        category: "chocolate",
        imageUrl: "/brownie.jpeg",
        stock: 40,
        rating: 4.5,
        isActive: true,
        ingredients: ["Dark chocolate", "Butter", "Sugar", "Walnuts"],
        tags: ["chocolate", "fudgy", "nuts"]
      },
      {
        name: "Strawberry Cake",
        description: "Fresh strawberry sponge cake with cream",
        price: 599,
        category: "pastries",
        imageUrl: "/strawberrycake.jpeg",
        stock: 10,
        rating: 4.7,
        isActive: true,
        ingredients: ["Strawberries", "Sponge cake", "Cream", "Sugar"],
        tags: ["fresh", "cake", "strawberry"]
      }
    ];

    const insertedSweets = await Sweet.insertMany(sampleSweets);
    console.log(`✅ Successfully seeded ${insertedSweets.length} sweets to database!`);
    
    return insertedSweets;
  } catch (error) {
    console.error('❌ Error seeding sweets:', error);
    throw error;
  }
};

module.exports = { seedSweets };