interface IDownloadProps {
    el: HTMLCanvasElement | null;
    type?: 'png' | 'jpeg'
}

export async function downloadCanvas (props: IDownloadProps): Promise<void> {
    const { el, type = 'png' } = props
    if (!el) return;
    if (typeof window === undefined) return;

    const imageData = el.toDataURL(`image/${type}`, 1)
    const downloadLink = document.createElement("a");

    downloadLink.href = imageData;
    downloadLink.download = "post.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
