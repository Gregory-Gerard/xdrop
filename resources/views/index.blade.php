<x-layouts.public>
    <x-slot name="page">index</x-slot>

    <div id="hightlight" class="hidden fixed z-10 inset-0 grid place-items-center bg-gray-900 opacity-90">
        <strong class="text-4xl pointer-events-none">Déposez vos fichiers</strong>
    </div>

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

                <span class="flex flex-col md:flex-row md:items-center md:gap-4">Ajoutez vos fichiers <small class="font-thin text-xs text-gray-600">(10 GB max.)</small></span>
            </label>
        </div>
        <hr class="text-gray-200">
        <div class="p-4">
            <label for="message" class="block mb-2 font-semibold">Entrez votre message</label>
            <textarea id="message" class="block rounded border-gray-300 w-full text-xs" placeholder="Message optionnel (il est aussi possible de seulement transférer un message)"></textarea>
        </div>
        <div class="pb-4 px-4 text-center">
            <button id="send" class="block w-full btn-indigo umami--click--upload">Envoyer</button>

            <div class="flex items-center justify-center mt-2">
                <a href="https://github.com/Gregory-Gerard/xdrop/blob/main/README.md" target="_blank" class="text-xs text-gray-400 hover:underline">Comment ça marche ?</a>
            </div>
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
                <button id="retrieve__btn" class="block w-full btn-gray umami--click--retrieve">Récupérer</button>
            </div>
        </form>
    </div>
</x-layouts.public>
