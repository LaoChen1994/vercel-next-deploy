interface IPaintProps {
    context: CanvasRenderingContext2D | null;
}
interface IPosition {
    startX: number;
    startY: number;
    width: number;
    height: number;
}
interface RoundRectProps {
    padding?: number;
    borderRadius?: number | number[];
    borderColor?: string;
    borderWidth?: number;
    position?: IPosition;
}
interface IImageProps {
    url: string;
    dx: number;
    dy: number;
    dw: number;
    dh: number;
}
interface IRoundImage extends IImageProps {
    rect?: Omit<RoundRectProps, 'position'>;
}
interface ITextProps extends Partial<CanvasTextDrawingStyles>, Pick<IPosition, 'startY' | 'startX'> {
    text: string;
    color?: string;
    isStroke?: boolean;
}
interface IMultiTextProps extends ITextProps {
    maxWidth: number;
    maxHeight?: number;
    gap?: number;
}
declare class Paint {
    private context;
    constructor(props: IPaintProps);
    get ctx(): CanvasRenderingContext2D;
    roundRect(props?: RoundRectProps): this;
    fill(color: string): this;
    drawImage(props: IImageProps): Promise<void>;
    drawRoundImage(props: IRoundImage): Promise<void>;
    drawText(props: ITextProps): this;
    drawMultiTexts(props: IMultiTextProps): this;
}
export default Paint;
