// backend/config/cors.php

<?php

return [

    'paths' => ['*'], //

    'allowed_methods' => ['*'], //

    'allowed_origins' => explode(',', env('FRONTEND_URL', '')), //

    'allowed_origins_patterns' => [], //

    'allowed_headers' => ['*'], //

    'exposed_headers' => [], //

    'max_age' => 0, //

    'supports_credentials' => true, //
];