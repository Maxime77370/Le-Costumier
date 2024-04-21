<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\Entity\User;
use App\Entity\Product;
use App\Entity\Cart;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $cart = new Cart();
        $user->setLogin('admin');
        $user->setPassword('admin');
        $user->setEmail('admin@test.com');
        $user->setRoles(['ROLE_ADMIN']);
        $user->setCart($cart);
        $manager->persist($user);
        $manager->persist($cart);

        $cart = new Cart();
        $user = new User();
        $user->setLogin('user');
        $user->setPassword('user');
        $user->setEmail('user@test.com');
        $user->setRoles(['ROLE_USER']);
        $user->setCart($cart);
        $manager->persist($user);
        
        $manager->persist($cart);

        
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
