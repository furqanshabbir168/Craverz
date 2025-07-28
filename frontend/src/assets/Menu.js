// 🍕 Pizzas
import pizzaone from '../assets/pizza-1.jpeg'
import pizzatwo from '../assets/pizza-2.jpeg'
import pizzathree from '../assets/pizza-3.webp'
import pizzafour from '../assets/pizza-4.jpg'

// 🍔 Burgers & Sandwiches
import burgerandsandwichone from '../assets/burger-and-sandwich-1.avif'
import burgerandsandwichtwo from '../assets/burger-and-sandwich-2.webp'
import burgerandsandwichthree from '../assets/burger-and-sandwich-3.webp'
import burgerandsandwichfour from '../assets/burger-and-sandwich-4.webp'

// 🍗 Wings & Nuggets
import wingsandnuggone from '../assets/wings-and-nugg-1.jpg'
import wingsandnuggtwo from '../assets/wings-and-nugg-2.jpg'
import wingsandnuggthree from '../assets/wings-and-nugg-3.jpg'
import wingsandnuggfour from '../assets/wings-and-nugg-4.jpeg'

// 🍝 Pasta
import pastaone from '../assets/pasta-1.jpg'
import pastatwo from '../assets/pasta-2.jpg'
import pastathree from '../assets/pasta-3.jpg'
import pastafour from '../assets/pasta-4.jpg'

// 🍚 Fried Rice & Chinese
import friedriceone from '../assets/fried-rice-1.jpg'
import friedricetwo from '../assets/fried-rice-2.jpg'
import friedricethree from '../assets/fried-rice-3.jpg'
import friedricefour from '../assets/fried-rice-4.jpg'

// 🍜 Noodles & Chow Mein
import noodlesone from '../assets/noodles-1.webp'
import noodlestwo from '../assets/noodles-2.webp'
import noodlesthree from '../assets/noodles-3.jpg'
import noodlesfour from '../assets/noodles-4.webp'

// 🌯 Wraps & Rolls
import wrapone from '../assets/wrap-1.webp'
import wraptwo from '../assets/wrap-2.webp'
import wrapthree from '../assets/wrap-3.avif'
import wrapfour from '../assets/wrap-4.jpg'

// 🍟 Sides & Snacks
import friesone from '../assets/fries-1.webp'
import friestwo from '../assets/fries-2.jpg'
import friesthree from '../assets/fries-3.jpg'
import friesfour from '../assets/fries-4.jpg'

// 🥤 Drinks & Shakes
import drinkone from '../assets/drink-1.jpg'
import drinktwo from '../assets/drink-2.jpg'
import drinkthree from '../assets/drink-3.jpg'
import drinkfour from '../assets/drink-4.jpg'

// 🍰 Desserts
import dessertone from '../assets/dessert-1.jpg'
import desserttwo from '../assets/dessert-2.jpg'
import dessertthree from '../assets/dessert-3.jpg'
import dessertfour from '../assets/dessert-4.jpg'


