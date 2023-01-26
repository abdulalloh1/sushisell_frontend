import { CoreApi } from "@/api/base/CoreApi";
import AuthApi from "@/api/parts/AuthApi";
import CatalogApi from "@/api/parts/CatalogApi";
import CartApi from "@/api/parts/CartApi";

export default {
    cities: new CoreApi('/cities'),
    setting: new CoreApi('/setting'),
    auth: new AuthApi('/user'),
    catalog: new CatalogApi('/menu/catalog'),
    menu: new CoreApi('/menu'),
    cart: new CartApi('/cart')
}