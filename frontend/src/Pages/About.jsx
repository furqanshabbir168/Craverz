import BurgerBanner from "../Components/BurgerBanner"
import TopBanner from "../Components/TopBanner"
import About from "../Components/About"
import PizzaBanner from "../Components/PizzaBanner"
import Chef from "../Components/Chef"
import App from "../Components/App"
import GallerySection from "../Components/GallerySection"

function AboutPage(){
    return(
        <div>
            <TopBanner/>
            <BurgerBanner/>
            <About/>
            <PizzaBanner/>
            <Chef/>
            <App/>
            <GallerySection/>
        </div>
    )
}
export default AboutPage