const Menu = [
  // 🍕 Pizzas
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic cheese and tomato with basil",
    price: 799,
    category: "Pizzas",
    img : pizzaone
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Spicy pepperoni with mozzarella cheese",
    price: 899,
    category: "Pizzas",
    img : pizzatwo
  },
  {
    id: 3,
    name: "BBQ Chicken Pizza",
    description: "Smoky BBQ sauce, grilled chicken & onions",
    price: 949,
    category: "Pizzas",
    img : pizzathree
  },
  {
    id: 4,
    name: "Veggie Supreme",
    description: "Loaded with bell peppers, olives, and corn",
    price: 869,
    category: "Pizzas",
    img : pizzafour
  },

  // 🍔 Burgers & Sandwiches
  {
    id: 5,
    name: "Beef Cheeseburger",
    description: "Juicy beef patty with cheddar & sauces",
    price: 749,
    category: "Burgers & Sandwiches",
    img : burgerandsandwichone
  },
  {
    id: 6,
    name: "Zinger Burger",
    description: "Crispy fried chicken fillet with mayo",
    price: 699,
    category: "Burgers & Sandwiches",
    img : burgerandsandwichtwo
  },
  {
    id: 7,
    name: "Chicken Sandwich",
    description: "Grilled chicken breast with fresh lettuce",
    price: 659,
    category: "Burgers & Sandwiches",
    img : burgerandsandwichthree
  },
  {
    id: 8,
    name: "Double Patty Burger",
    description: "Two beef patties with cheese and sauces",
    price: 949,
    category: "Burgers & Sandwiches",
    img : burgerandsandwichfour
  },

  // 🍗 Wings & Nuggets
  {
    id: 9,
    name: "Buffalo Wings",
    description: "Spicy wings tossed in buffalo sauce",
    price: 599,
    category: "Wings & Nuggets",
    img : wingsandnuggone
  },
  {
    id: 10,
    name: "BBQ Wings",
    description: "Smoky and sweet glazed chicken wings",
    price: 599,
    category: "Wings & Nuggets",
    img : wingsandnuggtwo
  },
  {
    id: 11,
    name: "Chicken Nuggets",
    description: "Crispy and golden chicken bites",
    price: 499,
    category: "Wings & Nuggets",
    img : wingsandnuggthree
  },
  {
    id: 12,
    name: "Peri Peri Wings",
    description: "Smoky Zesty peri peri flavor wings",
    price: 629,
    category: "Wings & Nuggets",
    img : wingsandnuggfour
  },

  // 🍝 Pasta
  {
    id: 13,
    name: "Chicken Alfredo",
    description: "Creamy white sauce pasta with grilled chicken",
    price: 849,
    category: "Pasta",
    img : pastaone
  },
  {
    id: 14,
    name: "Spaghetti Bolognese",
    description: "Classic Italian meat sauce pasta",
    price: 799,
    category: "Pasta",
    img : pastatwo
  },
  {
    id: 15,
    name: "Mac & Cheese",
    description: "Cheesy elbow pasta topped with breadcrumbs",
    price: 729,
    category: "Pasta",
    img : pastathree
  },
  {
    id: 16,
    name: "Arrabbiata Pasta",
    description: "Spicy tomato sauce with herbs",
    price: 749,
    category: "Pasta",
    img : pastafour
  },

  // 🍚 Fried Rice & Chinese
  {
    id: 17,
    name: "Chicken Fried Rice",
    description: "Wok-tossed rice with chicken & veggies",
    price: 679,
    category: "Fried Rice & Chinese",
    img : friedriceone
  },
  {
    id: 18,
    name: "Schezwan Rice",
    description: "Spicy and Indo-Chinese rice dish",
    price: 699,
    category: "Fried Rice & Chinese",
    img : friedricetwo
  },
  {
    id: 19,
    name: "Chicken Manchurian",
    description: "Crispy chicken balls in tangy sauce",
    price: 729,
    category: "Fried Rice & Chinese",
    img : friedricethree
  },
  {
    id: 20,
    name: "Veg Fried Rice",
    description: "Mixed vegetable rice with soy flavor",
    price: 599,
    category: "Fried Rice & Chinese",
    img : friedricefour
  },

  // 🍜 Noodles & Chow Mein
  {
    id: 21,
    name: "Hakka Noodles",
    description: "Stir-fried noodles with sauces & veggies",
    price: 649,
    category: "Noodles & Chow Mein",
    img : noodlesone
  },
  {
    id: 22,
    name: "Chicken Chow Mein",
    description: "Wok-tossed chicken noodles with sauces",
    price: 699,
    category: "Noodles & Chow Mein",
    img : noodlestwo
  },
  {
    id: 23,
    name: "Spicy Garlic Noodles",
    description: "Chili garlic noodles with a punch",
    price: 669,
    category: "Noodles & Chow Mein",
    img : noodlesthree
  },
  {
    id: 24,
    name: "Veg Chow Mein",
    description: "Crunchy vegetables with noodles",
    price: 599,
    category: "Noodles & Chow Mein",
    img : noodlesfour
  },

  // 🌯 Wraps & Rolls
  {
    id: 25,
    name: "Chicken Shawarma",
    description: "Middle Eastern wrap with garlic sauce",
    price: 599,
    category: "Wraps & Rolls",
    img : wrapone
  },
  {
    id: 26,
    name: "Beef Kathi Roll",
    description: "Spicy beef filling in soft flatbread",
    price: 649,
    category: "Wraps & Rolls",
    img : wraptwo
  },
  {
    id: 27,
    name: "Veggie Wrap",
    description: "Fresh veggies with hummus & cheese",
    price: 499,
    category: "Wraps & Rolls",
    img : wrapthree
  },
  {
    id: 28,
    name: "Crispy Chicken Wrap",
    description: "Fried chicken wrapped with mayo & salad",
    price: 629,
    category: "Wraps & Rolls",
    img : wrapfour
  },

  // 🍟 Sides & Snacks
  {
    id: 29,
    name: "French Fries",
    description: "Crispy and golden potato fries",
    price: 299,
    category: "Sides & Snacks",
    img : friesone
  },
  {
    id: 30,
    name: "Mozzarella Sticks",
    description: "Deep-fried cheese sticks with sauces",
    price: 449,
    category: "Sides & Snacks",
    img : friestwo
  },
  {
    id: 31,
    name: "Onion Rings",
    description: "Crispy and Spicy battered onion rings",
    price: 399,
    category: "Sides & Snacks",
    img : friesthree
  },
  {
    id: 32,
    name: "Garlic Bread",
    description: "Toasted bread with garlic butter",
    price: 349,
    category: "Sides & Snacks",
    img : friesfour
  },

  // 🥤 Drinks & Shakes
  {
    id: 33,
    name: "Chocolate Shake",
    description: "Rich creamy chocolate milkshake",
    price: 399,
    category: "Drinks & Shakes",
    img : drinkone
  },
  {
    id: 34,
    name: "Cold Coffee",
    description: "Chilled coffee with ice cream blend",
    price: 379,
    category: "Drinks & Shakes",
    img : drinktwo
  },
  {
    id: 35,
    name: "Strawberry Smoothie",
    description: "Fresh strawberry blended with yogurt",
    price: 429,
    category: "Drinks & Shakes",
    img : drinkthree
  },
  {
    id: 36,
    name: "Peach Mojito",
    description: "Sparkling peach lime refreshment",
    price: 349,
    category: "Drinks & Shakes",
    img : drinkfour
  },

  // 🍰 Desserts
  {
    id: 37,
    name: "Chocolate Lava Cake",
    description: "Molten chocolate center with warm cake",
    price: 499,
    category: "Desserts",
    img : dessertone
  },
  {
    id: 38,
    name: "Brownie & Ice Cream",
    description: "Fudgy brownie served with vanilla scoop",
    price: 549,
    category: "Desserts",
    img : desserttwo
  },
  {
    id: 39,
    name: "Donuts",
    description: "Assorted sugar-glazed donuts",
    price: 399,
    category: "Desserts",
    img : dessertthree
  },
  {
    id: 40,
    name: "Vanilla Ice Cream",
    description: "Classic creamy vanilla scoop topped with rich flavor.",
    price: 299,
    category: "Desserts",
    img : dessertfour
  },
];

export default Menu;
