import { useContext } from "react";
import Account from "../Components/Account";
import TopBanner from "../Components/TopBanner";
import { ShopContext } from "../Context/ShopContext";


function MyAccount() {
  const { token, loadingToken } = useContext(ShopContext);
  

  if (loadingToken) return null; // or show a mini loader here

  return (
    <div>
      {token=== "" ? <TopBanner/> : <></>}
      {token === "" ? <Account /> : <DashBoardPage/>}
    </div>
  );
}

export default MyAccount;
