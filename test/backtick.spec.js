var Backtick = require('../index')
    , expect = require('chai').expect
    , _      = require('lodash');

describe('Backtick#api', function () {
    it('should instantiates without arguments', function () {
        expect(new Backtick()).to.be.an.instanceof(Backtick);
    });

    it('should instantiates with given data argument', function () {
        expect(new Backtick([1, 2, 3])).to.be.an.instanceof(Backtick);
    });

    it('should instantiates with given options', function () {
        var bt = new Backtick({limit: 27});
        expect(bt.limit).to.be.equal(27);
    });

    it('should push into the data array', function () {
        var bt = new Backtick();
        expect(bt.push(2).push([3, 4]).data).to.be.deep.equal([2, 3, 4]);
    });

    it('should pack the data array', function () {
        var bt = new Backtick(_.range(1, 10), {limit: 3});
        expect(bt.pack()).to.be.deep.equal([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    });

    it('should map the data array', function () {
        var bt = new Backtick(_.range(1, 10));
        var data = bt.map(function (item) {
            return item;
        });
        expect(_.flatten(data)).to.be.deep.equal(_.range(1, 10));
    });

    it('should reduce the data array', function () {
        var bt = new Backtick(_.range(1, 10));
        var data = bt.reduce(function (prev, item) {
            return prev.concat(item);
        }, []);
        expect(data).to.be.deep.equal(_.range(1, 10));
    });

    it('should loop the data array', function () {
        var bt = new Backtick(_.range(1, 10));
        var count = 0;
        bt.forEach(function (item) {
            count++;
        });
        expect(count).to.be.equal(2);
    });

    it('should pop from the array', function () {
        var bt = new Backtick(_.range(1, 10));
        expect(bt.pop()).to.be.deep.equal([8, 9]);
        expect(bt.data).to.be.deep.equal(_.range(1, 7));
    })
});
