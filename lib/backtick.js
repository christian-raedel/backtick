var _ = require('lodash');

function Backtick(data, opts) {
    if (_.isArray(data)) {
        this.data = data;
    } else {
        opts = data;
        this.data = [];
    }
    opts = opts || {};
    this.limit = opts.limit || 7;
}

Backtick.prototype.push = function(args) {
    if (_.isArray(args)) {
        this.data = this.data.concat(args);
    } else {
        this.data.push(args);
    }
    return this;
};

Backtick.prototype.pop = function() {
    var packets = this.pack();
    var items = packets.pop();
    this.data = this.data.slice(0, - items.length - 1);
    return items;
};

Backtick.prototype.pack = function(callback) {
    var packets = [];
    for (var i=0; i < this.data.length; i += this.limit) {
        packets.push(this.data.slice(i, i + this.limit));
    }
    if (_.isFunction(callback)) {
        callback(packets);
    }
    return packets;
};

Backtick.prototype.reduce = function(callback, acc, ctx) {
    var packets = this.pack();
    return _.reduce(packets, callback, acc, ctx);
};

Backtick.prototype.map = function(callback, ctx) {
    var packets = this.pack();
    return _.map(packets, callback, ctx);
};

Backtick.prototype.forEach = function(callback, ctx) {
    var packets = this.pack();
    return _.forEach(packets, callback, ctx);
};

Backtick.prototype.each = Backtick.prototype.forEach;

module.exports = Backtick;
