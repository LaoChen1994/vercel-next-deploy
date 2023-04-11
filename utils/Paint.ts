import { defaultsDeep } from 'lodash';

interface IPaintProps {
    context: CanvasRenderingContext2D | null;
    width: number;
    height: number;
}

interface BorderProps {
    padding?: number;
    borderWidth?: number;
}

const DEFAULT_BORDER: BorderProps = {
    padding: 20,
    borderWidth: 20
}

class Paint {
    private context: CanvasRenderingContext2D;
    private width: number;
    private height: number
    constructor(props: IPaintProps) {
        const { width, context, height } = props
        if (!context) {
            throw Error('Canvas Context cannot be NULL')
        }

        this.context = context;
        this.width = width;
        this.height = height
    }

    runOuter(props: BorderProps = {}) {
        const { context } = this;
        const config = defaultsDeep(props, DEFAULT_BORDER) as Required<BorderProps>
        const { padding, borderWidth } = config

        const offset = padding + borderWidth

        const startX = offset;
        const startY = offset;
        const endX = this.width - offset;
        const endY = this.height - offset;

        context.beginPath();
        context.strokeStyle = "white";
        context.lineWidth = 4;

        // top
        context.moveTo(startX + borderWidth, startY);
        context.lineTo(endX - borderWidth, startY);
        context.arcTo(endX, startY, endX, startY + borderWidth, borderWidth)

        // right
        context.lineTo(endX, endY - borderWidth)
        context.arcTo(endX, endY, endX - borderWidth, endY, borderWidth)

        // bottom
        context.lineTo(startX + borderWidth, endY)
        context.arcTo(startX, endY, startX, endY - borderWidth, borderWidth)

        // left
        context.lineTo(startX, startY + borderWidth)
        context.arcTo(startX, startY, startX + borderWidth, startY, borderWidth)

        context.stroke();

        return this
    }

    fill(color: string) {
        const { context } = this

        context.fillStyle = color
        context.fill()
    }
}

export default Paint
