import { Product } from 'types/product'

export const fakeProducts: Product[] = [
  {
    id: '1',
    name: 'Costume classique pour homme',
    description: 'Un costume élégant pour toutes les occasions.',
    image:
      'https://img.bestdealplus.com/ae01/kf/S01c781ca9dd24b42ab8c7fce94ff45a9L.jpg',
    price: 150.0,
    categories: [
      {
        id: '1',
        name: 'Costumes',
        image: 'https://via.placeholder.com/200x200.png',
        color: '#000000',
        parentCategory: {
          id: '2',
          name: 'Vêtements',
          image: 'https://via.placeholder.com/200x200.png',
          color: '#000000'
        }
      }
    ]
  },
  {
    id: '2',
    name: 'Pantalon habillé pour homme',
    description: 'Un pantalon élégant pour compléter votre costume.',
    image:
      'https://lechemiseur.fr/data/lechemiseur/pantalon/pantalon-homme-S02-smart-anthracite-porte.jpg',
    price: 80.0,
    categories: [
      {
        id: '3',
        name: 'Pantalons',
        image: 'https://via.placeholder.com/200x200.png',
        color: '#003366',
        parentCategory: {
          id: '2',
          name: 'Vêtements',
          image: 'https://via.placeholder.com/200x200.png',
          color: '#000000'
        }
      }
    ]
  },
  {
    id: '3',
    name: 'Chemise formelle pour homme',
    description: 'Une chemise élégante à assortir avec votre costume.',
    image:
      'https://cdn.shopify.com/s/files/1/0825/8879/5154/files/chemise-casual-blanche_a8343126-554c-4eb2-b704-75633b4d11db.jpg?v=1705624549',
    price: 50.0,
    categories: [
      {
        id: '4',
        name: 'Chemises',
        image: 'https://via.placeholder.com/200x200.png',
        color: '#990000',
        parentCategory: {
          id: '2',
          name: 'Vêtements',
          image: 'https://via.placeholder.com/200x200.png',
          color: '#000000'
        }
      }
    ]
  },
  {
    id: '4',
    name: 'Cravate en soie',
    description: 'Une cravate élégante pour compléter votre tenue.',
    image:
      'https://www.cravate-avenue.com/img/cms/Articles%20mode/satorialime/Photos_satorial/Article_Satorial_description_mode_de_rue_%20(48).jpg',
    price: 30.0,
    categories: [
      {
        id: '5',
        name: 'Accessoires',
        image: 'https://via.placeholder.com/200x200.png',
        color: '#660066',
        parentCategory: {
          id: '6',
          name: 'Accessoires de mode',
          image: 'https://via.placeholder.com/200x200.png',
          color: '#663399'
        }
      }
    ]
  },
  {
    id: '5',
    name: 'Chaussures habillées en cuir',
    description: 'Des chaussures élégantes pour compléter votre look.',
    image:
      'https://img.joomcdn.net/d5051a49e85b7ab6bab8443f39e3778d4ff3e52d_original.jpeg',
    price: 120.0,
    categories: [
      {
        id: '7',
        name: 'Chaussures',
        image: 'https://via.placeholder.com/200x200.png',
        color: '#000066',
        parentCategory: {
          id: '8',
          name: 'Accessoires de mode',
          image: 'https://via.placeholder.com/200x200.png',
          color: '#663399'
        }
      }
    ]
  }
]
