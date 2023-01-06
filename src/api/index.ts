import { Core } from "@/api/base/Core";
import Auth from "@/api/parts/auth";
import { axiosInstanceV2 } from "@/api/base/HTTPBaseService";
import Catalog from "@/api/parts/catalog";

export default {
    cities: new Core('/cities'),
    setting: new Core('/setting'),
    auth: new Auth('/user'),
    catalog: new Catalog('/menu/catalog', axiosInstanceV2),
    menu: new Core('/menu')
}