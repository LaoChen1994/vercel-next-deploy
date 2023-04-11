import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import Paint from "../../utils/Paint";
import Head from "next/head";

const PAINTER = {
    width: 400,
    height: 600
}

const Poster = () => {
    const ref = useRef<HTMLCanvasElement | null>(null)
    const [patinter, setPainter] = useState<Paint | null>();

    const runPainter = async () => {
        if (!patinter) { return; }

        await patinter
            .roundRect({
                borderWidth: 2,
                borderRadius: 10,
                borderColor: '#231F2F',
                position: {
                    startX: 0,
                    startY: 0,
                    width: PAINTER.width - 4,
                    height: PAINTER.height - 4
                }
            })
            .fill("#231F2F")
            .drawMultiTexts({
                text: "确定职业目标：首先要确定自己想要从事什么职业，包括职业方向、行业、职位等。" +
                    "准备好求职材料：制作简历、求职信和其他必要的求职材料，以展示自己的技能、经验和能力。" +
                    "寻找招聘信息：可以在招聘网站、社交媒体、人才市场等地方搜索招聘信息。也可以通过个人关系、社交圈子、校友等渠道了解就业机会。" +
                    "申请工作：根据自己的职业目标和招聘信息，逐一申请感兴趣的工作，并按照要求提交求职材料。" +
                    "面试准备：如果被邀请参加面试，需要提前准备，了解公司和职位的背景，准备好回答面试官可能会问到的问题。" +
                    "面试：参加面试时，要保持自信、真诚和积极的态度，展示自己的技能和经验，并问面试官问题。" +
                    "接受工作：如果得到了工作机会，需要和雇主商讨工资待遇和其他细节，并签订合同。",
                maxWidth: PAINTER.width - 40,
                font: "14px serif",
                startX: 20,
                gap: 10,
                startY: 240,
                color: "#ddd"
            })


        await patinter
            .drawRoundImage({
                url: 'https://img01.yzcdn.cn/upload_files/2023/03/31/FlKlHVNMi0tHg9ZOCisl3ipxL8ke.png',
                dx: 4,
                dy: 4,
                dw: PAINTER.width - 8,
                dh: 200,
                rect: {
                    borderRadius: [10, 10, 0, 0],
                    borderWidth: 0
                }
            })

        patinter.drawText({
            text: "这是一个测试文本",
            font: '28px serif',
            startX: 30,
            startY: 50,
            color: '#f44',
            isStroke: true
        })
        .drawText({
            text: "这是一个副标题",
            font: '16px',
            startX: 30,
            startY: 100,
            color: "#000",
        })
        .drawText({
            text: "换行的副标题",
            font: '16px',
            startX: 30,
            startY: 140,
            color: "#000",
        })
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
                'bg-black w-full h-[100vh]',
                'p-3 box-border'
            )}>
                <div className="text-white font-bold text-3xl leading-normal mb-2">海报绘制测试</div>
                <button className={classNames(
                    'bg-white hover:bg-gray-100 text-gray-800 font-semibold',
                    'py-2 px-4 border border-gray-400 rounded shadow',
                    'mb-3'
                )} onClick={runPainter}>点击绘制</button>

                <canvas ref={ref} width={PAINTER.width} height={PAINTER.height} />
            </div>
        </>
    )
}

export default Poster

