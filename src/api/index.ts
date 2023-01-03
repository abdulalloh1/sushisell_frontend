import { Core } from "@/api/base/Core";

export default {
    cities: new Core('/cities'),
    setting: new Core('/setting')
}