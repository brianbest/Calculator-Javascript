class Button {
  constructor(label, value) {
    this.label = label;
    this.value = value;
    this.el = $(`<button>${this.label}</button>`);
    this.el.on('click', this.onClick.bind(this));
  }

  getElement() {
    return this.el;
  }

  onClick() {
    this.el.trigger('button:selected', [this.value]);
  }
}
