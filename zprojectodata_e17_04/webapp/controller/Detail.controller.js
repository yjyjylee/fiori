sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zprojectodatae1704.controller.Detail", {
            onInit: function () {
                // var oRouter = this.getOwnerComponent().getRouter();
                // oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched,this)
                // //RouteDetail에 해당pattern이 맞으면 onPatternMatched라는 함수를 실행하겠다
            }, 
        
            onNavButtonPress: function() {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMain", {}, true) ;
                //navTo(1,2,3)
                // 1: Route name
                // 2: parameters
                // 3: Route History Clear
            }
        });
    });