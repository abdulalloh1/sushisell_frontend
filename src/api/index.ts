import { Core } from "@/api/base/Core";
import { axiosInstanceV2 } from "@/api/base/HTTPBaseService";
import Auth from "@/api/parts/auth";
import Catalog from "@/api/parts/catalog";
import Cart from "@/api/parts/cart";

export default {
    cities: new Core('/cities'),
    setting: new Core('/setting'),
    auth: new Auth('/user'),
    catalog: new Catalog('/menu/catalog', axiosInstanceV2),
    menu: new Core('/menu'),
    cart: new Cart('/cart')
}