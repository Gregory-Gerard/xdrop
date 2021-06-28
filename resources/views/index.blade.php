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
            <header class="flex justify-center">
                <img src="{{ asset('/logo.png') }}" alt="Logo xDrop" title="xDrop" class="w-16">
                <h1 class="hidden">xDrop</h1>
            </header>

            <div class="shadow-xl rounded text-black bg-white">
                <div class="p-4">
                    <input type="file" multiple id="files" class="hidden">
                    <label for="files" class="group flex items-center py-16 font-semibold cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="block transition transition-colors rounded-full mr-4 p-1 bg-indigo-500 group-hover:bg-indigo-700 text-white">
                            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>

                        <span>Ajoutez vos fichiers</span>
                    </label>
                </div>
                <hr>
                <div class="p-4">
                    <label for="message" class="block mb-2 font-semibold">Entrez votre message</label>
                    <textarea id="message" class="block rounded border-gray-300 w-full"></textarea>
                </div>
                <div class="pb-4 px-4">
                    <button id="send" class="block w-full btn-indigo">Envoyer</button>
                </div>
            </div>

            <div class="shadow-md rounded text-black bg-white">
                <form id="retrieve">
                    <div class="p-4">
                        <label class="block mb-2 font-semibold">Vous avez un code de récupération ?</label>
                        <div class="grid grid-cols-4 gap-4">
                            <input type="text" class="block rounded border-gray-300 text-center" maxlength="1" pattern="[0-9]*" inputmode="numeric" aria-label="Premier numéro">
                            <input type="text" class="block rounded border-gray-300 text-center" maxlength="1" pattern="[0-9]*" inputmode="numeric" aria-label="Deuxième numéro">
                            <input type="text" class="block rounded border-gray-300 text-center" maxlength="1" pattern="[0-9]*" inputmode="numeric" aria-label="Troisième numéro">
                            <input type="text" class="block rounded border-gray-300 text-center" maxlength="1" pattern="[0-9]*" inputmode="numeric" aria-label="Quatrième numéro">
                        </div>
                    </div>
                    <div class="pb-4 px-4">
                        <button id="retrieve__btn" class="block w-full btn-gray">Récupérer</button>
                    </div>
                </form>
            </div>
        </main>

        <script src="{{ asset(mix('/js/app.js')) }}"></script>
    </body>
</html>
