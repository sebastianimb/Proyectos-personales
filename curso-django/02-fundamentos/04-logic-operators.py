#And
age = 28
licensed = True

if age > 18 and licensed:
    print('Puedes manejar')
    
#Or

if age > 18 or licensed:
    print('Eres mayor de edad y puedes tomar el curso de conduccion')
    
    
#not
is_admin = False
if not is_admin:
    print('Acceso denegado')
    
#Short Circuit
name= 'Sebatian'
print(name and name.upper())