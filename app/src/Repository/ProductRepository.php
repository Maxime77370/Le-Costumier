<?php

namespace App\Repository;

use App\Entity\Product;
use App\Entity\Category;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 *
 * @method Product|null find($id, $lockMode = null, $lockVersion = null)
 * @method Product|null findOneBy(array $criteria, array $orderBy = null)
 * @method Product[]    findAll()
 * @method Product[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    public function findByName($name) : array {
        return $this->createQueryBuilder('p')
            ->select('p.id')
            ->andWhere('p.name LIKE :name')
            ->setParameter('name', '%' . $name . '%')
            ->getQuery()
            ->getResult();
    }
    public function findAllQuery($field, $order, $limit, $offset, $name, $categories, $maxPrice, $minPrice): array {
        $query = $this->createQueryBuilder('p');
        if ($name) {
            $query->andWhere('LOWER(p.name) LIKE LOWER(:name)')
                ->setParameter('name', '%' . $name . '%');
        }
        if ($field) {
            $query->orderBy('p.' . $field, $order);
        }
        if ($limit) {
            $query->setMaxResults($limit);
        }
        if ($offset) {
            $query->setFirstResult($offset);
        }
        if ($categories) {
            $query->join('p.categories', 'c');
            foreach($categories as $category) {
                $category = strtoupper($category);
                $categoryQuery = $this->getEntityManager()->getRepository(Category::class)->findOneBy(["name" => $category]);
                if (!$categoryQuery) {
                    return [$category];
                }
                $category = $categoryQuery->getId();
                $query->andWhere('c.id = :categories')
                    ->setParameter('categories', $category);
            }
        }
        if ($maxPrice) {
            $query->andWhere('p.price <= :maxPrice')
                ->setParameter('maxPrice', $maxPrice);
        }
        if ($minPrice) {
            $query->andWhere('p.price >= :minPrice')
                ->setParameter('minPrice', $minPrice);
        }

        return $query->getQuery()
            ->getResult();
    }
}
