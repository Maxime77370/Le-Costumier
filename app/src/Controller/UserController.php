<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Cart;
use Doctrine\ORM\EntityManagerInterface;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    #[Route('/api/register', name: 'register_user', methods: ['POST'])]
    public function registerUser(Request $request, ValidatorInterface $validator, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validate the required fields
        $requiredFields = ['login', 'email', 'password', 'firstname', 'lastname'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                return new JsonResponse([
                    'error'=> sprintf('Missing required field: %s', $field)
                ], 400);
            }
        }
        // Check if email already exists
        $existingUser = $entityManager->getRepository(User::class)->findOneBy([
            'email' => $data['email'],
        ]);

        if ($existingUser) {
            return new JsonResponse([
                'error'=> 'Email already exists'
            ], 400);
        }

        // Check if login already exists
        $existingUser = $entityManager->getRepository(User::class)->findOneBy([
            'login' => $data['login'],
        ]);

        if ($existingUser) {
            return new JsonResponse([
                'error'=> 'Login already exists'
            ], 400);
        }


        // Create and persist the user entity
        $user = new User();
        $user->setLogin($data['login']);
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);
        $user->setFirstname($data['firstname']);
        $user->setLastname($data['lastname']);

        // Validate the user entity
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            // Handle validation errors
            return new JsonResponse([
                'error'=> 'Validation errors'
            ], 400);
        }

        // Persist the user entity
        $entityManager->persist($user);

        $cart = new Cart();
        $cart->setOwner($user);
        $entityManager->persist($cart);

        $entityManager->flush();

        return new JsonResponse([
            'message'=> 'User registered successfully'
        ], 201);
    }
}
