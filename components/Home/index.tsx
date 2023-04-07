import type { NextPage } from 'next'
import classNames from "classnames";

interface IDownloadProps {
    title: string;
    type: string;
    content: string;
}

const downloadList = [
    {
        title: '安卓下载',
        type: 'link',
        content: '/download/v1.apk'
    },
    {
        title: '苹果下载',
        type: 'link',
        content: 'https://apps.apple.com/cn/app/%E4%BD%9B%E6%9B%B0-%E5%B9%B4%E8%BD%BB%E4%BA%BA%E9%83%BD%E5%9C%A8%E7%94%A8%E7%9A%84%E5%87%8F%E5%8E%8B%E7%A5%9E%E5%99%A8-%E7%BB%99%E4%BD%A0%E7%9A%84%E7%81%B5%E9%AD%82%E5%81%9A%E4%B8%AAspa/id6446897546'
    }
]

const Home: NextPage = () => {

    return (
        <div className="flex flex-col justify-center items-center bg-black w-[100vw] h-[100vh]">
            <h1 className={classNames(
                "text-white font-bold whitespace-break-spaces",
                'leading-normal text-8xl md:leading-loose md:text-9xl',
                'flex-auto text-center leading-loose',
                'flex items-center justify-center'
            )}>
                {"佛\n曰"}
            </h1>

            <div className={classNames(
                'flex items-center justify-center',
                'h-[200px] md:h-[300px]'
            )}>
                {downloadList.map(item => (
                    <a
                        key={item.title}
                        href={item.content}
                        target="_blank"
                        className="text-white text-2xl mr-3.5 last:mr-0"
                    >
                        {item.title}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Home
