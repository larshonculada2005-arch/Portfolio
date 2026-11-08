<?php
/**
 * mail.php — Contact form handler
 * Works on InfinityFree (PHP mail() is supported).
 */

header('Content-Type: application/json');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Collect and sanitize inputs
$name    = isset($_POST['name'])    ? htmlspecialchars(strip_tags(trim($_POST['name'])))    : '';
$email   = isset($_POST['email'])   ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST['subject']) ? htmlspecialchars(strip_tags(trim($_POST['subject']))) : '';
$message = isset($_POST['message']) ? htmlspecialchars(strip_tags(trim($_POST['message']))) : '';

// Basic validation
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Destination email
$to = 'larshonculada2005@gmail.com';

$email_subject = "Portfolio Contact: " . $subject;

$email_body  = "You received a new message from your portfolio contact form.\n\n";
$email_body .= "Name:    " . $name    . "\n";
$email_body .= "Email:   " . $email   . "\n";
$email_body .= "Subject: " . $subject . "\n\n";
$email_body .= "Message:\n" . $message . "\n";

$headers  = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try emailing directly.']);
}
