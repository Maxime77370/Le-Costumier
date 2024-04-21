<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Category;

use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\SerializerInterface;

class CategoryController extends AbstractController
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

    #[Route('/api/categories', name: 'app_category', methods: ['GET'])]
    public function getCategory(EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $categories = $entityManager->getRepository(Category::class)->findAll();
        $jsonCategories = $serializer->serialize($categories, 'json');
        return new JsonResponse($jsonCategories, 200, [], true);
    }

    #[Route('/api/categories/{id}', name: 'app_category_show', methods: ['GET'])]
    public function getCategoryById(Category $category, SerializerInterface $serializer): JsonResponse
    {
        if (!$category) {
            return new JsonResponse(['error' => 'Category not found'], 404);
        }
        $jsonCategory = $serializer->serialize($category, 'json');
        return new JsonResponse($jsonCategory, 200, [], true);
    }

    #[Route('/api/categories', name: 'app_category_create', methods: ['POST'])]
    public function createCategory(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());

        if (!in_array('ROLE_ADMIN', $decodedToken['roles'])) {
            return new JsonResponse(['error' => 'You are not allowed to create a category'], 403);
        }
        $data = json_decode($request->getContent(), true);
        $requiredFields = ['name','color'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                return new JsonResponse([
                    'error'=> sprintf('Missing required field: %s', $field)
                ], 400);
            }
        }

        $existingCategory = $entityManager->getRepository(Category::class)->findOneBy(['name' => $request->get('name')]);
        if ($existingCategory) {
            return new JsonResponse(['error' => 'Category already exists'], 400);
        }

        $data = json_decode($request->getContent(), true);
        $category = new Category();
        $category->setName($data['name']);
        $category->setColor($data['color']);
        $entityManager->persist($category);
        $entityManager->flush();
        return new JsonResponse(['status' => 'Category created!'], 201);
    }

    #[Route('/api/categories/{id}', name: 'app_category_update', methods: ['PUT'])]
    public function updateCategory(Category $category, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());

        if (!in_array('ROLE_ADMIN', $decodedToken['roles'])) {
            return new JsonResponse(['error' => 'You are not allowed to update a category'], 403);
        }
        if (!$category) {
            return new JsonResponse(['error' => 'Category not found'], 404);
        }

        $existingCategory = $entityManager->getRepository(Category::class)->findOneBy(['name' => $request->get('name')]);
        if ($existingCategory) {
            return new JsonResponse(['error' => 'Category with this name already exists'], 400);
        }

        $data = json_decode($request->getContent(), true);
        if (empty($data['name']) && empty($data['color'])) {
            return new JsonResponse(['error' => 'Missing required fields'], 400);
        }

        if (!empty($data['name'])) {
            $category->setName($data['name']);
        }
        if (!empty($data['color'])) {
            $category->setColor($data['color']);
        }
        $entityManager->persist($category);
        $entityManager->flush();
        return new JsonResponse(['status' => 'Category updated!'], 200);
    }

    #[Route('/api/categories/{id}', name: 'app_category_delete', methods: ['DELETE'])]
    public function deleteCategory(Category $category, EntityManagerInterface $entityManager): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());

        if (!in_array('ROLE_ADMIN', $decodedToken['roles'])) {
            return new JsonResponse(['error' => 'You are not allowed to delete a category'], 403);
        }
        if (!$category) {
            return new JsonResponse(['error' => 'Category not found'], 404);
        }
        $entityManager->remove($category);
        $entityManager->flush();
        return new JsonResponse(['status' => 'Category deleted!'], 200);
    }
}
