import Ember from 'ember';

const { isPresent } = Ember;
export default Ember.Component.extend({

  attributeBindings: ['select-color'],
  colors: [],

  didInsertElement() {
    this._super(...arguments);
    let firstDiv = this.$('.color').first();
    firstDiv.addClass('selected');
    this.set('color', firstDiv.css('background-color'));
  },

  click(event) {
    let target = this.$(event.target),
        color = target.css('background-color');

    if (target.hasClass('color')) {
      this.set('color', color);
      this.$('.color').removeClass('selected');
      target.addClass('selected');
      if (isPresent(this.get('select-color'))) {
        this.get('select-color')(color);
      }
    }
  }
});
