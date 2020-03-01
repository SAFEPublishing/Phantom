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
    this.getThemeConfig = files.getThemeConfig;
    this.setThemeConfig = files.setThemeConfig;
    this.createContainer = files.createContainer;
    this.updateFile = files.updateFile;
    this.updateRawFile = files.updateRawFile;
    this.addGenericDocument = files.addGenericDocument;
    this.updateGenericDocument = files.updateGenericDocument;
    this.getGenericDocuments = files.getGenericDocuments;
    this.getGenericDocument = files.getGenericDocument;
    this.fetch = files.fetch;
};

export default new api();