<!DOCTYPE html>
<html lang="fr-FR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>xDrop</title>

    <meta name="description" content="Transférez facilement des fichiers et récupérez les sur n'importe lequel de vos appareils avec un simple code. Simple, rapide, sans inscription et sans publicité !">

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('/site.webmanifest') }}">
    <link rel="mask-icon" href="{{ asset('/safari-pinned-tab.svg') }}" color="#5bbad5">
    <meta name="apple-mobile-web-app-title" content="xDrop">
    <meta name="application-name" content="xDrop">
    <meta name="msapplication-TileColor" content="#111827">
    <meta name="theme-color" content="#111827">

    <!-- Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://xdrop.gregory-gerard.dev/">
    <meta property="og:title" content="xDrop">
    <meta property="og:description" content="Transférez facilement des fichiers et récupérez les sur n'importe lequel de vos appareils avec un simple code. Simple, rapide, sans inscription et sans publicité !">
    <meta property="og:image" content="{{ asset('/card.jpg') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://xdrop.gregory-gerard.dev/">
    <meta property="twitter:title" content="xDrop">
    <meta property="twitter:description" content="Transférez facilement des fichiers et récupérez les sur n'importe lequel de vos appareils avec un simple code. Simple, rapide, sans inscription et sans publicité !">
    <meta property="twitter:image" content="{{ asset('/card.jpg') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Style -->
    <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
</head>
<body class="grid md:place-items-center mx-4 h-screen font-serif text-sm text-white antialiased bg-gray-900">
<main class="flex flex-col gap-4 my-4 w-full sm:w-96">
    {{ $slot }}
</main>

<script src="{{ asset(mix('/js/app.js')) }}"></script>
<script>document.dispatchEvent(new CustomEvent('xdrop@page{{ ucfirst($page) }}Loaded'))</script>
</body>
</html>
