import Ember from 'ember';

export default Ember.Component.extend({
  align: 'right',
  layoutName: 'components/dropdown',

  options: function() {
    return `align: ${this.get('align')}`;
  }.property('align'),

  id: function() {
    return `${Ember.guidFor(this)}-dropdown`;
  }.property('element'),

  close: function() {
    this.$('> button').trigger('click');
  }
});
