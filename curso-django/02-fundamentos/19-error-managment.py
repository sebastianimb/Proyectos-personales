def divide_numbers():
    
    try:
        a = int(input('Ingrese el numerador: '))
        b = int(input('Ingrese el denominador: '))
        result = a/b
    except ValueError:
        print('Ingresa solo numeros')
    except ZeroDivisionError:
        print('No se puede dividir entre 0')
    except Exception as error:
        print(type(error))
    else:
        print(result)
        return result
    finally:
        print('Adios')

divide_numbers()

    