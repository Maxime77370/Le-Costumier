<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\User;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;

class OrderController extends AbstractController
{
    private JWTTokenManagerInterface $jwtManager;
    private TokenStorageInterface $tokenStorageInterface;
    public function __construct(TokenStorageInterface $tokenStorageInterface, JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
    }

    #[Route('/api/orders', name: 'app_order', methods: ['GET'])]
    public function getOrders(EntityManagerInterface $entityManager): Response
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $user = $entityManager->getRepository(User::class)->findOneBy([
            'login' => $decodedToken['username'],
        ]);
        $orders = $entityManager->getRepository(Order::class)->findBy([
            'owner' => $user,
        ]);
        return $this->json($orders);
    }

    #[Route('/api/orders/{id}', name: 'app_order_id', methods: ['GET'])]
    public function getOrder(EntityManagerInterface $entityManager, int $id): Response
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $user = $entityManager->getRepository(User::class)->findOneBy([
            'login' => $decodedToken['username'],
        ]);
        $order = $entityManager->getRepository(Order::class)->findOneBy([
            'id' => $id,
            'owner' => $user,
        ]);

        if (!$order) {
            return $this->json(['message' => 'Order not found'], 404);
        }
        return $this->json($order);
    }
}
