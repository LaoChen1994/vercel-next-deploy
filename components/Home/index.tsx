import type { NextPage } from 'next'
import classNames from "classnames";

const Home: NextPage = () => {
    return (
        <div className="flex flex-row justify-center items-center bg-black w-[100vw] h-[100vh]">
            <h1 className={classNames(
                "text-white font-bold whitespace-break-spaces",
                'leading-normal text-8xl md:leading-loose md:text-9xl'
            )}>
                {"佛\n曰"}
            </h1>
        </div>
    )
}

export default Home
