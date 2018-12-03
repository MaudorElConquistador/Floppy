from Maria import Maria
from Maria2 import MariaBack
from MoveServo import Door
from time import sleep
import requests

def main():
    u = 0
    i = 0
    datos = []
    datos2 = []
    maria = Maria()
    maria2 = MariaBack()
    door = Door()
    # esperar a que se encuentre una placa
    for plate in maria.startWatching():
	u = u +1
        if plate[0]["confidence"] > 85:
	    print(plate[0]["plate"])
	    for x in xrange(1,5):
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
        if datos2[3] == datos[2]:
	    print("Cerrar puerta")
            door.CloseDoor()
	    plate = datos[2]
	    r = requests.post("http://192.168.0.10:80/maria/ChangeState1/?username=BenjaminGuzman&password=MariaUribe&plate={}".format(plate), auth=("BenjaminGuzman", "MariaUribe"))
            print(r.status_code)
	    
    """Termina el proceso en la camara 2"""
if __name__ == '__main__':
    main()
