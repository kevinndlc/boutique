import data from './products';

export async function seedProducts(collectionName: string) {
  await fetch('https://restapi.fr/api/' + collectionName, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function seed40Products(collectionName: string) {
  await fetch('https://restapi.fr/generator', {
    method: 'POST',
    body: JSON.stringify({
      "times": 40,
      "resourceName": collectionName,
      "title": 'name',
      "image": {
        "type": 'image',
        "theme": 'computer',
        "height": 200,
        "width": 300,
      },
      "price": {
        "type": 'number',
        "range": [800, 2500]
      },
      "category": {
        "type": 'collection',
        "values": ['desktop', 'gamer', 'streaming'],
        "unique": false,
      },
      "description": {
        "type": 'sentence',
        "range": [9, 12],
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
