const DEV = Symbol('development');
const PROD = Symbol('production');

const mode = PROD;

module.exports = {
    mode,
    DEV,
    PROD
}