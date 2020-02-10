import auth from './lib/auth';
import nrs from './lib/nrs';

const api = function() {
    this.authenticate = auth.authenticate;
    this.getDomains = nrs.getLocalNRS;
};

export default new api();