var colsCount = 0;
$(function () {
    debugger;
    colsCount = 0;
    $('#gridBodyTable tr:nth-child(1) td').each(function () {
        if ($(this).attr('colspan')) {
            colsCount += +$(this).attr('colspan');
        } else {
            colsCount++;
        }
    });

    $(".mvs-crm-btn").on("click", function () {

        var trParent = $(this).closest('tr');

        if ($(this).val() == "+") {

            if (trParent.next() != null && trParent.next()[0] != null && trParent.next()[0].id == "s_" + trParent[0].id) {
                $("#s_" + trParent[0].id).show();
            }
            else {
                $('<tr id="s_' + trParent[0].id + '"><td colspan="' + colsCount + '"><IFRAME title="Workplace: Dashboards" src="t.htm" style="BORDER-TOP-STYLE: none; HEIGHT: 100%; WIDTH: 100%; BORDER-BOTTOM-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; DISPLAY: inline" ></IFRAME></td></tr>').insertAfter(trParent);
            } $(this).val("-");
        }
        else {
            $("#s_" + trParent[0].id).hide();
            $(this).val("+");
        }
    });
});

        