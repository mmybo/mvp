module.exports = {
    'ifEquals': (val1, val2, opts) => {
        return (String(val1) == String(val2)) ? opts.fn(this) : opts.inverse(this);
    }
}