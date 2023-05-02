sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zprojectteste1703.controller.HelloPanel", {
            onInit: function () {

            },
            onHelloPress: function() {

                //     sap.ui.core.Fragment.load({
                //     name:"zprojectteste1703.view.fragment.HelloDialog", //경로
                //     type:"XML", //타입
                //     controller:this
                // }.then(function (oDialog) {
                //     oDialog.open();

                // }));
                
                var oDialog = this.byId("helloDialog"); //없으면 undefined
                // oDialog.open(); //방법2 : HelloPanel.view.xml의 content에 dialog 바로주기

                //방법1 : fragment 따로 만들고, 경로 써주기.
                if(oDialog) {  
                    oDialog.open();
                    return;
                } //if문을 써줘야 버튼 누를때마다 dialog(팝업)이 열림.

                this.loadFragment({
                    name: "zprojectteste1703.view.fragment.HelloDialog"

                }).then(function(oDialog) {
                    oDialog.open();
                }, this);

                
                // 같은 의미 
                // if(oDialog) {  
                //     oDialog.open();
                  
                // } else {

                // this.loadFragment({
                //     name: "zprojectteste1703.view.fragment.HelloDialog"

                // }).then(function(oDialog) {
                //     oDialog.open();
                // }, this);
                // }
                

            },
            onClose: function(oEvent) {
                var oDialog = oEvent.getSource().getParent(); //Dialog

                oDialog.close();
            }
        });
    });
