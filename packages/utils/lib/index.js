'use strict';

var defaultsDeep = require('lodash/defaultsDeep');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var DEFAULT_BORDER = {
    padding: 0,
    borderRadius: 0,
    borderColor: "#000",
    borderWidth: 6,
    position: {
        startX: 0,
        startY: 0,
        width: 100,
        height: 100
    }
};
var Paint = /** @class */ (function () {
    function Paint(props) {
        var context = props.context;
        if (!context) {
            throw Error('Canvas Context cannot be NULL');
        }
        this.context = context;
    }
    Object.defineProperty(Paint.prototype, "ctx", {
        get: function () {
            return this.context;
        },
        enumerable: false,
        configurable: true
    });
    Paint.prototype.roundRect = function (props) {
        if (props === void 0) { props = {}; }
        var context = this.context;
        var config = defaultsDeep(props, DEFAULT_BORDER);
        var padding = config.padding, borderRadius = config.borderRadius, borderColor = config.borderColor, borderWidth = config.borderWidth, position = config.position;
        var innerBorderRadius;
        if (typeof borderRadius === 'number') {
            innerBorderRadius = Array.from({ length: 4 }).fill(borderRadius);
        }
        else if (Array.isArray(borderRadius)) {
            if (borderRadius.length >= 4) {
                innerBorderRadius = borderRadius.slice(0, 4);
            }
            else if (borderRadius.length === 3) {
                innerBorderRadius = __spreadArray(__spreadArray([], borderRadius, true), [borderRadius[1]], false);
            }
            else if (borderRadius.length === 2) {
                innerBorderRadius = __spreadArray(__spreadArray([], borderRadius, true), borderRadius, true);
            }
            else {
                innerBorderRadius = Array.from({
                    length: 4
                }).fill(borderRadius[0]);
            }
        }
        else {
            innerBorderRadius = [0, 0, 0, 0];
        }
        var offset = padding;
        var startX = position.startX + offset;
        var startY = position.startY + offset;
        var endX = position.startX + position.width - offset;
        var endY = position.startY + position.height - offset;
        context.beginPath();
        context.strokeStyle = borderColor;
        context.lineWidth = borderWidth;
        // top
        context.moveTo(startX + innerBorderRadius[0], startY);
        context.lineTo(endX - innerBorderRadius[1], startY);
        context.arcTo(endX, startY, endX, startY + innerBorderRadius[1], innerBorderRadius[1]);
        // right
        context.lineTo(endX, endY - innerBorderRadius[2]);
        context.arcTo(endX, endY, endX - innerBorderRadius[2], endY, innerBorderRadius[2]);
        // bottom
        context.lineTo(startX + innerBorderRadius[3], endY);
        context.arcTo(startX, endY, startX, endY - innerBorderRadius[3], innerBorderRadius[3]);
        // left
        context.lineTo(startX, startY + innerBorderRadius[0]);
        context.arcTo(startX, startY, startX + innerBorderRadius[0], startY, innerBorderRadius[0]);
        context.stroke();
        return this;
    };
    Paint.prototype.fill = function (color) {
        var context = this.context;
        context.fillStyle = color;
        context.fill();
        return this;
    };
    Paint.prototype.drawImage = function (props) {
        var context = this.context;
        var dx = props.dx, dy = props.dy, dw = props.dw, dh = props.dh, url = props.url;
        return new Promise(function (res) {
            var image = new Image();
            image.src = url;
            image.onload = function () {
                context.drawImage(image, dx, dy, dw, dh);
                res();
            };
        });
    };
    Paint.prototype.drawRoundImage = function (props) {
        var context = this.context;
        var url = props.url, rect = props.rect, dw = props.dw, dh = props.dh, dx = props.dx, dy = props.dy;
        context.save();
        this.roundRect(__assign(__assign({}, rect), { position: {
                startX: dx,
                startY: dy,
                width: dw,
                height: dh
            } }));
        return new Promise(function (res) {
            var image = new Image();
            image.src = url;
            image.onload = function () {
                context.clip();
                context.drawImage(image, dx, dy, dw, dh);
                context.restore();
                res();
            };
        });
    };
    Paint.prototype.drawText = function (props) {
        var startX = props.startX, startY = props.startY, text = props.text, font = props.font, fontKerning = props.fontKerning, textBaseline = props.textBaseline, direction = props.direction, textAlign = props.textAlign, _a = props.color, color = _a === void 0 ? "#000" : _a, isStroke = props.isStroke;
        var ctx = this.ctx;
        ctx.font = font || "18px";
        ctx.fontKerning = fontKerning || 'normal';
        ctx.textBaseline = textBaseline || 'middle';
        ctx.textAlign = textAlign || "left";
        ctx.direction = direction || "inherit";
        if (isStroke) {
            ctx.strokeStyle = color;
            ctx.strokeText(text, startX, startY);
            return this;
        }
        ctx.fillStyle = color;
        ctx.fillText(text, startX, startY);
        return this;
    };
    Paint.prototype.drawMultiTexts = function (props) {
        var _a, _b;
        var text = props.text, startX = props.startX, startY = props.startY, _c = props.gap, gap = _c === void 0 ? 10 : _c, maxWidth = props.maxWidth, maxHeight = props.maxHeight, res = __rest(props, ["text", "startX", "startY", "gap", "maxWidth", "maxHeight"]);
        var ctx = this.ctx;
        if (ctx.measureText(text).width <= maxWidth) {
            // 一行写的下直接写
            this.drawText(__assign({ text: text, startX: startX, startY: startY }, res));
        }
        else {
            var lineText = '';
            var lines = 0;
            var fontSize = +((_b = (_a = (res.font || '').match(/(\d+)px/i)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : 18);
            ctx.font = res.font;
            for (var i = 0; i < text.length; i++) {
                lineText += text[i];
                if (ctx.measureText(lineText).width > maxWidth) {
                    var paintText = lineText.slice(0, lineText.length - 1);
                    var isEnd = false;
                    // 下一行绘制的高度已经超过最大高度了
                    // 那本行就需要展示...
                    if (maxHeight && startY + ((lines + 1) * fontSize + gap) > maxHeight) {
                        paintText = "".concat(lineText.slice(0, lineText.length - 2), "...");
                        isEnd = true;
                    }
                    this.drawText(__assign({ text: paintText, startX: startX, startY: startY + lines * (fontSize + gap) }, res));
                    if (isEnd) {
                        break;
                    }
                    lines += 1;
                    lineText = lineText[lineText.length - 1];
                }
            }
        }
        return this;
    };
    return Paint;
}());

function downloadCanvas() {
    console.log(123);
    return 1;
}

var Save = /*#__PURE__*/Object.freeze({
    __proto__: null,
    downloadCanvas: downloadCanvas
});

exports.Paint = Paint;
exports.Saver = Save;
