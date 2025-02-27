import Header from "./views/Header.js"
import Vendor from "./views/Vendor.js"
import FeaturedVenue from "./views/FeaturedVenue.js"
import CatererCard from "./views/FeaturedCaterers.js"
import PhotoCard from "./views/FeaturedPhotographer.js"
import Decorators from "./views/FeaturedDecorators.js"

function Home() {
  return (
    <>
      <Header />
      <Vendor />
      <FeaturedVenue />
      <CatererCard />
      <PhotoCard />
      <Decorators />
    </>
  );
}

export default Home;
