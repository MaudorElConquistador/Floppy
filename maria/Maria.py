from openalpr import Alpr
import sys
import cv2
import requests

class Maria:

    def __init__(self):
        self.alpr = Alpr("mx", "/etc/openalpr/openalpr.conf", "/usr/share/openalpr/runtime_data")

        if not self.alpr.is_loaded():
            print("Error loading OpenALPR")
            sys.exit(1)

        self.alpr.set_top_n(3)

    def startWatching(self):
        camera = cv2.VideoCapture(0)
        while True:
            success, img = camera.read()
            cv2.imwrite("./temp.jpg", img)
            results = self.alpr.recognize_file("./temp.jpg")
            if len(results['results']) != 0:
                yield results['results']

    def sendRecognizedPlate(self, plate):
        r = requests.post("http://localhost/maria/recognize-plate/?username=BenjaminGuzman&password=MariaUribe&plate={}".format(plate), auth=("BenjaminGuzman", "MariaUribe"))
        print(r.status_code)