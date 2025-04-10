<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Connect to MySQL database
$conn = new mysqli("localhost", "root", "Sarthak2004feb29@", "MWA");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Variable to hold the success message
$successMessage = "";

// Check if form data is received
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data to avoid SQL injection
    $username = $conn->real_escape_string($_POST['name']); // "name" field in form
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encrypt password

    // Insert data into the database
    $sql = "INSERT INTO users (username, email, phone, password) 
            VALUES ('$username', '$email', '$phone', '$password')";
    
    if ($conn->query($sql) === TRUE) {
        // If insertion is successful, set success message
        $successMessage = "Registration successful!";
    } else {
        // If there is an error, show the error message
        $successMessage = "Error: " . $conn->error;
    }
}

// Close connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Status</title>
    <link rel="stylesheet" href="mini1_registration.css">
</head>
<body>
    <div class="register-container">
        <h2>Registration Status</h2>
        <p><?php echo $successMessage; ?></p> <!-- Display the success or error message -->

        <!-- Button to go back to registration page -->
        <button onclick="window.location.href='mini1_registration.html'">Go Back to Registration</button>
    </div>
</body>
</html>
