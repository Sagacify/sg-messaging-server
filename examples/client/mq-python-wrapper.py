import zerorpc
import logging
from IPython.core.debugger import Tracer
debug_here = Tracer()
logging.basicConfig()

client = zerorpc.Client(timeout=(1 * 60 * 5))
client.connect('tcp://127.0.0.1:4241')

def provideCommandList (commandNames):

	commands = {}
	commandName = None

	for i in range(len(commandNames)):
		commandName = commandNames[i]
		commands[commandName] = {
			'progress': True
		}

	def responseCommandList (a):
		print '\n> responseCommandList():'
		print commands

		return commands

	return responseCommandList

def main (commands):
	commandNames = commands.keys()
	commands['COMMAND_LIST'] = provideCommandList(commandNames)

	print '\n> main():'
	print commands

	s = zerorpc.Server(commands)
	s.bind('tcp://127.0.0.1:4242')
	s.run()

def TESTY (data):
	print '\n> testy()'
	print data

	num = data['num']
	return 'hello, ' + str(num)

main({
	'hello': TESTY
})
