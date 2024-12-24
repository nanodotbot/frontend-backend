<?php
header('Content-Type: application/json');

try {
    require 'connect.php';

    $statement = $pdo->prepare('SELECT * FROM posts');
    $statement->execute();
    $posts = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($posts === false) {
        throw new Exception('Failed to fetch posts from the database.');
    }

    $json = json_encode($posts, JSON_THROW_ON_ERROR);
    echo $json;
    
} catch (PDOException $e) {
    // Handle database-related errors
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} catch (JsonException $e) {
    // Handle JSON encoding errors
    http_response_code(500);
    echo json_encode(['error' => 'JSON encoding error: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Handle generic errors
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}
