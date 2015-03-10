﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Grid.aspx.cs" Inherits="Grid_Grid" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; CHARSET=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=8" />
    <title></title>
     <asp:PlaceHolder runat="server" ID="ScriptPlaceHolder"></asp:PlaceHolder>
    <script src="scripts/kglobal.js" type="text/javascript"></script>
    <script src="scripts/jquery-1.8.2.js" type="text/javascript"></script>
    <script src="scripts/knockout-2.2.0rc.js" type="text/javascript"></script>
    <script src="scripts/subgrid.js" type="text/javascript"></script>

    <script src="scripts/rowclick.js"></script>
    <script type="text/javascript">
        var vm;
        $(function () {
            load();

        });

        function mockData() {
            var vmData = { schema: [], crmItems: [] };
            var crmItems = [];
            var objItem = { "Id": "2", "Fields": { "ListName": "liior", "MemberCount": 3, "CampaignName": "ddddd" }, "subSrc": "gr.htm?id=2" };
            crmItems.push(objItem);
            var objItem = { "Id": "3", "Fields": { "ListName": "fdfsd", "MemberCount": 4, "CampaignName": "xxx" }, "subSrc": "gr.htm?id=2" };
            crmItems.push(objItem);

            var schema = [];

            var colNameItem = { Name: "", Width: 32, Desc: "", IsDataColumnHeader: false };
            schema.push(colNameItem);

            colNameItem = { Name: "ListName", Width: 100, IsSort: false, SortDsc: false, Desc: "ליאור", IsDataColumnHeader: true };
            schema.push(colNameItem);

            colNameItem = { Name: "MemberCount", Width: 100, IsSort: true, SortDsc: false, Desc: "בבבבבב", IsDataColumnHeader: true };
            schema.push(colNameItem);

            colNameItem = { Name: "CampaignName", Width: 100, IsSort: false, SortDsc: false, Desc: "גגגגגג", IsDataColumnHeader: true };
            schema.push(colNameItem);

            vmData.schema = schema;
            vmData.crmItems = crmItems;
            vmData.settingGridPaging = {};

            vmData.settingGridPaging.sortName = "";
            vmData.settingGridPaging.sortOrder = "";
            vmData.settingGridPaging.startRow = "1";
            vmData.settingGridPaging.lastRow = "11";
            vmData.settingGridPaging.isLastPage = true;
            vmData.settingGridPaging.currentPage = "1";
            vmData.settingGridPaging.maxPerPage = "222";
            vmData.settingGridPaging.maxRows = "4444";
            vmData.isToggle = true;
            // vm = new AppViewModel(vmData);
            // ko.applyBindings(vm);
            vm.crmItems(vmData.crmItems);
            vm.crmSchema(vmData.schema);
            vm.isToggle(vmData.isToggle);
            vm.sortName(vmData.settingGridPaging.sortName);
            vm.sortorder(vmData.settingGridPaging.sortOrder);
            vm.currentPage(vmData.settingGridPaging.currentPage);
            vm.maxPerPage(vmData.settingGridPaging.maxPerPage);
            vm.maxRows(vmData.settingGridPaging.maxRows);
            vm.startRow(vmData.settingGridPaging.startRow);
            vm.lastRow(vmData.settingGridPaging.lastRow);
            vm.isLastPage(vmData.settingGridPaging.isLastPage);
            vm.isLoading(false);
            vm.noData(false);
        }


        function load() {
            debugger;

            var vmData;
            // debugger;
            vmData = { schema: [], crmItems: [], isLoading: true };
            vmData.settingGridPaging = {};

            vmData.settingGridPaging.sortName = "";
            vmData.settingGridPaging.sortOrder = "";
            vmData.settingGridPaging.startRow = "";
            vmData.settingGridPaging.lastRow = "";
            vmData.settingGridPaging.isLastPage = true;
            vmData.settingGridPaging.currentPage = "";
            vmData.settingGridPaging.maxPerPage = "";
            vmData.settingGridPaging.maxRows = "";
            vmData.isToggle = false;

            vm = new AppViewModel(vmData);
            ko.applyBindings(vm);
            setTimeout(function () {
                mockData();
            }, 400);

        }
        function AppViewModel(vmData) {
            debugger;
            var self = this;

            self.crmItems = ko.observableArray(vmData.crmItems);

            self.crmSchema = ko.observableArray(vmData.schema);
            self.isToggle = ko.observable(vmData.isToggle);
            self.sortName = ko.observable(vmData.settingGridPaging.sortName);
            self.sortOrder = ko.observable(vmData.settingGridPaging.sortOrder);
            self.currentPage = ko.observable(vmData.settingGridPaging.currentPage);
            self.maxPerPage = ko.observable(vmData.settingGridPaging.maxPerPage);
            self.maxRows = ko.observable(vmData.settingGridPaging.maxRows);
            self.startRow = ko.observable(vmData.settingGridPaging.startRow);
            self.lastRow = ko.observable(vmData.settingGridPaging.lastRow);
            self.isLastPage = ko.observable(vmData.settingGridPaging.isLastPage);
            self.isLoading = ko.observable(vmData.isLoading);
            self.noData = ko.observable(false);

            self.lastRowCss = ko.computed(function () {
                return self.isLastPage() == true ? "ms-crm-ImageStrip-page_L0" : "ms-crm-ImageStrip-page_L1";
            });
            self.firstRowCss = ko.computed(function () {
                return self.startRow() == 1 ? "ms-crm-ImageStrip-page_R0" : "ms-crm-ImageStrip-page_R1";
            });
            self.getSchema = ko.computed(function () {
                return ko.utils.arrayFilter(self.crmSchema(), function (item) {
                    return item.IsDataColumnHeader == true;
                });
            })
            self.Refresh = function () {
                self.crmItems([]);
                self.noData(false);
                setTimeout(function () {
                    vmData = { schema: [], crmItems: [] };
                    var crmItems = [];
                    var objItem = { "Id": "2", "Fields": { "ListName": "liior", "MemberCount": 3, "CampaignName": "ddddd" }, "subSrc": "gr.htm?id=2" };
                    crmItems.push(objItem);
                    var objItem = { "Id": "3", "Fields": { "ListName": "fdfsd", "MemberCount": 4, "CampaignName": "xxx" }, "subSrc": "gr.htm?id=2" };
                    crmItems.push(objItem);
                    cleanFrames();
                    self.crmItems(crmItems);
                    self.noData(crmItems.length > 0);

                }, 4000);
            }
            self.Sort = function (d) {
                // debugger;
                var schema = [];

                //                var colNameItem = { Name: "", Width: 32, Desc: "", IsDataColumnHeader: false };
                //                schema.push(colNameItem);

                colNameItem = { Name: "ListName", Width: 100, IsSort: false, SortDsc: false, Desc: "xxx", IsDataColumnHeader: true };
                schema.push(colNameItem);

                colNameItem = { Name: "MemberCount", Width: 100, IsSort: true, SortDsc: true, Desc: "zzzz", IsDataColumnHeader: true };
                schema.push(colNameItem);

                colNameItem = { Name: "CampaignName", Width: 100, IsSort: false, SortDsc: false, Desc: "vvv", IsDataColumnHeader: true };
                schema.push(colNameItem);
                self.crmSchema(schema);
                //                if (d.IsSort)
                //                    d.SortDsc = !d.SortDsc;
                //alert(d.Name);

            }
            self.NextPage = function (d) {
                alert('next');
                // debugger;
                // alert(d.Name);
            }
            self.PrevPage = function (d) {
                //  debugger;
                alert('prev');
                //  alert(d.Name);
            }
        }

    </script>
    <link href="crm2013/classicStyle2013/1037/menucore.css" rel="stylesheet" type="text/css" />
    <link href="crm2013/classicStyle2013/1037/fonts.css" rel="stylesheet" type="text/css" />
    <link href="crm2013/classicStyle2013/1037/global.css" rel="stylesheet" type="text/css" />
    <link href="crm2013/classicStyle2013/1037/theme.css" rel="stylesheet" type="text/css" />
    <link href="crm2013/classicStyle2013/1037/controls.css" rel="stylesheet" type="text/css" />
    <link href="crm2013/classicStyle2013/1037/select.css" rel="stylesheet" type="text/css" />
    <link href="crm2013/classicStyle2013/1037/menu.css" rel="stylesheet" type="text/css" />
    <link href="crm2013/classicStyle2013/1037/CompositeControl.css" rel="stylesheet"
        type="text/css" />
    <link href="crm2013/classicStyle2013/1037/appgrid.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="style/site.css" />
