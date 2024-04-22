<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\Entity\Category;

class CategoriesFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $categories = ['Costume', 'Pantalon', 'Chemise', 'Chaussures', 'Pull', 'Cravate'];
        $colors = [];
        for ($i = 0; $i < 6; $i++) {
            $red = mt_rand(150, 255);
            $green = mt_rand(150, 255);
            $blue = mt_rand(150, 255);
            $color = sprintf('#%02x%02x%02x', $red, $green, $blue);
            $colors[] = $color;
        }

        for ($i = 0; $i < 6; $i++) {
            $category = new Category();
            $category->setName($categories[$i]);
            $category->setColor($colors[$i]);
            $manager->persist($category);
        }

        $manager->flush();
    }
}