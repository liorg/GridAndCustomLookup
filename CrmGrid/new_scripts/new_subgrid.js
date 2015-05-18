
var colsCount = 0;
function cleanFrames() {
    $('.mvs-subgrid-row').remove();
}
$(function () {
    //debugger;
    colsCount = 0;
    $('#gridBodyTable tr:nth-child(1) td').each(function () {
        if ($(this).attr('colspan')) {
            colsCount += +$(this).attr('colspan');
        } else {
            colsCount++;
        }
        colsCount = colsCount + defaultCols;
    });
    //dynamic click
    $('body').on('click', '.mvs-crm-btn', function () {
        // $(".mvs-crm-btn").bind('click', function () {
      //  debugger;
        var trParent = $(this).closest('tr');

        //if ($(this).val() == "+") {
        if ($(this).hasClass("ui-icon-plus")) {
            if (trParent.next() != null && trParent.next()[0] != null && trParent.next()[0].id == "s_" + trParent[0].id) {
                $("#s_" + trParent[0].id).show();
            }
            else {
                var sbGridSrc = trParent.attr("srcSubGrid"); //trParent[0].srcSubGrid;
                $('<tr class="mvs-subgrid-row" id="s_' + trParent[0].id + '"><td colspan="' + colsCount + '"><IFRAME title="Workplace: Dashboards" src="' + sbGridSrc + '" class="mvs-subgrid" ></IFRAME></td></tr>').insertAfter(trParent);
            }

            $(this).removeClass("ui-icon-plus").addClass("ui-icon-minus");

            //$(this).val("-");
        }
        else {
            $(this).removeClass("ui-icon-minus").addClass("ui-icon-plus");
            $("#s_" + trParent[0].id).hide();
            // $(this).val("+");

        }
    });
});
