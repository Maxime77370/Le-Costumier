<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Category;
use App\Repository\ProductRepository;

use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;




class ProductController extends AbstractController
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


    #[Route('/api/products', name: 'app_product', methods: ['GET'])]
    public function getAllProducts(ProductRepository $productRepository, SerializerInterface $serializer, Request $request ): JsonResponse
    {
        $field = $request->query->get('orderByField');
        $order = $request->query->get('order');

        if ($field) {
            $allowedFields = ['name', 'price'];
            if (!in_array($field, $allowedFields)) {
                return new JsonResponse([
                    'error' => 'Invalid field'
                ], 400);
            }

            if (!$order) {
                $order = 'ASC';
            } else {
                $order = strtoupper($order);
                if ($order !== 'ASC' && $order !== 'DESC') {
                    return new JsonResponse([
                        'error' => 'Invalid order'
                    ], 400);
                }
            }
            
            $productList = $productRepository->findAllOrderBy($field, $order);
        } else {
            $productList = $productRepository->findAll();
        }

        $jsonBookList = $serializer->serialize($productList, 'json');
        return new JsonResponse($jsonBookList, 200, [], true);
    }

    #[Route('/api/products/{id}', name: 'app_product_show', methods: ['GET'])]
    public function getProduct(int $id,ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        
        $product = $productRepository->find($id);
        if(!$product){
            return new JsonResponse(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }
        $jsonProduct = $serializer->serialize($product, 'json');
        return new JsonResponse($jsonProduct, 200, [], true);
    }

    #[Route('/api/products', name: 'app_product_create', methods: ['POST'])]
    public function createProduct(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        // check if the user has the role ROLE_ADMIN
        if (!in_array('ROLE_ADMIN', $decodedToken['roles'])) {
            return new JsonResponse(['error' => 'You are not allowed to create a product'], Response::HTTP_FORBIDDEN);
        }

        $data = json_decode($request->getContent(), true);

        $requiredFields = ['name', 'description', 'price', 'photo', 'categories'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                return new JsonResponse([
                    'error'=> sprintf('Missing required field: %s', $field)
                ], 400);
            }
        }
        // Check if price is a number and > 0
        if (!is_numeric($data['price']) || $data['price'] <= 0) {
            return new JsonResponse([
                'error'=> 'Price must be a number greater than 0'
            ], 400);
        }

        $product = new Product();
        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);
        $product->setPhoto($data['photo']);
        foreach ($data['categories'] as $category) {
            $category = $entityManager->getRepository(Category::class)->find($category);
            $product->addCategory($category);
        }

        $entityManager->persist($product);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Product created successfully',
        ], 201);
    }

    #[Route('/api/products/{id}/categories/{categories_id}', name: 'app_product_categories_add', methods: ['PUT'])]
    public function addProductCategory(int $id, int $categories_id, EntityManagerInterface $entityManager): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        // check if the user has the role ROLE_ADMIN
        if (!in_array('ROLE_ADMIN', $decodedToken['roles'])) {
            return new JsonResponse(['error' => 'You are not allowed to add a category to a product'], Response::HTTP_FORBIDDEN);
        }

        $product = $entityManager->getRepository(Product::class)->find($id);
        if (!$product) {
            return new JsonResponse(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        $category = $entityManager->getRepository(Category::class)->find($categories_id);
        if (!$category) {
            return new JsonResponse(['error' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $product->addCategory($category);
        $entityManager->persist($product);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Category added to product successfully'], Response::HTTP_OK);
    }


    #[Route('/api/products/{id}', name: 'app_product_update', methods: ['PUT'])]
    public function updateProduct(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        // check if the user has the role ROLE_ADMIN
        if (!in_array('ROLE_ADMIN', $decodedToken['roles'])) {
            return new JsonResponse(['error' => 'You are not allowed to update a product'], Response::HTTP_FORBIDDEN);
        }

        $product = $entityManager->getRepository(Product::class)->find($id);
        if (!$product) {
            return new JsonResponse(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }
        
        $data = json_decode($request->getContent(), true);

        // check if at least one field is present
        $oneFieldPresent = false;
        $requiredFields = ['name', 'description', 'price', 'photo'];
        foreach ($requiredFields as $field) {
            if (isset($data[$field])) {
                $oneFieldPresent = true;
                break;
            }
        }

        if (!$oneFieldPresent) {
            return new JsonResponse([
                'error'=> 'At least one field must be present'
            ], 400);
        }

        if (isset($data['name'])) {
            $product->setName($data['name']);
        }
        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }
        if (isset($data['price'])) {
            if (!is_numeric($data['price']) || $data['price'] <= 0) {
                return new JsonResponse([
                    'error'=> 'Price must be a number greater than 0'
                ], 400);
            }
            $product->setPrice($data['price']);
        }
        if (isset($data['photo'])) {
            $product->setPhoto($data['photo']);
        }

        $entityManager->persist($product);
        $entityManager->flush();

        return new JsonResponse([
            'message' => "Product updated successfully",
        ], 200);
    }
    
    #[Route('/api/products/{id}/categories/{categories_id}', name: 'app_product_categories_delete', methods: ['DELETE'])]
    public function deleteProductCategory(int $id, int $categories_id, EntityManagerInterface $entityManager): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        // check if the user has the role ROLE_ADMIN
        if (!in_array('ROLE_ADMIN', $decodedToken['roles'])) {
            return new JsonResponse(['error' => 'You are not allowed to delete a category from a product'], Response::HTTP_FORBIDDEN);
        }

        $product = $entityManager->getRepository(Product::class)->find($id);
        if (!$product) {
            return new JsonResponse(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        $category = $entityManager->getRepository(Category::class)->find($categories_id);
        if (!$category) {
            return new JsonResponse(['error' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $product->removeCategory($category);
        $entityManager->persist($product);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Category deleted from product successfully'], Response::HTTP_OK);
    }

    #[Route('/api/products/{id}', name: 'app_product_delete', methods: ['DELETE'])]
    public function deleteProduct(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $decodedToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        // check if the user has the role ROLE_ADMIN
        if (!in_array('ROLE_ADMIN', $decodedToken['roles'])) {
            return new JsonResponse(['error' => 'You are not allowed to delete a product'], Response::HTTP_FORBIDDEN);
        }

        $product = $entityManager->getRepository(Product::class)->find($id);
        if (!$product) {
            return new JsonResponse(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($product);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Product deleted successfully'], Response::HTTP_OK);
    }
}
