from openalpr import Alpr
import sys
import cv2
import numpy as np
import requests
import time

class MariaBack:

    def __init__(self):
        self.alpr = Alpr("mx", "/etc/openalpr/openalpr.conf", "/usr/share/openalpr/runtime_data")

        if not self.alpr.is_loaded():
            print("Error loading OpenALPR")
            sys.exit(1)

        self.alpr.set_top_n(3)

    def startWatchingaBack(self):
        cap = cv2.VideoCapture(0)
        while(True):
            ret, frame = cap.read()
            filename = "temp2.jpg"
            time.sleep(5)
            cv2.imwrite(filename, frame)
            results = self.alpr.recognize_file("./temp2.jpg")
            if len(results['results']) != 0:
                yield results['results']
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    def sendRecognizedPlateBack(self, plate):
        r = requests.post("http://192.168.0.10:80/maria/recognize-plate/?username=BenjaminGuzman&password=MariaUribe&plate={}".format(plate), auth=("BenjaminGuzman", "MariaUribe"))
        print(r.status_code)
	print("Esta es la respuesta del servido "+str(r.text))
        if r.text != "true":
            return 0
        return 1
