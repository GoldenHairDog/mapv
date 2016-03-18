import utilsColorPalette from "../../utils/colorPalette";

function createCircle(radius) {

    var circle = document.createElement('canvas');
    var ctx = circle.getContext('2d');
    var shadowBlur = 13;
    var r2 = radius + shadowBlur;
    var offsetDistance = 10000;

    circle.width = circle.height = r2 * 2;

    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = ctx.shadowOffsetY = offsetDistance;

    ctx.beginPath();
    ctx.arc(r2 - offsetDistance, r2 - offsetDistance, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    return circle;
}

function colorize(pixels, gradient) {

    var maxOpacity = 0.8;
    for (var i = 3, len = pixels.length, j; i < len; i += 4) {
        j = pixels[i] * 4; // get gradient color from opacity value

        if (pixels[i] / 256 > maxOpacity) {
            pixels[i] = 256 * maxOpacity;
        }

        pixels[i - 3] = gradient[j];
        pixels[i - 2] = gradient[j + 1];
        pixels[i - 1] = gradient[j + 2];
    }
}

function draw(ctx, data, options) {
    var max = 30;
    var radius = 13;
    var circle = createCircle(radius);

    data.forEach(function(item) {

        ctx.globalAlpha = item.size / max;
        ctx.drawImage(circle, item.x - circle.width / 2, item.y - circle.height / 2);

    });


    var colored = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    colorize(colored.data, utilsColorPalette.getImageData({
        defaultGradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
    }));
    ctx.putImageData(colored, 0, 0);
}

export default {
    draw: draw
}