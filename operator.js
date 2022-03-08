class Operator extends Button {
  constructor(label, value) {
    super(label, value);
  }

  onClick() {
    this.el.trigger('operator:selected', [this.value]);
  }
}
