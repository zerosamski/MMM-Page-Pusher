#Libraries
import RPi.GPIO as GPIO
import time
import json
 
#GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)
 
#set GPIO Pins
GPIO_TRIGGER_LEFT = 23
GPIO_ECHO_LEFT = 24
GPIO_TRIGGER_RIGHT = 20
GPIO_ECHO_RIGHT = 21
 
#set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER_LEFT, GPIO.OUT)
GPIO.setup(GPIO_ECHO_LEFT, GPIO.IN)
GPIO.setup(GPIO_TRIGGER_RIGHT, GPIO.OUT)
GPIO.setup(GPIO_ECHO_RIGHT, GPIO.IN)

def to_node(type, message):
    try:
        print(json.dumps({type: message}))
    except Exception:
        pass

def get_distances():
    left = distance_left()
    right = distance_right()
    result = {
    "left": left,
    "right": right,
    }
    to_node("result", result)

 
def distance_left():
    # set Trigger to HIGH
    GPIO.output(GPIO_TRIGGER_LEFT, True)
 
    # set Trigger after 0.01ms to LOW
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER_LEFT, False)
 
    StartTime = time.time()
    StopTime = time.time()
 
    # save StartTime
    while GPIO.input(GPIO_ECHO_LEFT) == 0:
        StartTime = time.time()
 
    # save time of arrival
    while GPIO.input(GPIO_ECHO_LEFT) == 1:
        StopTime = time.time()
 
    # time difference between start and arrival
    TimeElapsed = StopTime - StartTime
    # multiply with the sonic speed (34300 cm/s)
    # and divide by 2, because there and back
    distance = (TimeElapsed * 34300) / 2
 
    return distance

def distance_right():
    # set Trigger to HIGH
    GPIO.output(GPIO_TRIGGER_RIGHT, True)
 
    # set Trigger after 0.01ms to LOW
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER_RIGHT, False)
 
    StartTime = time.time()
    StopTime = time.time()
 
    # save StartTime
    while GPIO.input(GPIO_ECHO_RIGHT) == 0:
        StartTime = time.time()
 
    # save time of arrival
    while GPIO.input(GPIO_ECHO_RIGHT) == 1:
        StopTime = time.time()
 
    # time difference between start and arrival
    TimeElapsed = StopTime - StartTime
    # multiply with the sonic speed (34300 cm/s)
    # and divide by 2, because there and back
    distance = (TimeElapsed * 34300) / 2
 
    return distance


if __name__ == '__main__':
    to_node("info", 'python script started')
    try:
        while True:
            get_distances()
            time.sleep(1)

        # Reset by pressing CTRL + C
    except KeyboardInterrupt:
        print("Measurement stopped by User")
        GPIO.cleanup()


