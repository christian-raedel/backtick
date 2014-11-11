var Backtick = require('../index')
    , expect = require('chai').expect
    , q      = require('q')
    , _      = require('lodash');

describe('Async', function () {
    it('executes tasks pack-wise #1 (not working)', function (done) {
        this.timeout(0);
        var backtick = new Backtick(_.range(2, 270))
        .reduce(function (prev, pack) {
            var map = _.map(pack, function (item) {
                return q.fcall(function () {
                    console.log('item #%d', item);
                    return item;
                });
            });
            return prev.delay(270).then(q.all.bind(null, map));
        }, q())
        .then(function () {
            console.log('all tasks finished');
            done();
        })
        .catch(done)
        .done();
    });

    it('executes tasks pack-wise #2 (working)', function (done) {
        this.timeout(0);
        var backtick = new Backtick(_.range(2, 270))
        .reduce(function (prev, pack) {
            return prev.delay(270).then(function () {
                var map = _.map(pack, function (item) {
                    return q.fcall(function () {
                        console.log('item #%d', item);
                        return item;
                    });
                });
                return q.all(map);
            });
        }, q([]))
        .then(function () {
            console.log('all tasks finished');
            done();
        })
        .catch(done)
        .done();
    });
});
