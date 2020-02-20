import auth from './lib/auth';
import nrs from './lib/nrs';
import files from './lib/files';

const api = function() {
    this.authenticate = auth.authenticate;
    this.getCurrentDomain = nrs.getCurrentLocalContainer;
    this.setCurrentDomain = nrs.setCurrentLocalContainer;
    this.getDomains = nrs.getLocalContainers;
    this.createDomain = nrs.createContainer;
    this.setTheme = nrs.setTheme;
    this.getTheme = nrs.getTheme;
    this.createContainer = files.createContainer;
    this.updateFile = files.updateFile;
    this.addPost = files.addPost;
    this.updatePost = files.updatePost;
    this.getPosts = files.getPosts;
    this.getPost = files.getPost;
    this.fetch = files.fetch;
};

export default new api();