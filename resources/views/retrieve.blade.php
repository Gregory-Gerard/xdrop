<x-layouts.public>
    <x-slot name="page">retrieve</x-slot>

    <header class="flex justify-center">
        <img src="{{ asset('/logo.png') }}" alt="Logo xDrop" title="xDrop" class="w-16">
        <h1 class="hidden">xDrop</h1>
    </header>

    <div class="shadow-md rounded text-black bg-white p-4">
        <div class="flex items-center mb-4">
            <a href="{{ url('/') }}" class="retrieve__close transition transition-colors mr-2 rounded-lg p-1.5 hover:bg-black hover:bg-opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="block"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </a>

            <strong>Contenu du transfert</strong>
        </div>

        <ul>
            @foreach($transfer as $item)
                <li>
                    @if ($item['type'] === 'message')
                        <pre class="overflow-x-auto cursor-pointer">{{ $item['content'] }}</pre>
                    @else
                        <a href="{{ url("retrieve/{$item['code']}/download/{$item['id']}") }}" target="_blank" class="text-indigo-500 hover:underline">Télécharger {{ $item['original_name'] }}</a>
                    @endif
                </li>
            @endforeach
        </ul>
    </div>
</x-layouts.public>
