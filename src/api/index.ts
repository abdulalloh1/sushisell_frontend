import { Core } from "@/api/base/Core";
import Auth from "@/api/parts/auth";

export default {
    cities: new Core('/cities'),
    setting: new Core('/setting'),
    auth: new Auth('/user')
}