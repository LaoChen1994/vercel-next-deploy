import Home from "../components/Home";
import Head from "next/head";

const Index = () => {
    return (
        <>
            <Head>
                <title>佛曰</title>
                <meta name="description" content="年轻人都在玩的解压神器，给你的心灵做个SPA"/>
                <link rel="icon" href="http://rsodxk68s.hd-bkt.clouddn.com/1024.png"/>
            </Head>
            <Home/>
        </>
    )
}

export default Index
