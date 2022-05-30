class LocalEvent {
  constructor(item) {
    this.item = item;
  }

  get() {
    return JSON.parse(localStorage.getItem(this.item));
  }

  set(obj) {
    localStorage.setItem(this.item, JSON.stringify(obj));
  }

  remove() {
    localStorage.removeItem(this.item);
  }
}

export const ddl_event = new LocalEvent('ddl_noted');
export const ddl_theme = new LocalEvent('ddl_theme');