import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Head from "next/head";

import QRCode from 'qrcode';
import { Paint, Saver } from "pd-worship-utils";

const PAINTER = {
  width: 400,
  height: 600,
}

const Poster = () => {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const [patinter, setPainter] = useState<Paint | null>();

  const generateQRCode = (url: string): Promise<string> => new Promise((res, rej) => {
    QRCode.toDataURL(url, {
      type: "image/jpeg",
      margin: 2,
      width: 300,
    }, (err, qrBase64) => {
      if (err) {
        rej(err)
      }
      res(qrBase64)
    })
  })

  const runPainter = async () => {
    if (!patinter) {
      return;
    }

    await patinter
      .roundRect({
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#231F2F',
        position: {
          startX: 0,
          startY: 0,
          width: PAINTER.width - 4,
          height: PAINTER.height - 4,
        },
      })
      .fill("#231F2F")
      .drawRoundImage({
        url: '/header.png',
        dx: 0,
        dy: 0,
        dw: PAINTER.width - 4,
        dh: 200,
        rect: {
          borderRadius: [10, 10, 0, 0],
          borderWidth: 0,
          borderColor: 'transparent',
        },
      })

    patinter
      .drawMultiTexts({
        text: "确定职业目标：首先要确定自己想要从事什么职业，包括职业方向、行业、职位等。"
                    + "准备好求职材料：制作简历、求职信和其他必要的求职材料，以展示自己的技能、经验和能力。"
                    + "寻找招聘信息：可以在招聘网站、社交媒体、人才市场等地方搜索招聘信息。也可以通过个人关系、社交圈子、校友等渠道了解就业机会。"
                    + "申请工作：根据自己的职业目标和招聘信息，逐一申请感兴趣的工作，并按照要求提交求职材料。"
                    + "面试准备：如果被邀请参加面试，需要提前准备，了解公司和职位的背景，准备好回答面试官可能会问到的问题。"
                    + "面试：参加面试时，要保持自信、真诚和积极的态度，展示自己的技能和经验，并问面试官问题。"
                    + "接受工作：如果得到了工作机会，需要和雇主商讨工资待遇和其他细节，并签订合同。",
        maxWidth: PAINTER.width - 40,
        font: "14px serif",
        startX: 20,
        gap: 10,
        startY: 240,
        color: "#ddd",
        maxHeight: 500,
      })
      .drawText({
        text: '"我要如何找到工作？"',
        font: '16px serif',
        startX: 30,
        startY: 80,
        color: '#fff',
      })
      .drawText({
        text: "佛曰：",
        font: '36px serif',
        startX: 30,
        startY: 150,
        color: "#fff",
      })

    const code = await generateQRCode("https://www.youzan.com");

    patinter.drawImage({
      url: code,
      dx: PAINTER.width - 110,
      dy: 100,
      dw: 80,
      dh: 80,
    })
  }

  const saveImage = async () => {
    if (Saver.downloadCanvas()) {
      return
    }
    const el = ref.current;

    if (!el) return;

    const imageData = el.toDataURL("image/png", 1)
    const downloadLink = document.createElement("a");

    downloadLink.href = imageData;
    downloadLink.download = "post.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = el.getContext('2d')
    const paint = new Paint({
      context: ctx,
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
        'p-3 box-border',
      )}
      >
        <div className="text-white font-bold text-3xl leading-normal mb-2">海报绘制测试</div>
        <div className="flex justify-center items-center">
          <button
            className={classNames(
              'bg-white hover:bg-gray-100 text-gray-800 font-semibold',
              'py-2 px-4 border border-gray-400 rounded shadow',
              'mb-3 mr-3',
            )}
            type="button"
            onClick={runPainter}
          >
            点击绘制
          </button>

          <button
            className={classNames(
              'bg-white hover:bg-gray-100 text-gray-800 font-semibold',
              'py-2 px-4 border border-gray-400 rounded shadow',
              'mb-3',
            )}
            onClick={saveImage}
            type="button"
          >
            点击下载
          </button>
        </div>

        <canvas ref={ref} width={PAINTER.width} height={PAINTER.height} />
      </div>
    </>
  )
}

export default Poster
