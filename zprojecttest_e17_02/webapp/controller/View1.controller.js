sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("c05.zprojectteste1702.controller.View1", {
            onInit: function () {

            },
            onEnter: function () {
                // var oInput = this.byId("idInput").getValue();
                // this.byId("idText").setText(oInput);

                this.byId("idText").setText(this.byId("idInput").getValue()); //이렇게 써줘도된다.
            },

            onButtonPress: function () {
                let oSelect = this.byId("idSelect").getSelectedItem(),
                    iNum1 = Number(this.byId("idInput1").getValue()),
                    iNum2 = Number(this.byId("idInput2").getValue()),
                    result = 0;

                //계산기로직작성 oSelect.getKey()
                let sMsg = '';

                debugger;
            

                switch (oSelect.getKey()) {
                    case "plus":
                        result = iNum1 + iNum2;
                        break;
                    case "minus":
                        result = iNum1 - iNum2;
                        break;
                    case "multiple":
                        result = iNum1 * iNum2;
                        break;
                    case "divide":
                        result = iNum1 / iNum2;
                        break;
                    default:
                        break;

                }

                sMsg = `${iNum1} ${oSelect.getText()} ${iNum2} = ${result}`;
                //MessageToast.show(sMsg); //잠깐 떳다가 사라짐.
                MessageBox.show(sMsg, {
                    icon: MessageBox.Icon.INFORMATION,
                    title: "My message box title",
                    actions: [MessageBox.Action.YES],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (oAction) { / * do something * / }
                }); //사용자에게 보여줄 메세지, 객체
            }
        });
    });
