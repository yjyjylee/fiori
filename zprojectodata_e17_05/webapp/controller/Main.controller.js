sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("zprojectodatae1705.controller.Main", {
            onInit: function () {
                this.getView().setModel(new JSONModel(), "main");

                this._defaultSet();
            },
            _defaultSet: function () {
                //odata model 변수 세팅
                this.oModel = this.getOwnerComponent().getModel();
                //json model 변수 세팅
                this.oMainModel = this.getView().getModel("main");
                //table 객체
                this.oTable = this.byId("idTable");
            },


            onCreate: function () {
                let oData = this.oMainModel.getData();

                oData.Productno =  Number(oData.Productno);

                //create("path", odata,Parameters)
                this.oModel.create("/Products", oData, {
                    success : function() {
                        sap.m.MessageToast.show("Create Success!");
                    },
                    error : function() {
                        sap.m.MessageToast.show("Error!");
                    }
                }); 
            },
            onUpdate: function () {
                let jsonData = this.oMainModel.getProperty("/"); //let oData = this.oMainModel.getData();이거랑 똑같음
                let sFullPath = this.oModel.createKey("/Products", {
                    Productno :  jsonData.Productno
                });
                debugger;
                //sFullPath => "/Products(Productno=111, ab=123)" 문자열 형태로 들어감. (ab=~~ -> 이건 키 여러개 줄때~)
                //key값을 메소드 쓰지 않고 "/Products(Productno="+변수+", ab="+변수+")" 이런식으로 써도 된다
                this.oModel.update(sFullPath, jsonData, {
                    success : function() {
                        sap.m.MessageToast.show("변경완.");
                    }
                });
            },
            onDelete: function () {
                let index = this.oMainModel.getProperty("/Productno");
                let sFullPath = this.oModel.createKey("/Products", {
                    Productno : Number(index)
                }); //("/Products(2)") 랑 똑같음.
                this.oModel.remove(sFullPath, {
                    success : function() {
                        sap.m.MessageToast.show("삭제되었슈");
                    }
                });
            },
            onReadEntity: function () {
                let index = this.oTable.getSelectedIndex();
                let sPath = this.oTable.getContextByIndex(index).getPath();

                // let sFullPath = this.oModel.createKey("/Products", {
                //     Productno : 2
                // }) //("/Products(2)") 랑 똑같음.

                this.oModel.read(sPath, {
                    success : function(oReturn) {
                        // this.byId("no").setValue(oReturn.Productno);
                        console.log("READ : ", oReturn);
                        this.oMainModel.setProperty("/", oReturn);
                        // this.oMainModel.setDate(oReturn); 이것도 가능
                    }.bind(this), //bind써줘서 this가 controller가 됨
                });
                
            }
        });
    });
