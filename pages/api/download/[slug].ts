// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { promisify } from 'util';
import * as stream from "stream";
import Fs from 'fs';
import Path from 'path';

import onlyPino from 'pino'

const pipeline = promisify(stream.pipeline);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { slug } = req.query
    if (slug !== 'andriod') {
        res.status(400);
        res.json({ msg: '下载链接不存在' })
    }

    const logger = onlyPino();

    const files = Fs.readdirSync(Path.resolve(__dirname, '..'))

    logger.info('test =>', files)

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=worship.apk');


    await pipeline(
        Fs.createReadStream(Path.resolve(__dirname, '../../download/v1.apk')),
        res
    );

}
