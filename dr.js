$(function() {
	$.deck('.slide');

    positioning();

    $(window).bind("resize", positioning);
});

function positioning() {
    var x = $(window).width() / 2;
    var y = $(window).height() / 2;

    $(".hcenter").each(function() {
        $(this).css('left', (x - $(this).width() / 2) + 'px');
    });
    $(".below-to").each(function() {
        var ref = getRefPos($(this), "below-ref");
        if (ref) {
            $(this).css('top', (ref.bottom + 10) + 'px');
        }
    });
    $(".ahead-to").each(function() {
        var ref = getRefPos($(this), "ahead-ref");
        if (ref) {
            $(this).css('left', (ref.left - $(this).width() - 10) + 'px');
        }
    });
    $(".after-to").each(function() {
        var ref = getRefPos($(this), "after-ref");
        if (ref) {
            $(this).css('left', (ref.right + 10) + 'px');
        }
    });
}

function getRefPos(obj, attrRef) {
    var ref = obj.parent().find(obj.attr(attrRef)); 
    if (!ref) return false;
    return {'left': ref.position().left,
            'top': ref.position().top,
            'right': ref.position().left + ref.width(),
            'bottom': ref.position().top + ref.height(),
            'height': ref.height(),
            'width': ref.width()};
}