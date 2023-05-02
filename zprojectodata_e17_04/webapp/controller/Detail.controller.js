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
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this)
                // //RouteDetail에 해당pattern이 맞으면 onPatternMatched라는 함수를 실행하겠다
            },

            _onPatternMatched: function (oEvent) {
                // oEvent.getParameters().arguments; 이거랑 똑같음.
                var oArgu = oEvent.getParameter("arguments");
                var oModel = this.getView().getModel(); //Northwind Odata Model
                var oFilter = new sap.ui.model.Filter('OrderID','EQ',oArgu.key); // filter(필드이름, 조건, 값)
                console.log(oArgu); // { key : 10248 }

                oModel.read("/Orders", {
                    filters: [oFilter],
                    success:function(oReturn) {
                        console.log(oReturn.results[0]);
                    }
                });

                console.log("pattern Matched function");
            },

            onNavButtonPress: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMain", {}, true);
                //navTo(1,2,3)
                // 1: Route name
                // 2: parameters
                // 3: Route History Clear
            }
        });
    });