import {useEffect, useRef, useState} from "react";
import classNames from "classnames";

interface IBorderProps {
    radius: number;
    width: number;
}

const Poster = () => {
    const ref = useRef<HTMLCanvasElement | null>(null)
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

    const runBorder = (props: IBorderProps) => {

    }

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = el.getContext('2d')
        setCtx(ctx)
    }, [])

    return (
        <div className={classNames(
            'flex flex-col items-center',
            'bg-black w-full h-[100vh]'
        )}>
            <div className="text-white font-bold text-3xl leading-normal">海报绘制测试</div>
            <canvas ref={ref} />
        </div>
    )
}

export default Poster

