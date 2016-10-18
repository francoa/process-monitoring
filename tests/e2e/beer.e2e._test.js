"use strict";

describe('beer.e2e', function() {
    var SUBMIT_BEER_BUTTON = '#submit-beer-button';
    var BEER_MODEL = 'beersCtrl.beer.beerMessage';
    var CLOSE_BEER = '.beer-done';

    beforeEach(function() {
        browser.get('/');
    })

    describe('creation', function() {
        it('should have the submit button disabled', function() {
            expect($(SUBMIT_BEER_BUTTON).isEnabled()).toBeFalsy();
        })

        it('should have the right title', function() {
            expect(browser.getTitle()).toEqual('Stuff Beer!');
        })
    })

    describe('addition', function() {
        it('should add a new beer - enter', function() {
            element(by.model(BEER_MODEL)).sendKeys('This was added by Protractor :D (at '+String(new Date())+')');

            element(by.model(BEER_MODEL)).sendKeys(protractor.Key.ENTER);

            var _count = element.all(by.repeater('t in beersCtrl.beers')).count();

            expect(_count).toBeGreaterThan(0);
        })

        it('should add a new beer - click', function() {
          element(by.model(BEER_MODEL)).sendKeys('Added by Protractor :D (at '+String(new Date())+')');

          $(SUBMIT_BEER_BUTTON)
            .click()
            .then(function() {
                element.all(by.repeater('t in beersCtrl.beers'))
                  .count()
                  .then(function(count) {
                      expect(count).toBeGreaterThan(0);
                  });
            });
        })
    })

    describe('deletion', function() {
        it('should delete a beer', function() {
            var _firstCount = element.all(by.repeater('t in beersCtrl.beers')).count();

            $$(CLOSE_BEER)
              .get(0)
              .click(function() {
                  var _secondCount = element.all(by.repeater('t in beersCtrl.beers')).count();

                  expect(_secondCount).toBeLessThan(_firstCount);
              });
        })
    })
})
