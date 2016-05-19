
var Subscribes = [];
function OnSave(ctx) {
    var hasInValid = false;
    for (var i = 0; i < Subscribes.length && !hasInValid; i++) {
        var subscribe = Subscribes[i];
        hasInValid = subscribe();
        if (hasInValid) break;
    }
    if (hasInValid)
        ctx.getEventArgs().preventDefault();
}

function AddSubscribe(subscribe) {
    debugger;
    Subscribes.push(subscribe);
}