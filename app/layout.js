import LayoutWrapper from "@/components/common/LayoutWrapper";

import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import ScrollTop from "@/components/common/ScrollTop";
import Toolbar from "@/components/common/Toolbar";
import Context from "@/context/Context";
import Compare from "@/components/modals/Compare";
import Login from "@/components/modals/Login";
import MobileMenu from "@/components/modals/MobileMenu";
import QuickAdd from "@/components/modals/QuickAdd";
import QuickView from "@/components/modals/QuickView";
import Register from "@/components/modals/Register";
import ResetPass from "@/components/modals/ResetPass";
import Search from "@/components/modals/Search";
import ShoppingCart from "@/components/modals/ShoppingCart";
import SizeGuide from "@/components/modals/SizeGuide";
import AskQuestion from "@/components/modals/AskQuestion";
import Delivery from "@/components/modals/Delivery";
import Engrave from "@/components/modals/Engrave";
import Pickup from "@/components/modals/Pickup";
import ProductDes from "@/components/modals/ProductDes";
import UnavailableModal from "@/components/modals/UnavailableModal";
import OrderDetails from "@/components/modals/OrderDetails";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          <Context>
            <div id="wrapper">{children}</div>
            <Toolbar />

            <ScrollTop />
            <Compare />
            <Login />
            <MobileMenu />

            <QuickAdd />
            <QuickView />
            <Register />
            <ResetPass />
            <Search />
            <ShoppingCart />
            <SizeGuide />
            <AskQuestion />
            <Delivery />
            <Engrave />
            <Pickup />
            <ProductDes />
            <UnavailableModal />
            <OrderDetails />
          </Context>
        </LayoutWrapper>
      </body>
    </html>
  );
}
