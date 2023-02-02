export default abstract class CacheCore {
  key: string;

  protected constructor(key: string) {
    this.key = key;
  }

  clear () {
    localStorage.removeItem(this.key);
  }

  get () {
    return localStorage.getItem(this.key);
  }
  set (value: string) {
    localStorage.setItem(this.key, value);
  }

  setStringified(value: Object) {
    const valueAsString = JSON.stringify(value);
    localStorage.setItem(this.key, valueAsString);
  }
}