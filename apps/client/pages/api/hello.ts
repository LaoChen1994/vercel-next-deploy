import { NextApiHandler } from 'next'

const tellHello: NextApiHandler = (_, res) => res.status(200).json({
  body: {
    msg: "hello boy",
  },
})

export default tellHello
