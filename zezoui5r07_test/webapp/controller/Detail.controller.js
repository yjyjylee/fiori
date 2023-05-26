sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("zezoui5r07test.controller.Detail", {
            onInit: function () {
                // var sImagePath = "/image/{DetailModel>/data/Pernr}.png";
                // console.log(sImagePath);

    
                this.getView().setModel(new JSONModel(),"DetailModel")
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched,this)
                //RouteDetail에 해당pattern이 맞으면 onPatternMatched라는 함수를 실행하겠다
                //원래 onInit함수는 처음에 한번만 실행.
            }, 
            _onPatternMatched: function (oEvent) {
                // oEvent.getParameters().arguments; 이거랑 똑같음.
                var oModel = this.getView().getModel('Employ');
                var oArgu = oEvent.getParameter("arguments");
                console.log(oArgu.key);
                // debugger;
                var oFilter = new sap.ui.model.Filter('Pernr', 'EQ', oArgu.key);
                var oDetailModel = this.getView().getModel('DetailModel');
                // debugger;
                
                if(_rootPath){
                    this.byId("idImage").setSrc(_rootPath + `/image/${oArgu.key}.png`)
                }
                oModel.read("/zezo_empdepSet", {
                    
                    filters: [oFilter],
                    success: function (oReturn) {
                        // debugger;
                        oDetailModel.setProperty("/data", oReturn.results[0])
                        //여기서 'data' 라는 이름이 만들어짐
                    }.bind(this),

                    error: function () {
                        oView.setBusy(false);
                        sap.m.MessageToast('에러발생');
                    }
                });
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
