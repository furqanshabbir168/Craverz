import About from "../Components/About"
import BestSellingFoodSection from "../Components/BestSellingFood"
import BurgerBanner from "../Components/BurgerBanner"
import Chef from "../Components/Chef"
import DisscountBanner from "../Components/DisscountBanner"
import Footer from "../Components/Footer"
import GallerySection from "../Components/GallerySection"
import Hero from "../Components/Hero"
import PizzaBanner from "../Components/PizzaBanner"
import PopularFood from "../Components/PopularFood"


function Home(){
    return(
        <div>
            <Hero/>
            <PopularFood/>
            <BurgerBanner/>
            <About/>
            <BestSellingFoodSection/>
            <PizzaBanner/>
            <Chef/>
            <DisscountBanner/>
            <GallerySection/>
            <Footer/>
        </div>
    )
}
export default Home