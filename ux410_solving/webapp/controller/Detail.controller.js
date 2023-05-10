sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sap.btp.ux400solving.controller.Detail", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched,this)
                //RouteDetail에 해당pattern이 맞으면 onPatternMatched라는 함수를 실행하겠다
                //원래 onInit함수는 처음에 한번만 실행.
            }, 
            _onPatternMatched: function (oEvent) {
                // var oView = this.getView();
                // oEvent.getParameters().arguments; 이거랑 똑같음.
                // console.log(oArgu.aa);//orderID oArgu.bb= ProductID
                // debugger;
                // this.getView().bindElement('/Order_Details(OrderID=10250,ProductID=51)');
                // this.getView().bindElement("/Order_Details(OrderID="+oArgu.aa+",ProductID="+oArgu.bb+")");

                //강사님 코드
                var oView = this.getView(),
                oModel = oView.getModel(); //model을 새로 만드는거
                // debugger;
                var oArgu = oEvent.getParameter("arguments"); //이벤트 객체에 파라미터정보있음
                // ('/Order_Details(OrderID=10250,ProductID=51)'); 를 sBindPath 변수에 담는다
                let sBindPath = oModel.createKey("/Order_Details", {
                    OrderID : oArgu.aa,
                    ProductID : oArgu.bb
                });

                oView.bindElement(sBindPath); //View에다가 기준 데이터 세팅.
                //위 Binding 방법을 Element Binding or Context Binding 이라고 부름

                //방법2
                // oModel.read("/Order_Details",{
                //     success:function(oReturn){
                //         //oReturn안에 조회 데이터 JSON형태로 들어오게됨.
                //         //해당 데이터를 가지고 데이터 가공을 할 수 있음

                //     }
                // });



            },
            onNavButtonPress: function() {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMain", {}, true) ;
            }
        });
    });