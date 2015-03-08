$(function () {
    $('body').on('click', '.ms-crm-List-Row', function () {
   // $(".ms-crm-List-Row").bind('click', function () {
        $(".ms-crm-List-SelectedRow").removeClass("ms-crm-List-SelectedRow");
        $(this).addClass("ms-crm-List-SelectedRow");
    });
});
