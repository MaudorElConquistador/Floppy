(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const socket = io("http://127.0.0.1:8888");
        const drawImageInCanvas = (data) => {
            const img = new Image();
            img.onload = () => {ctx.drawImage(img, 0, 0)};
            img.src = `data:image/png;base64,${data}`;
        };
        socket.on("video stream", drawImageInCanvas);
        const canvas = document.querySelector("canvas");
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext("2d");
    });
})();