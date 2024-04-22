<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\Entity\User;
use App\Entity\Cart;

class UserFixtures extends Fixture {

    public function load(ObjectManager $manager): void {
        $user = new User();
        $user->setLogin('admin');
        $user->setPassword('admin');
        $user->setEmail('admin@matué.com');

        $user->setFirstname('Admine');
        $user->setLastname('Matué');
        $user->setRoles(['ROLE_ADMIN']);

        $cart = new Cart();
        $manager->persist($cart);

        $user->setCart($cart);
        $manager->persist($user);

        $user = new User();
        $user->setLogin('user');
        $user->setPassword('test');
        $user->setEmail('user@test.com');

        $user->setFirstname('User');
        $user->setLastname('Test');
        $user->setRoles(['ROLE_USER']);

        $cart = new Cart();
        $manager->persist($cart);

        $user->setCart($cart);
        $manager->persist($user);
    }
}