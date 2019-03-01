## SharePoint Modern UI Param Filter

This extension gives the ability to autofill dropdowns based on the current filter params set in the URL.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

* gulp clean
* gulp test
* gulp serve
* gulp bundle --ship
* gulp package-solution --ship
