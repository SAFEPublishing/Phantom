# Contributing

We accept all contributions in the form of pull requests targeted at the master branch. When creating a pull request please include a link to the issue it resolves or implements.

### Dependencies

With regards to the Phantom application, we have as few dependencies as possible. If there is a package which provides some functionality, ask yourself if you could implement it yourself more tersely. Unless it is something _fundamental_ like a routing library, we generally want to create it ourselves.

With regards to the outputted websites, we have zero dependencies, and zero additional dependencies will be tolerated.

Development only dependencies are welcome, since they only impact the local `node_modules` directory.

#### Why? Isn't this just "not invented here" syndrome?

No, it's because the final size of our distributed files is incredibly important. Download speed / download size / the file count can hugely impact performance on the SAFE network. A dependency might only add 3KB of size to the distributed files, but if we can implement it in 2.6KB, you bet your ass we're going to reinvent the wheel.
