import App from "../Components/App"
import GallerySection from "../Components/GallerySection"
import OurServices from "../Components/OurServices"
import TopBanner from "../Components/TopBanner"


function Services(){
    return(
        <div>
            <TopBanner/>
            <OurServices/>
            <App/>
            <GallerySection/>
        </div>
    )
}
export default Services