sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/suite/ui/commons/networkgraph/layout/LayeredLayout",
	"sap/suite/ui/commons/networkgraph/layout/ForceBasedLayout",
	"sap/suite/ui/commons/networkgraph/ActionButton",
	"sap/suite/ui/commons/networkgraph/Node",
	"sap/ui/core/Fragment"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (JSONModel, Controller, LayeredLayout, ForceBasedLayout, ActionButton, Node, Fragment) {
		"use strict";

		var GraphController = Controller.extend("zezoui5r07test.controller.Main");

		var STARTING_PROFILE = "10000000";

		GraphController.prototype.onInit = function () {
			
			this.getView().setModel(new JSONModel(),"FilterModel");
			this._oModel = new JSONModel(sap.ui.require.toUrl("zezoui5r07test/graph.json"));
			this._oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

			this._sTopSupervisor = STARTING_PROFILE;
			this._mExplored = [this._sTopSupervisor];

			this._graph = this.byId("graph");
			this.getView().setModel(this._oModel);

		
			this._setFilter();
			
			this._graph.attachEvent("beforeLayouting", function (oEvent) {
				// nodes are not rendered yet (bOutput === false) so their invalidation triggers parent (graph) invalidation
				// which results in multiple unnecessary loading
				this._graph.preventInvalidation(true);
				this._graph.getNodes().forEach(function (oNode) {
					var oExpandButton, oTableButton, oUpOneLevelButton,
						sTeamSize = this._getCustomDataValue(oNode, "team"),
						sSupervisor;

					oNode.removeAllActionButtons();
					//추가
					
					//본부
					
					var oFilterModel = this.getView().getModel('FilterModel');
					var oODataModel = this.getView().getModel('Employ');
					oODataModel.read("/zezo_empdepSet", {
							success: function(oReturn) {
								debugger;
								oFilterModel.setProperty("/emp", oReturn.results.length);
							}.bind(this),
							error: function() {
								sap.m.MessageToast.show('에러 발생');
							}
						});

					//본부
					var oFilter = new sap.ui.model.Filter('Deptcode', 'EQ', 10000000);
					var oFilterModel = this.getView().getModel('FilterModel');
					var oODataModel = this.getView().getModel('Employ');
					oODataModel.read("/zezo_empdepSet", {
							filters: [oFilter],
							success: function(oReturn) {
								debugger;
								oFilterModel.setProperty("/head", oReturn.results.length);
							}.bind(this),
							error: function() {
								sap.m.MessageToast.show('에러 발생');
							}
						});
					
					//영업
					var oFilter = new sap.ui.model.Filter('Deptcode', 'BT', 10001001 , 10001002);
					var oFilterModel = this.getView().getModel('FilterModel');
					var oODataModel = this.getView().getModel('Employ');
					oODataModel.read("/zezo_empdepSet", {
							filters: [oFilter],
							success: function(oReturn) {
								debugger;
								oFilterModel.setProperty("/sales", oReturn.results.length);
							}.bind(this),
							error: function() {
								sap.m.MessageToast.show('에러 발생');
							}
						});
					
					//구매
					var oFilter = new sap.ui.model.Filter('Deptcode', 'BT', 10003001 , 10003002);
					var oFilterModel = this.getView().getModel('FilterModel');
					var oODataModel = this.getView().getModel('Employ');
					oODataModel.read("/zezo_empdepSet", {
							filters: [oFilter],
							success: function(oReturn) {
								debugger;
								oFilterModel.setProperty("/buy", oReturn.results.length);
							}.bind(this),
							error: function() {
								sap.m.MessageToast.show('에러 발생');
							}
						});

					//회계재무
					var oFilter = new sap.ui.model.Filter('Deptcode', 'EQ', 10004001);
					var oFilterModel = this.getView().getModel('FilterModel');
					var oODataModel = this.getView().getModel('Employ');
					oODataModel.read("/zezo_empdepSet", {
							filters: [oFilter],
							success: function(oReturn) {
								debugger;
								oFilterModel.setProperty("/fico", oReturn.results.length);
							}.bind(this),
							error: function() {
								sap.m.MessageToast.show('에러 발생');
							}
						});
					
					//생산
					var oFilter = new sap.ui.model.Filter('Deptcode', 'EQ', 10002001);
					var oFilterModel = this.getView().getModel('FilterModel');
					var oODataModel = this.getView().getModel('Employ');
					oODataModel.read("/zezo_empdepSet", {
							filters: [oFilter],
							success: function(oReturn) {
								debugger;
								oFilterModel.setProperty("/pro", oReturn.results.length);
							}.bind(this),
							error: function() {
								sap.m.MessageToast.show('에러 발생');
							}
						});



					//+, - 버튼
					if (!sTeamSize) {
						// employees without team - hide expand buttons
						oNode.setShowExpandButton(false);
					} else {
						if (this._mExplored.indexOf(oNode.getKey()) === -1) {
							// managers with team but not yet expanded
							// we create custom expand button with dynamic loading
							oNode.setShowExpandButton(false);

							// this renders icon marking collapse status
							oNode.setCollapsed(true);
							oExpandButton = new ActionButton({
								title: "Expand",
								icon: "sap-icon://sys-add",
								press: function () {
									oNode.setCollapsed(false);
									this._loadMore(oNode.getKey());
								}.bind(this)
							});
							oNode.addActionButton(oExpandButton);
						} else {
							// manager with already loaded data - default expand button
							oNode.setShowExpandButton(true);
						}
					}

					// add detail link -> custom popover 
					//사람모양 버튼
					if (!sTeamSize) {
						oTableButton = new ActionButton({
							title: "Detail",
							icon: "sap-icon://person-placeholder",
							press: function (oEvent) {
								this._openTable(oNode, oEvent.getParameter("buttonElement"));
							}.bind(this)
						});
						oNode.addActionButton(oTableButton);
					}

					//본부에는 사람 모양 버튼 줌.
					if (oNode.getKey() === '10000000') {
						oTableButton = new ActionButton({
							title: "Detail",
							icon: "sap-icon://person-placeholder",
							press: function (oEvent) {
								this._openTable(oNode, oEvent.getParameter("buttonElement"));
							}.bind(this)
						});
						oNode.addActionButton(oTableButton)
						
					}
					// // if current user is root we can add 'up one level'
					// if (oNode.getKey() === this._sTopSupervisor) {
					// 	sSupervisor = this._getCustomDataValue(oNode, "supervisor");
					// 	if (sSupervisor) {
					// 		oUpOneLevelButton = new ActionButton({
					// 			title: "Up one level",
					// 			icon: "sap-icon://arrow-top",
					// 			press: function () {
					// 				var aSuperVisors = oNode.getCustomData().filter(function (oData) {
					// 					return oData.getKey() === "supervisor";
					// 				}),
					// 					sSupervisor = aSuperVisors.length > 0 && aSuperVisors[0].getValue();

					// 				this._loadMore(sSupervisor);
					// 				this._sTopSupervisor = sSupervisor;
					// 			}.bind(this)
					// 		});
					// 		oNode.addActionButton(oUpOneLevelButton);
					// 	}
					// }
				}, this);
				this._graph.preventInvalidation(false);
			}.bind(this));
		};

		GraphController.prototype.search = function (oEvent) {
			var sKey = oEvent.getParameter("key");

			if (sKey) {
				this._mExplored = [sKey];
				this._sTopSupervisor = sKey;
				this._graph.destroyAllElements();
				this._setFilter();

				oEvent.bPreventDefault = true;
			}
		};

		GraphController.prototype.suggest = function (oEvent) {
			var aSuggestionItems = [],
				aItems = this._oModel.getData().nodes,
				aFilteredItems = [],
				sTerm = oEvent.getParameter("term");

			sTerm = sTerm ? sTerm : "";

			aFilteredItems = aItems.filter(function (oItem) {
				var sTitle = oItem.title ? oItem.title : "";
				return sTitle.toLowerCase().indexOf(sTerm.toLowerCase()) !== -1;
			});

			aFilteredItems.sort(function (oItem1, oItem2) {

				var sTitle = oItem1.title ? oItem1.title : "";
				return sTitle.localeCompare(oItem2.title);
			}).forEach(function (oItem) {
				// debugger;
				aSuggestionItems.push(new sap.m.SuggestionItem({
					key: oItem.id,
					text: oItem.title 
				}));
			});

			this._graph.setSearchSuggestionItems(aSuggestionItems);
			oEvent.bPreventDefault = true;
		};

		GraphController.prototype.onExit = function () {
			if (this._oQuickView) {
				this._oQuickView.destroy();
			}
		};

		GraphController.prototype._setFilter = function () {
			var aNodesCond = [],
				aLinesCond = [];
			var fnAddBossCondition = function (sBoss) {
				aNodesCond.push(new sap.ui.model.Filter({
					path: 'id',
					operator: sap.ui.model.FilterOperator.EQ,
					value1: sBoss
				}));

				aNodesCond.push(new sap.ui.model.Filter({
					path: 'supervisor',
					operator: sap.ui.model.FilterOperator.EQ,
					value1: sBoss
				}));
			};

			var fnAddLineCondition = function (sLine) {
				aLinesCond.push(new sap.ui.model.Filter({
					path: "from",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: sLine
				}));
			};

			this._mExplored.forEach(function (oItem) {
				fnAddBossCondition(oItem);
				fnAddLineCondition(oItem);
			});

			this._graph.getBinding("nodes").filter(new sap.ui.model.Filter({
				filters: aNodesCond,
				and: false
			}));

			this._graph.getBinding("lines").filter(new sap.ui.model.Filter({
				filters: aLinesCond,
				and: false
			}));
		};

		GraphController.prototype._loadMore = function (sName) {
			this._graph.deselect();
			this._mExplored.push(sName);
			this._graph.destroyAllElements();
			this._setFilter();
		};

		GraphController.prototype._getCustomDataValue = function (oNode, sName) {
			var aItems = oNode.getCustomData().filter(function (oData) {
				return oData.getKey() === sName;
			});

			return aItems.length > 0 && aItems[0].getValue();
		};

		GraphController.prototype.onClose = function () {
			var oDialog = this.byId("idTable");
			oDialog.close();
		};

		GraphController.prototype.aaa = function (oEvent) {
			//***********디테일 페이지로 이동.

			var oRouter = this.getOwnerComponent().getRouter();
			var oFilterModel = this.getView().getModel('FilterModel');
			var sPath = oEvent.getParameters().rowContext.sPath,
				skey = this.getView().getModel('FilterModel').getProperty(sPath);
			
		
			// debugger;
			// console.log(oFilterModel.getProperty(sPath)['Pernr']); //{key: '10248', option: undefined}
			oRouter.navTo("RouteDetail", { "key": oFilterModel.getProperty(sPath)['Pernr'] });
		};

		GraphController.prototype._openTable = function (oNode, oButton) {
			var sDeptKey = oNode.getKey();
			var oFilter = new sap.ui.model.Filter('Deptcode', 'EQ', sDeptKey);
			var oFilterModel = this.getView().getModel('FilterModel');
			var oODataModel = this.getView().getModel('Employ');

			// debugger;
			oODataModel.read("/zezo_empdepSet", {
                    filters: [oFilter],
                    success: function(oReturn) {
                        oFilterModel.setProperty("/data", oReturn.results);
                    }.bind(this),
                    error: function() {
                        sap.m.MessageToast.show('에러 발생');
                    }
                });

			// debugger;
			
			// oDataset.getBinding("items").filter([oFilter]);

			// **********사원 테이블 팝업 */
			
			// console.log(oNode.getKey());
			// debugger;
			// 괄호안에 ("라우트이름", {파라미터 정보})
			var oDialog = this.byId("idTable");
			// debugger;
			//3)한번 열리고 나면 그 때 부터는 if문 탐. controller에 붙여줘서.

			if(!this.oFDialog){
				this.oFDialog = Fragment.load({
					id: this.getView().getId(),
					name : "zezoui5r07test.view.Table",
					type: "XML",
					controller: this});}
	  
			   this.oFDialog.then(function(oDialog){
				   this.getView().addDependent(oDialog);
				   oDialog.open();
			   }.bind(this));
			// if (oDialog) {
			// 	oDialog.open();
			// 	return;
			// }
			// //1)처음에는 여기를 탐. controller에 addDiaglog가 없어서 if문 안탐
			// this.loadFragment({
			// 	name: "zezoui5r07test.view.Table" //name에 경로 지정 폴더안에, 폴더안에 , dialog
			// 	//2)여기서 fragment load하고, this로 controller에 붙여줌.
			// }).then(function (oDialog) {
			// 	oDialog.open();
			// }, this); //this를 사용해서 해당 controller를 같이 넘겨줌.
		},


			// 	var sTeamSize = this._getCustomDataValue(oNode, "team");

			// 	if (!this._oQuickView) {
			// 		Fragment.load({
			// 			name: "orgtest.view.TooltipFragment",
			// 			type: "XML"
			// 		}).then(function(oFragment) {
			// 			this._oQuickView = oFragment;
			// 			this._oQuickView.setModel(new JSONModel({
			// 				icon: oNode.getImage() && oNode.getImage().getProperty("src"),
			// 				title: oNode.getDescription(),
			// 				description: this._getCustomDataValue(oNode, "position"),
			// 				location: this._getCustomDataValue(oNode, "location"),
			// 				showTeam: !!sTeamSize,
			// 				teamSize: sTeamSize,
			// 				email: this._getCustomDataValue(oNode, "email"),
			// 				phone: this._getCustomDataValue(oNode, "phone")
			// 			}));

			// 			setTimeout(function () {
			// 				this._oQuickView.openBy(oButton);
			// 			}.bind(this), 0);
			// 		}.bind(this));
			// 	} else {
			// 		this._oQuickView.setModel(new JSONModel({
			// 			icon: oNode.getImage() && oNode.getImage().getProperty("src"),
			// 			title: oNode.getDescription(),
			// 			description: this._getCustomDataValue(oNode, "position"),
			// 			location: this._getCustomDataValue(oNode, "location"),
			// 			showTeam: !!sTeamSize,
			// 			teamSize: sTeamSize,
			// 			email: this._getCustomDataValue(oNode, "email"),
			// 			phone: this._getCustomDataValue(oNode, "phone")
			// 		}));

			// 		setTimeout(function () {
			// 			this._oQuickView.openBy(oButton);
			// 		}.bind(this), 0);
			// 	}
			// };

			//linePress : 노드 연결하는 선 눌렀을 때 이벤트.
			GraphController.prototype.linePress = function (oEvent) {
				oEvent.bPreventDefault = true;
			};

		return GraphController;
	});
