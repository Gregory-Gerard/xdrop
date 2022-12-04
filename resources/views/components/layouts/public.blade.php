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

    <!-- Vite -->
    @vite(['resources/css/app.css', 'resources/js/app.js', "resources/js/pages/{$page}.js"])
    <script>
        window.currentPageName = '{{ $page }}';
    </script>
</head>
<body class="grid md:place-items-center mx-4 h-screen font-serif text-sm text-white antialiased bg-gray-900">
<main class="flex flex-col gap-4 my-4 w-full md:max-w-screen-sm">
    {{ $slot }}
</main>

<script>
    const root = "{{ url('/') }}";

    const route = (url) => {
        if(url.indexOf(root) === 0) url = url.substr(root.length);
        if (url.indexOf('/') === 0) url = url.substr(1);

        return `${root}/${url}`;
    }
</script>

@production
    <script async defer data-website-id="2927cb9d-7c65-40b9-8a7c-9548cb26e960" src="https://umami.gregory-gerard.dev:81/630abdb504d2a.js"></script>
@endproduction
</body>
</html>
