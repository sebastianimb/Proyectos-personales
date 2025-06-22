#Paranetros
def hello(greet = 'Hello', name = 'Invitado'):
    print(f'{greet}, {name}')

#Argumentos
hello('Hola','Sebastian')
hello()
hello(name='Teddy', greet='Holas')


def big_function(*args,**kwargs):
    print(args)
    print(kwargs)
    return 0

print(big_function(1,2,3,4,5,6,num1=100, num2= 200))