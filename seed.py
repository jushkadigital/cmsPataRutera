
import requests

TOKEN = ""


import requests

url = 'http://localhost:3000/api/users/login'  # Reemplaza con tu URL real

payload = {
    "email": "urgosxd@gmail.com",
    "password": "123"
}

headers = {
    "Content-Type": "application/json"
}


try:
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()  # Lanza error si el status code es 4xx o 5xx
    data = response.json()
    print(data['token'])
    TOKEN =data['token'] 
except requests.exceptions.RequestException as err:
    print("Error al hacer login:", err)


print(TOKEN)

BASE_URL = "http://localhost:3000"  # Cambia esto si está en producción

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}

usuarios = [
    
    {
        "email": "dorregaray20@gmail.com",
        "password": "12345",
        "roles": ["admin"]
    }
]

for usuario in usuarios:
    response = requests.post(
        f"{BASE_URL}/api/users",
        headers=HEADERS,
        json=usuario
    )
    print(response.status_code, response.json())