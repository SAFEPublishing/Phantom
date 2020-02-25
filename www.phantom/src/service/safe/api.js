import auth from './lib/auth';
import nrs from './lib/nrs';
import files from './lib/files';

const api = function() {
    this.getAuthToken = auth.getAuthToken;
    this.authenticate = auth.authenticate;
    this.logout = auth.logout;
    this.getCurrentDomain = nrs.getCurrentLocalContainer;
    this.setCurrentDomain = nrs.setCurrentLocalContainer;
    this.getDomains = nrs.getLocalContainers;
    this.createDomain = nrs.createContainer;
    this.setTheme = nrs.setTheme;
    this.getTheme = nrs.getTheme;
    this.getInstalledThemes = files.getInstalledThemes;
    this.addInstalledTheme = files.addInstalledTheme;
    this.createContainer = files.createContainer;
    this.updateFile = files.updateFile;
    this.addPost = files.addPost;
    this.updatePost = files.updatePost;
    this.getPosts = files.getPosts;
    this.getPost = files.getPost;
    this.fetch = files.fetch;
};

export default new api();