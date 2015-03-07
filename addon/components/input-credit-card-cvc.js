import Ember from 'ember';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';

var computed = Ember.computed;

export default Ember.TextField.extend({
  classNames: ['input-credit-card-cvc'],
  autocomplete: 'off',
  placeholder: '•••',
  label: 'Expiration',

  keyPress: function(e) {
    var digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return false;
    }
    
    var el = this.$();
    if (hasTextSelected(el)) {
      return true;
    }
    
    var value = el.val() + digit;
    
    return value.length <= 4;
  },


  value: computed('cvc', function(key, value) {
    var number = this.get('cvc');

    if (arguments.length > 1) {
      number = value.replace(/\D/g, '').slice(0, 4);
      this.set('cvc', value);
    }

    return number;
  })

});
