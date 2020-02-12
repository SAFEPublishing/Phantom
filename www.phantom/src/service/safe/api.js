import auth from './lib/auth';
import nrs from './lib/nrs';
import files from './lib/files';

const api = function() {
    this.authenticate = auth.authenticate;
    this.getCurrentDomain = nrs.getCurrentLocalContainer;
    this.setCurrentDomain = nrs.setCurrentLocalContainer;
    this.getDomains = nrs.getLocalContainers;
    this.createDomain = nrs.createContainer;
    this.createContainer = files.createContainer;
    this.getPosts = files.getPosts;
};

export default new api();