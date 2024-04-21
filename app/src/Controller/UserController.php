<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Cart;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserController extends AbstractController
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
        $cart = new Cart();
        $user->setLogin($data['login']);
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);
        $user->setFirstname($data['firstname']);
        $user->setLastname($data['lastname']);
        $user->setRoles(['ROLE_USER']);
        $user->setCart($cart);

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
        $entityManager->flush();

        return new JsonResponse([
            'message'=> 'User registered successfully'
        ], 201);
    }

    #[Route('/api/users', name: 'get_user', methods: ['GET'])]
    public function getUserData(EntityManagerInterface $entityManager): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $user = $entityManager->getRepository(User::class)->findOneBy([
            'login' => $decodedToken['username'],
        ]);
        return new JsonResponse([
            'login' => $user->getLogin(),
            'email' => $user->getEmail(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
        ]);
    }
    #[Route('/api/users', name: 'update_user', methods: ['PUT'])]
    public function updateUser(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $user = $entityManager->getRepository(User::class)->findOneBy([
            'login' => $decodedToken['username'],
        ]);
        // Check if at least one field is submitted
        $requiredFields = ['login', 'email', 'password', 'firstname', 'lastname'];
        $notEmpty = false;
        foreach ($requiredFields as $field) {
            if (isset($data[$field])) {
                $notEmpty = true;
                break;
            }
        }
        if (!$notEmpty) {
            return new JsonResponse([
                'error'=> 'At least one field is required'
            ], 400);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['login'])) {
            $existingUser = $entityManager->getRepository(User::class)->findOneBy([
                'login' => $data['login'],
            ]);
            if ($existingUser) {
                return new JsonResponse([
                    'error'=> 'Login already exists'
                ], 400);
            }
            $user->setLogin($data['login']);
        }
        if (isset($data['email'])) {
            $existingUser = $entityManager->getRepository(User::class)->findOneBy([
                'email' => $data['email'],
            ]);
            if ($existingUser) {
                return new JsonResponse([
                    'error'=> 'Email already exists'
                ], 400);
            }
            $user->setEmail($data['email']);
        }
        if (isset($data['password'])) {
            $user->setPassword($data['password']);
        }
        if (isset($data['firstname'])) {
            $user->setFirstname($data['firstname']);
        }
        if (isset($data['lastname'])) {
            $user->setLastname($data['lastname']);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse([
            'message'=> 'User updated successfully'
        ]);
    }

    #[Route('/api/users', name: 'delete_user', methods: ['DELETE'])]
    public function deleteUser(EntityManagerInterface $entityManager): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $user = $entityManager->getRepository(User::class)->findOneBy([
            'login' => $decodedToken['username'],
        ]);
        if (!$user) {
            return new JsonResponse([
                'error'=> 'User not found'
            ], 404);
        }
        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return new JsonResponse(['error' => 'Cannot delete admin user.'], 403);
        }

        $entityManager->remove($user);
        $entityManager->flush();

        return new JsonResponse([
            'message'=> 'User deleted successfully'
        ]);
    }
}
