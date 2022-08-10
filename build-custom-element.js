const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/liferay-angular-gallery/runtime.js',
    './dist/liferay-angular-gallery/polyfills.js',
    './dist/liferay-angular-gallery/main.js'
  ];
  await fs.ensureDir('angular-elements-build');
  await fs.removeSync('angular-elements-build/angular-elements.js');
  await concat(files, 'angular-elements-build/angular-elements.js');

  await fs.copy('./src/app/app.component.css', 'angular-elements-build/styles.css');
})();
