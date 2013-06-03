$(function() {
	$.deck('.slide');

    positioning();
    eventing();

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

function eventing() {
    //noinspection JSCheckFunctionSignatures
    $(document).on("deck.change", function(event, from, to) {
        var obj = $.deck('getSlide', to);
        if (obj.hasClass("event-show-n-hide")) {
            var ref = getRef(obj, "event-ref", findWithinSameSection);
            var refPost = decoratesWithPosition(ref);
            obj.parent().append($('div').css('position', 'absolute'));
        }
    });
}

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
        var ref = getRef(obj, type.name + '-ref', findWithinSameSection);
        if (ref) {
            type.positioning(obj, decoratesWithPosition(ref), getOffset(obj, type));
        }
    });
}

function getOffset(obj, type) {
    var attr = type.name + '-offset';
    return obj.attr(attr) ? parseInt(obj.attr(attr)) : obj.attr('data-offset') ? parseInt(obj.attr('data-offset')) : 10;
}

function getRef(obj, attrRef, refFinder) {
    var ref;
    if (typeof refFinder === 'function') {
        ref = refFinder(obj, obj.attr(attrRef));
    } else {
        ref = obj.find(obj.attr(attrRef));
    }
    if (!ref) return false;
    return ref;
}

function findWithinSameParent(obj, refName) {
    return obj.parent().find(refName);
}

function findWithinSameSection(obj, refName) {
    return obj.closest("section").find(refName);
}

function decoratesWithPosition(ref) {
    return {'left': ref.position().left,
            'top': ref.position().top,
            'right': ref.position().left + ref.width(),
            'bottom': ref.position().top + ref.height(),
            'height': ref.height(),
            'width': ref.width()};
}