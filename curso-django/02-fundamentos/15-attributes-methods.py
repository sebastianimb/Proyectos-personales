
class Person:
    
    species = 'Humano'
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self._energy = 100
        self.__pasword = '123'
        
    def work(self):
        return f'{self.name} esta trabajando duro.'
    
    def _waste_energy(self, quantity):
        self._energy -= quantity
        return self._energy
    
    def __check_password(self):
        if self.__pasword == '123':
            return True
        else:
            return False

person1 = Person('Sebastian', 28)
person2 = Person('Patricio', 42)

print(person1.name)
print(person1._waste_energy(20))
print(person1._Person__check_password())