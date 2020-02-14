# Deployment

This directory is geared for this projects own internal use, but can be co-opted for other uses if required.

### Dependencies

_The versions listed here are the current versions we use internally, we don't provide any guarantee for deployment to work on any earlier on later versions._

* [safe_vault _(v0.20.1)_](https://github.com/maidsafe/safe_vault/releases/tag/0.20.1)
* [safe_cli _(v0.8.1)_](https://github.com/maidsafe/safe-api/releases/tag/0.8.1)

All dependencies must be in the system $PATH, such that the binaries are directly accessible, E.G. `shane@example:~/ safe ...` 

### Deployment

To deploy the project to a new public name, run the following command (in a bash environment), replacing `$PUBLIC_NAME` with your desired public name:

`./deploy  $PUBLIC_NAME --create`

If you are deploying to an existing public name, use the following:

`./deploy $PUBLIC_NAME`