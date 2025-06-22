
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        
    def work(self):
        return f'{self.name} esta trabajando duro.'

person1 = Person('Sebastian', 28)
person2 = Person('Patricio', 42)

print(person1.name, person2.name)
print(person1.work(), person2.work())