<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Cart;
use App\Entity\Product;

use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CartController extends AbstractController
{
    private JWTTokenManagerInterface $jwtManager;
    private TokenStorageInterface $tokenStorageInterface;

    /*
        * @param TokenStorageInterface $tokenStorageInterface
        * @param JWTTokenManagerInterface $jwtManager
    */
    public function __construct(TokenStorageInterface $tokenStorageInterface, JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
    }
    #[Route('/api/carts', name: 'app_cart', methods: ['GET'])]
    public function getCart(EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $cart = $entityManager->getRepository(User::class)->findOneBy([
            'login' => $decodedToken['username'],
        ])->getCart();
        $jsonCarts = $serializer->serialize($cart, 'json');
        return new JsonResponse($jsonCarts, 200, [], true);
    }

    #[Route('/api/carts/{id}', name: 'app_cart_create', methods: ['PUT'])]
    public function addProductToCart(EntityManagerInterface $entityManager, Product $product): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $user = $entityManager->getRepository(User::class)->findOneBy([
            'login' => $decodedToken['username'],
        ]);
        $cart = $user->getCart();
        $cart->addProduct($product);

        $entityManager->persist($cart);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Product added'], 201);
    }

    #[Route('/api/carts/{id}', name: 'app_cart_delete', methods: ['DELETE'])]
    public function deleteProductFromCart(EntityManagerInterface $entityManager, Product $product): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $user = $entityManager->getRepository(User::class)->findOneBy([
            'login' => $decodedToken['username'],
        ]);
        $cart = $user->getCart();
        $cart->removeProduct($product);

        $entityManager->persist($cart);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Product removed'], 200);
    }
}
