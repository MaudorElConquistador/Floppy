from Maria import Maria
from MoveServo import Door
from time import sleep

def main():
    u = 0
    datos = []
    maria = Maria()
    door = Door()
    # esperar a que se encuentre una placa
    for plate in maria.startWatching():
        u = u +1
        if plate[0]["confidence"] > 85:
            # enviar al servidor la placa reconocida
            print(plate[0]["plate"])
            for x in xrange(1,5):
                datos.append(plate[0]["plate"])
                ##maria.sendRecognizedPlate(plate[0]["plate"])
        if u == 5:
            break
    print("Solo aparecera una vez" +str(datos[3]))
    result = maria.sendRecognizedPlate(datos[3])
    print("el resultado " +str(result))
    if result != 0:
        door.OpenDoor()
        door.CloseDoor()
        
if __name__ == '__main__':
    main()
