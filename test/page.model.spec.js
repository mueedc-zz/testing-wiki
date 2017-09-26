const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
const supertest = require('supertest');
const models = require('../models');
const { Page } = models
const agent = supertest(models);
chai.use(spies);

describe('Page model', function () {
    let page, otherPage;
    beforeEach(function () {
        page = Page.build({
            title: 'Page Title',
            content: 'Page Content',
            tags: ['page', 'content']
        })
        page.save()
        // page.;
        otherPage = Page.create({
            title: 'Page Title',
            content: 'Page Content'
        })
        
        // console.log('otherpage is promise', otherPage.then)
            // .then((page) => console.log(page.route))
            // .catch();
    });

    describe('Virtuals', function () {
        describe('route', function () {
            it('returns the url_name prepended by "/wiki/"', function (done) {
                // page.urlTitle = 'some_title';
                // console.log(page)
                expect(page.route).to.equal(`/wiki/${page.urlTitle}`);
                done();
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
                Page.findByTag('page')
                    .then((pages) => {
                        expect(pages).to.have.lengthOf(1);
                        done();
                    })
                    .catch(done)
            });
            it('does not get pages without the search tag');
        });
    });

    describe('Instance methods', function () {
        describe('findSimilar', function () {
            it('never gets itself');
            it('gets other pages with any common tags');
            it('does not get other pages without any common tags');
        });
    });

    describe('Validations', function () {
        it('errors without title');
        it('errors without content');
        it('errors given an invalid status');
    });

    describe('Hooks', function () {
        it('it sets urlTitle based on title before validating');
    });

});
