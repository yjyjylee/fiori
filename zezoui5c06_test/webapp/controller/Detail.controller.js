sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("zezoui5c06test.controller.Detail", {
            onInit: function () {
                this.getView().setModel(new JSONModel(),"DetailModel")
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("Detail").attachPatternMatched(this._onPatternMatched, this)
            },
            handleClose: function(){
                this.oRouter = this.getOwnerComponent().getRouter();
			    this.oModel = this.getOwnerComponent().getModel();
                // debugger;
                var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
			    this.oRouter.navTo("RouteMain", {layout: sNextLayout});
            },
            //delflag 업데이트
            delete : function(){
                this.oModel = this.getOwnerComponent().getModel();
                // debugger;
                var oDetailModel = this.getView().getModel('DetailModel');
                let jsonData = oDetailModel.getProperty("/data");

                if(jsonData.Delflag === 'X'){
                    jsonData.Delflag =''
                    oDetailModel.setProperty('/data/Delflag','');
                }
                else if(jsonData.Delflag === ''){
                    jsonData.Delflag = 'X'
                    oDetailModel.setProperty('/data/Delflag','X');
                };

                // debugger; //let oData = this.oMainModel.getData();이거랑 똑같음
                let sFullPath = this.oModel.createKey("/zezo_bpSet", {
                    Bpcode :  jsonData.Bpcode
                });

                this.oModel.update(sFullPath, jsonData, {
                    success : function(rrr) {
                        sap.m.MessageToast.show("거래상태가 변경되었습니다");
                    }.bind(this)
                });
                
            },

            _onPatternMatched: function (oEvent) {
                var oView = this.getView();
                // oEvent.getParameters().arguments; 이거랑 똑같음.
                var oArgu = oEvent.getParameter("arguments");           
                var oModel = oView.getModel(); //Northwind Odata Model
                var oFilter = new sap.ui.model.Filter('Bpcode', 'EQ', oArgu.key); // filter(필드이름, 조건, 값)
                // console.log(oArgu); // { key : 10248 }
                //강사님 코드
                var oDetailModel = this.getView().getModel('DetailModel');
                // debugger;
                oModel.read("/zezo_bpSet", {
                    filters: [oFilter],
                    //내가 짠 코드
                    // success: function (oReturn) {
                    //     debugger;
                    //     console.log(oReturn.results[0]);
                    //     oDetail.setProperty("/title/OrderID",oReturn.results[0]['OrderID'])
                    //     oDetail.setProperty("/title/City", oReturn.results[0]['Customer']['City']);
                    //     oDetail.setProperty("/title/Address", oReturn.results[0]['Employee']['Address']);
                    // },
                    //강사님 코드
                    success: function (aaa) {
                        // debugger;
                        oView.setBusy(false);
                        oDetailModel.setProperty("/data",aaa.results[0])
                        //여기서 'data' 라는 이름이 만들어짐
                    }.bind(this),

                    error: function () {
                        oView.setBusy(false);
                        sap.m.MessageToast('에러발생');
                    }
                });

                // console.log("pattern Matched function");
            },
        });
    });
