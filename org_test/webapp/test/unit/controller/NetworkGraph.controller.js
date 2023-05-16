/*global QUnit*/

sap.ui.define([
	"org_test/controller/NetworkGraph.controller"
], function (Controller) {
	"use strict";

	QUnit.module("NetworkGraph Controller");

	QUnit.test("I should test the NetworkGraph controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
