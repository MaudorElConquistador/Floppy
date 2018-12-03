from picamera.array import PiRGBArray
from picamera import PiCamera
from openalpr import Alpr
import sys
import cv2
import requests
import time
from Maria import Maria
from Maria2 import MariaBack
from MoveServo import Door

class MariaPrincipal:

	def __init__(self):
    		self.alpr = Alpr("mx", "/etc/openalpr/openalpr.conf", "/usr/share/openalpr/runtime_data")

        	if not self.alpr.is_loaded():
            		print("Error loading OpenALPR")
            		sys.exit(1) 
     		self.alpr.set_top_n(3)
 	def Entrada(self):
	    	u = 0
		i = 0
	        datos = []
		datos2 = []
	        maria = Maria()
	        maria2 = MariaBack()
	        door = Door()
		camera = PiCamera()
	        camera.start_preview()
	        time.sleep(5)
	        rawCapture = PiRGBArray(camera)
	            # grab an image from the camera
	        rawCapture.truncate(0)
	        for filename in camera.capture_continuous("temp.jpg"):
	            results = self.alpr.recognize_file("./temp.jpg")
	            if len(results['results']) != 0:
	                for plate in maria.startWatching():
	                    u = u +1
	                    if plate[0]["confidence"] > 85:
	            	    	print(plate[0]["plate"])
	            	    	for u in urange(1,5):
	            	    		datos.append(plate[0]["plate"])
	            	    if u == 5:
	            	    	break
	                result = maria.sendRecognizedPlate(datos[3]);
	                """Termina el proceso en la camara 1"""
	                if result != 0:
	                    door.OpenDoor()
	                    for plate2 in maria2.startWatchingaBack():
	                    	i = i + 1
	                        if plate2[0]["confidence"] > 85:
	                        	print(plate2[0]["plate"])
	                        	for x in xrange(1,5):
	                            		datos2.append(plate[0]["plate"])
	                    	if i == 5:
	                        	break
	                    	if datos2[3] == result:
	                        	door.CloseDoor()

    	def Salida(self):
	        u = 0
		i = 0
	        datos = []
		datos2 = []
	        maria = Maria()
	        maria2 = MariaBack()
	        door = Door()
	        cap = cv2.VideoCapture(0)
	        while(True):
	            ret, frame = cap.read()
	            filename = "temp2.jpg"
	            time.sleep(5)
	            cv2.imwrite(filename, frame)
	            results = self.alpr.recognize_file("./temp2.jpg")
	            if len(results['results']) != 0:
	                for plate2 in maria2.startWatchingaBack():
	                    i = i + 1
	                    if plate2[0]["confidence"] > 85:
	                	print(plate2[0]["plate"])
	                       	for x in xrange(1,5):
	                		datos2.append(plate[0]["plate"])
	                    if i == 5:
	                        break
	                    if datos2[3] == result:
	                        door.OpenDoor()
	            if cv2.waitKey(1) & 0xFF == ord('q'):
	                break
