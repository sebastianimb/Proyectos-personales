
user = {
    "name": 'Sebastian',
    "age": 28,
    "email": 'sebastian@gmail.com',
    "active": True,
    (19,8, -98.8): 'Valdivia'
}

print(user)

user["email"] = 'Seba@gmail.com'

print(user)

print(user[(19,8, -98.8)])


#values items y keys

print(user.items())
print(user.values())
print(user.keys())

user["country"] = 'Chile'
print(user)