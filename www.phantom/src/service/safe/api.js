import auth from './lib/auth';

const api = function() {
    this.authenticate = auth.authenticate;
};

export default new api();