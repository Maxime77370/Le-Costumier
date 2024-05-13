<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

use App\Entity\Product;
use App\Entity\Category;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Get the JSON data from the file
        $jsonData = file_get_contents(__DIR__ . '/products.json');

        // Decode the JSON data
        $data = json_decode($jsonData, true);

        // Loop through the data and create Product entities
        foreach ($data as $item) {
            $product = new Product();
            $product->setName($item['name']);
            $product->setDescription($item['description']);
            $product->setPhoto($item['photo']);
            $product->setPrice($item['price']);
            
            foreach($item['categories'] as $category) {
                $categoryEntity = $manager->getRepository(Category::class)->findOneBy(['name' => strtoupper($category)]);
                if ($categoryEntity) {
                    $product->addCategory($categoryEntity);
                }
            }

            // Persist the product entity
            $manager->persist($product);
        }

        // Flush the changes to the database
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            CategoriesFixtures::class,
        ];
    }
}