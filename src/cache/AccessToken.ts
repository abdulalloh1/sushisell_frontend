import CacheCore from "@/cache/CacheCore";

class InternalTokenCache extends CacheCore {
  constructor() {
    super('accessToken');
  }
}
class ExternalTokenCache extends CacheCore {
  constructor() {
    super('externalAccessToken');
  }
}

export const InternalAccessToken = new InternalTokenCache();
export const ExternalAccessToken = new ExternalTokenCache();
