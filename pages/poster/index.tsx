import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import Paint from "../../utils/Paint";
import Head from "next/head";

interface IBorderProps {
    radius: number;
    width: number;
}

const PAINTER = {
    width: 400,
    height: 600
}

const Poster = () => {
    const ref = useRef<HTMLCanvasElement | null>(null)
    const [patinter, setPainter] = useState<Paint | null>();

    const runPainter = () => {
        if (!patinter) { return; }
        patinter.runOuter().fill("red")
    }

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const { width, height } = PAINTER

        const ctx = el.getContext('2d')
        const paint = new Paint({
            context: ctx,
            width,
            height
        });

        setPainter(paint)
    }, [])

    return (
        <>
            <Head>
                <title>海报绘制测试</title>
            </Head>
            <div className={classNames(
                'flex flex-col items-center',
                'bg-black w-full h-[100vh]'
            )}>
                <div className="text-white font-bold text-3xl leading-normal mb-2">海报绘制测试</div>
                <button className={classNames(
                    'bg-white hover:bg-gray-100 text-gray-800 font-semibold',
                    'py-2 px-4 border border-gray-400 rounded shadow'
                )} onClick={runPainter}>点击绘制</button>
                <canvas ref={ref} width={PAINTER.width} height={PAINTER.height} />
            </div>
        </>
    )
}

export default Poster