</head>
<body class="stage">
<table data-bind="visible: isLoading" style='height:100%;width:100%;background-color:FFFFFF'>
<tr>
	<td style='vertical-align: middle' align='center'>
		<IMG id='loading' alt='' src='_imgs/AdvFind/progress2013.gif'/>
	</td>
</tr>
</table>
    <div   id="crmGrid_visualizationCompositeControl" style="height: 100%;">
        <div id="crmGrid_compositeControl" style="height: 100%; width: 100%; position: relative;">
            <div id="crmGrid_crmGridTD" class="ms-crm-CC-grid-All-0-LR">
                <div class="ms-crm-IE7-Height-Fix-Dummy-Container">
                    <div style="width: 100%; height: 100%; position: relative; overflow: hidden;">
                        <div id="crmGrid" class="ms-crm-ListControl" type="crmGrid">
                            <div class="ms-crm-grid-body" style="bottom: 0px;">
                                <div class="ms-crm-IE7-Height-Fix-Dummy-Container">
                                    <div style="height: 100%; position: relative" id="crmGrid_gridBodyContainer">

                                        <!--start: ms-crm-List-RefreshButton -->
                                        <div id="refreshButton" class="ms-crm-List-RefreshButton">
                                            <a id="refreshButton20131_RefreshButton1" data-bind="click: Refresh">
                                                <img id="grid_refresh" src="_imgs/imagestrips/transparent_spacer2013.gif" class="ms-crm-ImageStrip-grid_refresh"
                                                    style="cursor: pointer" alt="Refresh&#32;list" title="Refresh&#32;list">
                                            </a>
                                        </div>
                                        <!--End: ms-crm-List-RefreshButton -->

                                        <div class="ms-crm-ListArea" style="position: relative">
                                            <div style="height: 22px; overflow-x: hidden;">
                                                <div id="fixedrow" class="ms-crm-ListArea-FixedRow">
                                                    <!--start: ms-crm-List-Header -->
                                                    <table id="crmGrid_gridBar" class="ms-crm-List-Header" cellspacing="0" summary="From each column header, you can sort and filter the records in that column."
                                                        cellpadding="0">
                                                        <colgroup data-bind="foreach: crmSchema" id="crmGrid_gridBarCols">
                                                            <col class="ms-crm-List-DataColumnHeader" data-bind="attr: {  width: Width}">
                                                            <col width="2">
                                                        </colgroup>
                                                        <tbody>
                                                            <tr style="height: 20px" data-bind="foreach: getSchema">
                                                                <!-- ko if: $index() == 0 -->
                                                                <td style="height: 20px; padding: 0px;">
                                                                    <input type="checkbox" class="ms-crm-HeaderCheckBox" id="Checkbox2" tabindex="0"
                                                                        style="" title="Select/clear&#32;all&#32;records&#32;on&#32;this&#32;page">
                                                                </td>
                                                                <td>
                                                                    <img id="bar_line" src="_imgs/imagestrips/transparent_spacer2013.gif" class="ms-crm-ImageStrip-bar_line"
                                                                        alt="">
                                                                </td>
                                                                <!-- /ko -->

                                                                <th scope="col" data-bind="attr: { 'field':Name,'fieldname':Name },css: { 'ms-crm-List-Sortable': IsSort == true}" 
                                                                    entityname="entityname" renderertype="Crm.PrimaryField"  displaylabel="tttttt">
                                                                    <table   data-bind="css: { 'ms-crm-List-Sortable': IsSort == true}" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td data-bind="css: { 'ms-crm-List-Sortable': IsSort == true}">
                                                                                    <a id="sHeaderSorting_repCols_LinkHeaderButton_0" title="Marketing List" data-bind="click: $root.Sort">
                                                                                        <nobr class="ms-crm-DataCell"><span data-bind="text: Desc,css: { 'ms-crm-List-Sortable': IsSort == true}" ></span>
                                                                                         <img  data-bind="css: { 'ms-crm-ImageStrip-dropdown': IsSort == true && SortDsc,'ms-crm-ImageStrip-bar_up' : IsSort == true && !SortDsc }"  src="_imgs/imagestrips/transparent_spacer2013.gif" /></nobr>
                                                                                    </a>
                                                                                </td>
                                                                                <td class="ms-crm-FilterPopupContainerTD">
                                                                                    <table cellspacing="0" cellpadding="0" class="ms-crm-FilterPopupContainer" style="display: none">
                                                                                        <tr>
                                                                                            <td nowrap align="left">
                                                                                                <ul class="ms-crm-MenuBar-Left" style="margin-top: 0px">
                                                                                                    <li class="ms-crm-FilterPopupMenu" tabindex="-1" menu="mnustringFilterPopupcrmGridaccountname"
                                                                                                        id="stringFilterPopupcrmGridListName " relationshipname="" isfromfiltermenu="true"
                                                                                                        isfromrelatedentity="False" filtermenutype="string" gridid="crmGrid" attributetype="nvarchar"
                                                                                                        attributename="ListName" columnname="ListName" entityname="customentityname"
                                                                                                        attributeformat="text">
                                                                                                        <div class="ms-crm-FilterPopupMenu-Label">
                                                                                                            <a href="javascript:void(0)" class="ms-crm-FilterPopupMenu-Label" tabindex="0">
                                                                                                                <div class="ms-crm-Menu-FilterImgWrapper">
                                                                                                                    <img src="_imgs/imagestrips/transparent_spacer2013.gif?ver=-1057465603" alt="" id="mnuDown"
                                                                                                                        class="ms-crm-Menu-ButtonFilter ms-crm-ImageStrip-dropdown">
                                                                                                                </div>
                                                                                                            </a>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </th>

                                                                <td>
                                                                    <img class="ms-crm-List-ResizeBar ms-crm-ImageStrip-resize" alt="" data-bind="attr: { 'id':'crmGrid_resize_'+Name }"
                                                                        src="_imgs/imagestrips/transparent_spacer.gif">
                                                                </td>
                                                                <!-- ko if:  $index() == $parent.getSchema().length-1-->
                                                                <td>
                                                                </td>
                                                                <!-- /ko -->
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--end: ms-crm-List-Header -->
                                                </div>
                                            </div>

                                            <!--start: ms-crm-grid-databodycontainer -->
                                            <div  data-bind="visible: crmItems().length > 0" class="ms-crm-grid-databodycontainer" 
                                            style="top: 22px; bottom: 22px; vertical-align: top">
                                                <div class="ms-crm-IE7-Height-Fix-Dummy-Container">
                                                    <div id="crmGrid_divDataBody" class="ms-crm-List-DataBody">
                                                        <div id="crmGrid_divDataArea" expandable="0" class="ms-crm-List-DataArea">
                                                            <div>
                                                                <table  style="border-bottom-style: none; border-left-style: none; border-collapse: collapse;
                                                                    border-top-style: none; border-right-style: none" id="gridBodyTable" class="ms-crm-List-Data"
                                                                    tabindex="0" border="1" cellspacing="0" summary="This list  50 Item records."
                                                                    cellpadding="1">
                                                                    <!--start: colgroup Body -->
                                                                    <colgroup data-bind="foreach: getSchema">
                                                                        <!-- ko if: $index() == 0 -->
                                                                        <col class="ms-crm-List-CheckBoxColumn" width="18">
                                                                        <col class="ms-crm-List-RowIconColumn" width="16">
                                                                        <!-- /ko -->
                                                                        <col class="ms-crm-List-DataColumn" data-bind="attr: { 'name':Name, width: Width+2} ,css: { 'ms-crm-List-SortedColumn': IsSort == true}" ">
                                                                        <!-- ko if:  $index() == $parent.getSchema().length-1-->
                                                                        <col style="display: none">
                                                                        <col>
                                                                        <!-- /ko -->
                                                                    </colgroup>
                                                                    <!--end: colgroup Body  -->
                                                                    <tbody data-bind="foreach: crmItems">
                                                                        <tr data-bind="attr: { 'id':'row_item_'+Id ,'rowid':Id,'srcSubGrid': subSrc},foreach: $parent.getSchema"
                                                                            class="ms-crm-List-Row">
                                                                            <!-- ko if: $index() == 0 -->
                                                                            <td align="Center" class="ms-crm-List-NonDataCell">
                                                                                <input data-bind="visible: !$root.isToggle" id="checkBox1" class="ms-crm-RowCheckBox"
                                                                                    title="" tabindex="0" value="" type="checkbox">
                                                                                <a data-bind="visible: $root.isToggle" style="cursor: pointer;"><span class="mvs-crm-btn ui-icon ui-icon-plus">
                                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
                                                                            </td>
                                                                            <td align="Center" class="ms-crm-List-DataCell">
                                                                                <img alt="" src="_imgs/ico_16_4400.gif">
                                                                            </td>
                                                                            <!-- /ko -->
                                                                            <td class="ms-crm-List-DataCell inner-grid-cellPadding">
                                                                                <nobr data-bind="text: $parent.Fields[$data.Name]"></nobr>
                                                                            </td>
                                                                            <!-- ko if:  $index() == $parents[1].getSchema().length-1-->
                                                                            <td class="ms-crm-List-DataCell">
                                                                                &nbsp;
                                                                            </td>
                                                                            <!-- /ko -->
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            <div id="divMenu">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--end: ms-crm-grid-databodycontainer -->
                                            <!--start: no data /loading  -->
                                             <div  data-bind="visible: crmItems().length == 0"
                                            style="top: 22px; bottom: 22px; vertical-align: top">
                                               <div id="Div1" class="ms-crm-List-DataBody">
                                                        <div  expandable="0" class="ms-crm-List-DataArea">
                                                            <div style="text-align:center">
                                                                <TABLE  id="loadingContent"  style="border-bottom-style: none; border-left-style: none; border-collapse: collapse;
                                                                    border-top-style: none; border-right-style: none ;" id="gridBodyTable" class="ms-crm-List-Data"
                                                                    tabindex="0" border="1" cellspacing="0" summary="This list  50 Item records."
                                                                    cellpadding="1">
                                                                    <TBODY>
                                                                <TR>
                                                                <TD> <span data-bind="visible: !noData()"  ><IMG alt="Loading..." src="_imgs/AdvFind/progress2013.gif"></span>
                                                                <span data-bind="visible: noData()">אן נתונים</span>
                                                                </TD>
                                                                </TR></TBODY></TABLE>
                                                            </div>
                                                            </div>
                                            </div>
                                            </div>
                                            <!--start: ms-crm-List-StatusBar -->
                                            <div class="ms-crm-List-StatusBar" id="crmGrid_StatusBar">
                                                <div>
                                            <!--   <tr class="ms-crm-List-StatusBar">
                                                        <td>-->
                                                            <table id="gridStatusBarCustom" class="ms-crm-List-StatusBar" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td id="crmGrid_RecordSelectInfoCustom" class="ms-crm-List-StatusBar-Label" nowrap>
                                                                            <span id="crmGrid_FirstItemCustom" data-bind="text: startRow"></span>- <span id="crmGrid_LastItemCustom"
                                                                                data-bind="text: lastRow"></span><span style="display: inline" id="crmGrid_TotalCountInfoCustom">
                                                                                    &nbsp;מתוך <span id="crmGrid_ItemsTotalCustom" data-bind="text: maxRows"></span>
                                                                                </span>
                                                                            <!--<span id="crmGrid_ItemsSelectedInfoCustom">&nbsp;<span id="crmGrid_ItemsSelectedCustom">1</span>  נבחרו</span>-->
                                                                            <span style="visibility: hidden" id="crmGrid_RecordSelectEndMarker">M</span>
                                                                        </td>
                                                                        <td id="crmGrid_PageInfo" class="ms-crm-List-Paging" nowrap>
                                                                            <a style="cursor: auto" id="fastRewind" class="toolbarbutton" disabled tabindex="0"
                                                                                target="_self"><a  class="toolbarbutton" href="#" data-bind="click: PrevPage">

                                                                                    <img  c
                                                                                  
                                                                                     hspace="6" alt="" align="absMiddle" data-bind="css: firstRowCss"
                                                                                        src="_imgs/imagestrips/transparent_spacer.gif" temptooltip="טען עמוד קודם"></a>
                                                                                עמוד<span data-bind="text: currentPage"></span> <a class="toolbarbutton"  data-bind="click: NextPage"
                                                                                     href="#">
                                                                                    <img  data-bind="css: lastRowCss" hspace="6" alt="טען עמוד הבא"
                                                                                        align="absMiddle" src="_imgs/imagestrips/transparent_spacer.gif" temptooltip="Load Next Page"></a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                             <!--    <</td>
                                                 </tr>-->
                                                </div>
                                            </div>
                                            <!--end: ms-crm-List-StatusBar -->
                                      
                                            <!--end: no data /loading  -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="scripts/global.js" type="text/javascript"></script>
    <script type="text/javascript" src='crm2013/js/PageLoader.js'></script>
    <script src="crm2013/js/global.js" type="text/javascript"></script>
    <script src="crm2013/js/ScriptResx.js" type="text/javascript"></script>
    <script src="crm2013/js/entitypropertiesutil.js" type="text/javascript"></script>
    <script src="crm2013/js/stage.js" type="text/javascript"></script>
    <script src="crm2013/js/form.js" type="text/javascript"></script>
    <script src="crm2013/js/select.js" type="text/javascript"></script>
    <script src="crm2013/js/gridcontrol.js" type="text/javascript"></script>
    <script src="crm2013/js/GridFilters.js" type="text/javascript"></script>
    <script src="crm2013/js/action.js" type="text/javascript"></script>
    <script src="scripts/jsload.js" type="text/javascript"></script>
    <script src="crm2013/js/presence.js" type="text/javascript"></script>
</body>
</html>
