import RPi.GPIO as GPIO
from time import sleep

class Door:

	def OpenDoor(self):
		try:
			GPIO.setmode(GPIO.BOARD)
			GPIO.setup(7, GPIO.OUT)
			pwm = GPIO.PWM(7, 50)
			pwm.start(7.5)
			
			pwm.ChangeDutyCycle(4.5)
			sleep(1)
			GPIO.cleanup()
		except KeyboardInterrupt:
			pwm.stop()
			GPIO.cleanup()
	
	def CloseDoor(self):
		try:
			GPIO.setmode(GPIO.BOARD)
			GPIO.setup(7, GPIO.OUT)
			pwm = GPIO.PWM(7, 50)
			pwm.start(7.5)
			
			pwm.ChangeDutyCycle(10.5)
			sleep(1)
			GPIO.cleanup()
		except KeyboardInterrupt:
			pwm.stop()
			GPIO.cleanup()
	def Clean():
		GPIO.cleanup()
#fin de esta madrola