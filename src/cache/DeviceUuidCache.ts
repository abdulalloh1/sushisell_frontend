import CacheCore from "@/cache/CacheCore";

export default new class DeviceUuidCache extends CacheCore {
  constructor() {
    super('deviceUUID');
  }
}();