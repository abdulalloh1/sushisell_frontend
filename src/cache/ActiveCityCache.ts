import CacheCore from "@/cache/CacheCore";

export default new class ActiveCityCache extends CacheCore {
  constructor() {
    super('activeCity');
  }
}();