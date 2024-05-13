<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\Entity\Category;

class CategoriesFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $jsonData = file_get_contents(__DIR__ . '/categories.json');

        $data = json_decode($jsonData, true);

        foreach ($data as $item) {
            $category = new Category();
            $category->setName($item['name']);
            $category->setColor($item['color']);

            $manager->persist($category);
        }

        $manager->flush();
    }
}