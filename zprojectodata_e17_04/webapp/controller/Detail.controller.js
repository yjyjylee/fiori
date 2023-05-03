sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("zprojectodatae1704.controller.Detail", {
            onInit: function () {
                //강사님 코드 
                this.getView().setModel(new JSONModel(),"DetailModel")
                //내가 짠 코드
                let datas = {
                    title: {
                        // OrderID : '10247',
                        // City : "yongsan",
                        // Address : "Ichon"
                    }
                };
                this.getView().setModel(new JSONModel(datas), 'Detail');
                //수업시간
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this)
                // //RouteDetail에 해당pattern이 맞으면 onPatternMatched라는 함수를 실행하겠다
            },

            _onPatternMatched: function (oEvent) {
                var oView = this.getView();
                // oEvent.getParameters().arguments; 이거랑 똑같음.
                var oArgu = oEvent.getParameter("arguments");
                var oModel = oView.getModel(); //Northwind Odata Model
                var oFilter = new sap.ui.model.Filter('OrderID', 'EQ', oArgu.key); // filter(필드이름, 조건, 값)
                console.log(oArgu); // { key : 10248 }
                // debugger;
                //내가 짠 코드
                var oDetail = this.getView().getModel('Detail');
                //강사님 코드
                var oDetailModel = this.getView().getModel('DetailModel');

                //GET : /iwfnd/gw_client
                //Orders?$filter=OrderID eq 10248

                this.getView().setBusy(true);

                oModel.read("/Orders", {
                    urlParameters: {
                        '$expand': 'Customer, Employee'
                    },
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
                        oView.setBusy(false);
                        oDetailModel.setProperty("/data",aaa.results[0])
                    }.bind(this),

                    error: function () {
                        oView.setBusy(false);
                        sap.m.MessageToast('에러발생');
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