import random
import json

productPool = ["Pant", "Shirt", "T-shirt", "Suit", "Tie", "Belt", "Shoes", "Hat"]
genderPool = ["Men", "Women", "Kids"]
matterPool = ["cotton", "silk", "wool", "leather", "polyester", "nylon", "linen"]
typePool = ["Casual", "Formal", "Sport", "Classic", "Elegant"]

def generate_products(nb_products):
    products = []
    for i in range(nb_products):
        product = random.choice(productPool)
        gender = random.choice(genderPool)
        matter = random.choice(matterPool)
        types = random.choice(typePool)
        name = "{} {} in {} for {}".format(types, product, matter, gender)
        
        if name in [product["name"] for product in products]:
            i -= 1
            continue

        products.append({
            "name": name,
            "description": "This is a {0} {1} in {2} for {3}. Really good for {0} situations for {3}.".format(types, product, matter, gender),
            "price": random.randint(10, 1000),
            "photo": "https://placehold.co/512",
            "categories": [
                product.upper(),
                gender.upper(),
                matter.upper(),
                types.upper()
            ]
        })
    return products

random_products = generate_products(300)

with open('products.json', 'w') as file:
    json.dump(random_products, file, indent=4)

categoriesPools = productPool + genderPool + matterPool + typePool
categories = []

for category in categoriesPools:
    categories.append({
        "name": category.upper(),
        "color": "#"+str(hex(random.randint(0, 16777215))[2:])
    })

with open('categories.json', 'w') as file:
    json.dump(categories, file, indent=4)