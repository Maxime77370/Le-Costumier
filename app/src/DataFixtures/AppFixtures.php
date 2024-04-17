<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\Entity\User;
use App\Entity\Product;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setLogin('admin');
        $user->setPassword('admin');
        $user->setEmail('admin@test.com');
        $user->setRoles(['ROLE_ADMIN']);
        $manager->persist($user);

        $user = new User();
        $user->setLogin('user');
        $user->setPassword('user');
        $user->setEmail('user@test.com');
        $user->setRoles(['ROLE_USER']);
        $manager->persist($user);
        
        for ($i = 0; $i < 10; $i++) {
            $product = new Product();
            $product->setName('Product ' . ($i + 1));
            $product->setDescription('Description for product ' . ($i + 1));
            $product->setPhoto("https://picsum.photos/200");
            $product->setPrice(rand(10, 100));
            $manager->persist($product);
        }

        $manager->flush();
    }
}
