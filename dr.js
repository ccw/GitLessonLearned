$(function() {
	$.deck('.slide');

    positioning();

    $(window).bind("resize", positioning);
});

var positionTypes = [
    {name: 'halign', positioning: function(obj, ref, offset) { obj.css('left', ref.left + 'px') } },
    {name: 'valign', positioning: function(obj, ref, offset) { obj.css('top', ref.top + 'px') } },
    {name: 'above', positioning: function(obj, ref, offset) { obj.css('top', (ref.top - obj.height() - offset) + 'px') } },
    {name: 'below', positioning: function(obj, ref, offset) { obj.css('top', (ref.bottom + offset) + 'px') } },
    {name: 'ahead', positioning: function(obj, ref, offset) { obj.css('left', (ref.left - obj.width() - offset) + 'px') } },
    {name: 'after', positioning: function(obj, ref, offset) { obj.css('left', (ref.right + offset) + 'px') } }
];

function positioning() {
    var x = $(window).width() / 2;
    var y = $(window).height() / 2;

    $(".hcenter").each(function() {
        $(this).css('left', (x - $(this).width() / 2) + 'px');
    });

    for (var i = 0; i < positionTypes.length; i++) {
        positioningForType(positionTypes[i]);
    }
}

function positioningForType(type) {
    $('.' + type.name + '-to').each(function() {
        var obj = $(this);        
        var ref = getRef(obj, type.name + '-ref');
        if (ref) {
            type.positioning(obj, ref, getOffset(obj, type));
        }
    });
}

function getOffset(obj, type) {
    var attr = type.name + '-offset';
    return obj.attr(attr) ? parseInt(obj.attr(attr)) : obj.attr('data-offset') ? parseInt(obj.attr('data-offset')) : 10;
}

function getRef(obj, attrRef) {
    var ref = obj.parent().find(obj.attr(attrRef)); 
    if (!ref) return false;
    return {'left': ref.position().left,
            'top': ref.position().top,
            'right': ref.position().left + ref.width(),
            'bottom': ref.position().top + ref.height(),
            'height': ref.height(),
            'width': ref.width()};
}