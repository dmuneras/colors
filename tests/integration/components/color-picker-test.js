import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('color-picker', 'Integration | Component | color picker', {
  integration: true
});

test('renders an array of hex colors as selectable divs on the page', function(assert) {
  this.on('select', function(color){
    console.log('fake: ' + color);
  });

  this.set('colors', ['#ff0000', '#00ff00', '#0000ff' ]);

  this.render(hbs`{{color-picker colors=colors}}`);

  assert.equal(this.$('.color').length, 3, 'has 3 divs');
});

test('check that each div has a color', function(assert){

  this.on('select', function(color){
    console.log('fake: ' + color);
  });

  this.set('colors', ['#ff0000', '#00ff00', '#0000ff']);
  this.render(hbs`{{color-picker colors=colors}}`);
  ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'].forEach((item, index) => {
    assert.equal(this.$('.color').eq(index).css('background-color'), item);
  });
});

test('default color is set', function(assert){

  this.on('select', function(color){
    console.log('fake: ' + color);
  });

  this.set('colors', ['#ff0000', '#00ff00', '#0000ff']);
  this.render(hbs`{{color-picker colors=colors select-color=(action 'select')}}`);
  assert.equal(this.$('.selected').css('background-color'), 'rgb(255, 0, 0)' , 'default selected color is first color');
});

test('check that user can select color', function(assert){
  assert.expect(1);

  this.set('colors', ['#ff0000', '#00ff00', '#0000ff']);
  this.on('select', function(color){
    assert.equal(color, "rgb(0, 0, 255)", 'last color is selected when clicked');
  });
  this.render(hbs`{{color-picker colors=colors select-color=(action 'select')}}`);

  this.$('.color').eq(2).click();
});

test('after color is selected div get new styles', function(assert){
  assert.expect(1);

  this.set('colors', ['#ff0000', '#00ff00', '#0000ff']);
  this.on('select', function(){
    assert.equal(this.$('.color').eq(2).hasClass('selected'), true, 'selected div have selected class');
  });
  this.render(hbs`{{color-picker colors=colors select-color=(action 'select')}}`);

  this.$('.color').eq(2).click();
});


test('select-color function is not called when is not set', function(assert){
  assert.expect(0);

  this.set('colors', ['#ff0000', '#00ff00', '#0000ff']);
  this.on('select', function(){
    assert.ok(true, 'select action was called');
  });
  this.render(hbs`{{color-picker colors=colors}}`);

  this.$('.color').eq(2).click();
});


