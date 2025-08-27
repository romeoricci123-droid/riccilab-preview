<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name    = $_POST["name"];
    $email   = $_POST["email"];
    $message = $_POST["message"];
    $captcha = $_POST["g-recaptcha-response"];

    // Verify with Google
    $secret = "6LfBHLMrAAAAAIQgqn71314LlhPZ7-nPfvoTC4HA"; // replace with your secret key
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$captcha");
    $success = json_decode($response)->success;

    if ($success) {
        // Example: send an email
        mail("you@igbmc.fr", "Contact form Ricci Lab", "From: $name <$email>\n\n$message");
        echo "Thank you, your message was sent!";
    } else {
        echo "Captcha failed. Please try again.";
    }
}
?>
