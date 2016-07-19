/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Vorarbeiten fuer Unit-Tests
 * - Karma kann zurzeit nur ES5 Tests ausfuehren, mit folgendem Code
 *   werden die *.spec.js Dateien geladen und transpiled.
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import 'angular';
import 'angular-mocks';

let context = require.context('./src/app', true, /\.spec\.js/);
context.keys().forEach(context);

//# sourceMappingURL=spec.bundle.js.map