const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

describe('simple test situation', function () {
    it('simple additon', function () {
        expect(2 + 2).to.equal(4);
    })
    it('testing setTimeout', function (done) {
        const start = new Date();
        setTimeout(function(){
            const output = new Date() - start;
            expect(output).to.be.closeTo(1000, 50);
            done();
        }, 1000);
    })
    it('will invoke a function once per element', function () {
        var arr = ['x','y','z'];
        function logNth (val, idx) {
          console.log('Logging elem #'+idx+':', val);
        }
        logNth = chai.spy(logNth);
        arr.forEach(logNth);
        expect(logNth).to.have.been.called.exactly(arr.length);
      });
})