# -*- coding: utf-8 -*-
import socket
import sys
import base64
from io import BytesIO
from PIL import Image

# 46080 -> 640 * 480 * 3 / 20 -> 20 PACKETS

class Socket:

    def __init__(self, IP="127.0.0.1", PORT=5050, BUFFER_SIZE=46080):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            self.socket.connect((IP, PORT))
        except ConnectionRefusedError:
            print("No estás conectado o el servidor no lo está")
            sys.exit(0)

    def sendImage(self, image):
        buffered = BytesIO()
        image = Image.fromarray(image)
        image.save(buffered, format="JPEG")
        self.socket.send(bytes(base64.b64encode(buffered.getvalue()).decode('utf-8').replace('\n', ''), "utf-8"))
