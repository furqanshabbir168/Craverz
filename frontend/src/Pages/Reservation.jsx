import Chef from "../Components/Chef"
import ReservationForm from "../Components/ReservationForm"
import TopBanner from "../Components/TopBanner"


function Reservation(){
    return(
        <div>
            <TopBanner/>
            <ReservationForm/>
            <Chef/>
        </div>
    )
}
export default Reservation