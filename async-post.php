<?php
header('Content-Type: application/json');

try {
    // Decode JSON body
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate the input
    if (!isset($input['content']) || trim($input['content']) === '') {
        throw new Exception('Content is required.');
    }

    $text = $input['content'];

    // Connect to the database
    require 'connect.php';

    // Prepare the SQL statement
    $statement = $pdo->prepare('INSERT INTO posts (text) VALUES (:text)');
    $statement->execute([
        ':text' => $text,
    ]);

    // Respond with success
    echo json_encode(['success' => true, 'message' => 'Post added successfully!']);

} catch (Exception $e) {
    // Handle errors and respond with an error message
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
