import { Product } from 'types/product'
import { Category } from 'types/category'
import { icons } from 'lucide-react'


export const fakeCategories: Category[] = [
  {
    id: '1',
    name: 'Costumes',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#000000',
    subCategories: [],
    icon: icons.Shirt,
    parentCategory: {
      id: '2',
      name: 'Vêtements',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#000000',
      subCategories: [],
      icon: icons.Shirt,
    }
  },
  {
    id: '3',
    name: 'Pantalons',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#003366',
    subCategories: [],
    icon: icons.Shirt,
    parentCategory: {
      id: '2',
      name: 'Vêtements',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#000000',
      subCategories: [],
      icon: icons.Shirt,
    }
  },
  {
    id: '4',
    name: 'Chemises',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#990000',
    subCategories: [],
    icon: icons.Shirt,
    parentCategory: {
      id: '2',
      name: 'Vêtements',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#000000',
      subCategories: [],
      icon: icons.Shirt,

    }
  },
  {
    id: '5',
    name: 'Accessoires',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#660066',
    subCategories: [],
    icon: icons.Shirt,
    parentCategory: {
      icon: icons.Shirt,
      id: '6',
      name: 'Accessoires de mode',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#663399',
      subCategories: [],
    }
  },
  {
    id: '7',
    name: 'Chaussures',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#000066',
    subCategories: [],
    icon: icons.Shirt,
    parentCategory: {
      id: '8',
      name: 'Accessoires de mode',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#663399',
      subCategories: [],
      icon: icons.Shirt,
    }
  },
  {
    id: '9',
    name: 'Laine',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#000066',
    subCategories: [],
    icon : icons.Shirt ,
    parentCategory: {
      id: '10',
      name: 'Matières',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#663399',
      subCategories: [],
      icon : icons.Shirt,
    }
  },
  {
    id: '11',
    name: 'Coton',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#000066',
    subCategories: [],
    icon : icons.Shirt ,
    parentCategory: {
      id: '10',
      name: 'Matières',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#663399',
      subCategories: [],
      icon : icons.Shirt,
    }
  },
  {
    id: '12',
    name: 'Soie',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#000066',
    subCategories: [],
    icon : icons.Shirt ,
    parentCategory: {
      id: '10',
      name: 'Matières',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#663399',
      subCategories: [],
      icon : icons.Shirt,
    }
  },
  {
    id: '13',
    name: 'Homme',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#000066',
    subCategories: [],
    icon: icons.Shirt,
    parentCategory: {
      id: '14',
      name: 'Genre',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#663399',
      subCategories: [],
      icon: icons.PersonStanding,
    }
  },
  {
    id: '15',
    name: 'Femme',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#000066',
    subCategories: [],
    icon: icons.Shirt,
    parentCategory: {
      id: '14',
      name: 'Genre',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#663399',
      subCategories: [],
      icon: icons.PersonStanding,
    }
  },
  {
    id: '16',
    name: 'Enfant',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#000066',
    subCategories: [],
    icon: icons.Shirt,
    parentCategory: {
      id: '14',
      name: 'Genre',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#663399',
      subCategories: [],
      icon: icons.PersonStanding,
    }
  },
  {
    id: '17',
    name: 'Accessoires de mode',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#000066',
    subCategories: [],
    icon: icons.Shirt,
    parentCategory: {
      id: '18',
      name: 'Catégories',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#663399',
      subCategories: [],
      icon: icons.Shirt,
    }
  },
  {
    id: '19',
    name: 'Vêtements',
    image: 'https://via.placeholder.com/200x200.png',
    color: '#000066',
    subCategories: [],
    icon: icons.Shirt,
    parentCategory: {
      id: '18',
      name: 'Catégories',
      image: 'https://via.placeholder.com/200x200.png',
      color: '#663399',
      subCategories: [],
      icon: icons.Shirt,
    }
  }
];

export const fakeProducts: Product[] = [
  {
    id: '1',
    name: 'Costume classique pour homme',
    description: 'Un costume élégant pour toutes les occasions.',
    image:
      'https://img.bestdealplus.com/ae01/kf/S01c781ca9dd24b42ab8c7fce94ff45a9L.jpg',
    price: 150.0,
    categories: [
      fakeCategories.filter((category) => category.name === 'Costumes')[0],
      fakeCategories.filter((category) => category.name === 'Laine')[0],
      fakeCategories.filter((category) => category.name === 'Homme')[0],
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
      fakeCategories.filter((category) => category.name === 'Pantalons')[0],
      fakeCategories.filter((category) => category.name === 'Homme')[0],
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
      fakeCategories.filter((category) => category.name === 'Chemises')[0],
      fakeCategories.filter((category) => category.name === 'Homme')[0],
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
      fakeCategories.filter((category) => category.name === 'Accessoires')[0],
      fakeCategories.filter((category) => category.name === 'Homme')[0],
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
      fakeCategories.filter((category) => category.name === 'Chaussures')[0],
      fakeCategories.filter((category) => category.name === 'Homme')[0],
    ]
  },
  {
    id: '6',
    name: 'Costume en laine pour femme',
    description: 'Un costume élégant pour toutes les occasions.',
    image:
      'https://img4.dhresource.com/webp/m/0x0/f3/albu/km/j/08/5234222e-7789-4bde-938d-826a911e8905.jpg',
    price: 150.0,
    categories: [
      fakeCategories.filter((category) => category.name === 'Costumes')[0],
      fakeCategories.filter((category) => category.name === 'Laine')[0],
      fakeCategories.filter((category) => category.name === 'Femme')[0],
    ]
  },
  {
    id: '7',
    name: 'Pantalon habillé pour femme',
    description: 'Un pantalon élégant pour compléter votre costume.',
    image:
      'https://m.media-amazon.com/images/I/617tvJ5anmL._AC_UF1000,1000_QL80_.jpg',
    price: 80.0,
    categories: [
      fakeCategories.filter((category) => category.name === 'Pantalons')[0],
      fakeCategories.filter((category) => category.name === 'Femme')[0],
    ]
  },
  {
    id: '8',
    name: 'Chemise formelle pour femme',
    description: 'Une chemise élégante à assortir avec votre costume.',
    image:
      'https://m.media-amazon.com/images/I/510oAmtl+4L._AC_UF1000,1000_QL80_.jpg',
    price: 50.0,
    categories: [
      fakeCategories.filter((category) => category.name === 'Chemises')[0],
      fakeCategories.filter((category) => category.name === 'Femme')[0],
    ]
  },
  {
    id: '9',
    name: 'Foulard en soie',
    description: 'Un foulard élégant pour compléter votre tenue.',
    image:
      'https://www.cdiscount.com/pdt2/2/4/3/3/700x700/auc9063573394243/rw/fj545-4-foulard-carre-en-satin-de-soie-de-luxe-po.jpg',
    price: 30.0,
    categories: [
      fakeCategories.filter((category) => category.name === 'Accessoires')[0],
      fakeCategories.filter((category) => category.name === 'Femme')[0],
    ]
  }
]