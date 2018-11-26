import cv2
from sockets import Socket

def main():
    camera = cv2.VideoCapture(0)
    socket = Socket()
    while True:
        _, frame = camera.read()
        socket.sendImage(frame)



if __name__ == '__main__':
    main()