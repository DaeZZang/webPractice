const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const axios = require("axios");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function seedImg() {
  try {
    const resp = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "DxjUX6j3vxv8Zu1DInCTjPK4J0qIpMHWM1rOeUvY3Fo",
        collections: 9046579,
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
  }
}

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 5; i++) {
    // setup
    const placeSeed = Math.floor(Math.random() * places.length);
    const descriptorsSeed = Math.floor(Math.random() * descriptors.length);
    const citySeed = Math.floor(Math.random() * cities.length);

    // seed data into campground
    const camp = new Campground({
      author: "62382bc8d1f19bb916bd7ea2",
      images: [
        {
          url: "https://res.cloudinary.com/doumkpuxt/image/upload/v1648458070/YelpCamp/iucc0ku1hkb69qvjfwen.png",
          filename: "YelpCamp/iucc0ku1hkb69qvjfwen",
        },
        {
          url: "https://res.cloudinary.com/doumkpuxt/image/upload/v1648458072/YelpCamp/l9axh8rpdjrk1wnha25t.png",
          filename: "YelpCamp/l9axh8rpdjrk1wnha25t",
        },
      ],
      title: `${descriptors[descriptorsSeed]} ${places[placeSeed]}`,
      location: `${cities[citySeed].city}, ${cities[citySeed].state}`,
      price: placeSeed + descriptorsSeed + citySeed,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
