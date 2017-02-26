from os import listdir
from os.path import isfile, join
import glob
import subprocess


def getLength(filename):
  result = float(subprocess.check_output(['ffprobe', '-i', filename, '-show_entries', 'format=duration', '-v', 'quiet', '-of', 'csv=%s' % ("p=0")])) * 1000
  return result

def frameCount(filename):
	path = '/frames/' + filename
	return len(glob.glob1(path,"*.jpg"))


mypath = "../"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

for filename in onlyfiles:

	file = open("/frames/" + filename + "/META", "w")

	print(getLength(mypath + filename))
	file.write("duration : " + str(getLength(mypath + filename)) + "\n" ) 
	print(frameCount(filename))
	file.write("framecount : " + str(frameCount(filename)))

	file.close()

