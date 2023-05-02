/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"c05/zprojecttest_e17_02/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
