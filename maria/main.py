from Maria import Maria

def main():
    maria = Maria()
    # esperar a que se encuentre una placa
    for plate in maria.startWatching():
        if plate[0]["confidence"] > 85:
            # enviar al servidor la placa reconocida
            maria.sendRecognizedPlate(plate[0]["plate"])

if __name__ == '__main__':
    main()
