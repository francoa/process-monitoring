import mongoose from 'mongoose';
import BeerDAO from '../../../../server/api/beer/dao/beer-dao';
import {expect} from 'chai';
import {setupMongoose, createBeers} from '../../_helpers/db';

describe('beer.dao', () => {
    before(() => {
        setupMongoose(mongoose);
    });

    afterEach((done) => {
        BeerDAO.remove({}, () => done());
    })

    describe('getAll', () => {
        beforeEach((done) => {
            createBeers()
            .then(() => done())
            .catch(() => done());
        })

        it('should get all beers', (done) => {
            let _onSuccess = beers => {
                expect(beers).to.be.defined;
                expect(beers[0]).to.have.property('beerMessage').and.to.equal('aaaaaaa0');
                expect(beers[0]).to.have.property('createdAt').and.to.be.defined;

                done();
            }

            let _onError = (err) => {
                expect(true).to.be.false; // should not come here
            }

            BeerDAO
              .getAll()
              .then(_onSuccess)
              .catch(_onError);
        })
    })

    describe('createBeer', () => {
        it('should throw an error, object passed is not defined', (done) => {
            let _undefinedBeer = undefined;

            let _onSuccess = () => {
                expect(true).to.be.false; // should not come here;
            }

            let _onError = error => {
                expect(error).to.be.defined;

                done();
            }

            BeerDAO
              .createBeer(_undefinedBeer)
              .then(_onSuccess)
              .catch(_onError);
        })

        it('should create the beer correctly', (done) => {
            let _beer = {beerMessage: 'abc'};

            let _onSuccess = beer => {
                expect(beer).to.be.defined;
                expect(beer.beerMessage).to.equal('abc');
                expect(beer.createdAt).to.be.defined;

                done();
            }

            let _onError = () => {
                expect(true).to.be.false;
            }

            BeerDAO
              .createBeer(_beer)
              .then(_onSuccess)
              .catch(_onError);
        })
    })

    describe('deleteBeer', () => {
        beforeEach((done) => {
            createBeers()
              .then(() => done())
              .catch(() => done());
        })

        it('should get an error back, id is not defined', (done) => {
            let _id = null;

            let _onSuccess = () => {
                expect(true).to.be.false;
            }

            let _onError = error => {
                expect(error).to.be.defined;

                done();
            }

            BeerDAO
              .deleteBeer(_id)
              .then(_onSuccess)
              .catch(_onError);
        })

        it('should delete the doc successfully', (done) => {
          let _id = '507c7f79bcf86cd7994f6c10';

          let _onSuccess = () => {
            expect(true).to.be.true;

            done();
          }

          let _onError = () => {
            expect(true).to.be.false;
          }

          BeerDAO
            .deleteBeer(_id)
            .then(_onSuccess)
            .catch(_onError);
        })
    })
})
