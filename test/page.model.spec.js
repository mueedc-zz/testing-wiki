const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
const supertest = require('supertest');
const models = require('../models');
const { Page, User } = require('../models')
const agent = supertest(models);
chai.use(spies);
chai.should();
chai.use(require('chai-things'));

describe('Page model', function () {
    let page;

    beforeEach(function () {
        page = Page.build({
            title: 'Page Title',
            content: 'Page Content',
            tags: ['page', 'content']
        })

        page.save()

            .then(() => {
                // result === savedPage (sequelize instance)
                // I am here and now know that my instance has been saved
                done()
            })
            // .then(done) // incorrect -- because we will be invoking done with a parameter which means ERROR so stop testing
            .catch(err => {
                done(err)
            }); // correct
    });



    describe('Virtuals', function () {
        describe('route', function () {
            it('returns the url_name prepended by "/wiki/"', function () {
                // page.urlTitle = 'some_title';
                // console.log(page)
                expect(page.route).to.equal(`/wiki/${page.urlTitle}`);

            });
        });
        describe('renderedContent', function () {
            it('converts the markdown-formatted content into HTML', function () {
                page.content = 'I am using __marked__.'
                expect(page.renderedContent).to.equal('<p>I am using <strong>marked</strong>.</p>\n');

            });
        });
    });

    describe('Class methods', function () {

        describe('findByTag', function () {
            it('gets pages with the search tag', function (done) {
                Page.findByTag('content')
                    .then(function (pages) {
                        expect(pages).to.have.lengthOf(1);
                        done();
                    })
                    .catch(done);
            });

            it('does not get pages without the search tag', function (done) {
                Page.findByTag('falafel')
                    .then(function (pages) {
                        expect(pages).to.have.lengthOf(0);
                        done();
                    })
                    .catch(done);
            });
        });
    });

    describe('Instance methods', function () {
       
        describe('findSimilar', function () {
            it('never gets itself', function (done) {
                Page.prototype.findSimilar('page')
                    .then(function (pages) {
                        expect(pages).to.have.lengthOf(0);
                        done();
                    })
                    .catch(done);
            });
            it('gets other pages with any common tags');
            it('does not get other pages without any common tags');
        });


        describe('Validations', function () {
            it('errors without title');
            it('errors without content');
            it('errors given an invalid status');
        });

        describe('Hooks', function () {
            it('it sets urlTitle based on title before validating');
        });
        afterEach(function (done) {

            User.sync({ force: true })
                .then(function () {
                    return Page.sync({ force: true });
                })
                .then(() => done())
        })
    });
})
