import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import LayoutWrapper from "@/components/common/LayoutWrapper";
import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import ScrollTop from "@/components/common/ScrollTop";
import Context from "@/context/Context";
import Login from "@/components/modals/Login";
import MobileMenu from "@/components/modals/MobileMenu";
import QuickAdd from "@/components/modals/QuickAdd";
import QuickView from "@/components/modals/QuickView";
import Register from "@/components/modals/Register";
import ResetPass from "@/components/modals/ResetPass";
import Search from "@/components/modals/Search";
import ShoppingCart from "@/components/modals/ShoppingCart";
import OrderDetails from "@/components/modals/OrderDetails";
import SiteOnlyComponents from "@/components/common/SiteOnlyComponents";
import CookieBanner from "@/components/common/CookieBanner";
import MarketingScripts from "@/components/common/MarketingScripts";
import { connectDB } from "@/lib/mongodb";
import Setting from "@/lib/models/Setting";

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isRTL = locale === "he";

  let faviconUrl = "/favicon.ico";
  try {
    await connectDB();
    const row = await Setting.findOne({ key: "favicon_url" }).lean();
    if (row?.value) faviconUrl = row.value;
  } catch {}

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href={faviconUrl} />
        <link
          rel="stylesheet"
          href={isRTL ? "/css/bootstrap.rtl.min.css" : "/css/bootstrap.min.css"}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <LayoutWrapper>
            <Context>
              <div id="wrapper">{children}</div>
              <ScrollTop />
              <Login />
              <MobileMenu />
              <QuickAdd />
              <QuickView />
              <Register />
              <ResetPass />
              <Search />
              <ShoppingCart />
              <OrderDetails />
              <SiteOnlyComponents />
              <CookieBanner />
              <MarketingScripts />
            </Context>
          </LayoutWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
