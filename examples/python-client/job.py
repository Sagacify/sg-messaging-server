import sys
sys.path.append('./node_modules/sg-messaging-client/connectors')

import importlib
SgMessagingClient = importlib.import_module('sg-messaging-client', None)
sgMessagingClient = SgMessagingClient.sgMessagingClient

def TESTY (data):
	print '\n> testy()'
	print data

	num = data['num']
	return 'hello, ' + str(num)

sgMessagingClient({
	'hello': TESTY
})