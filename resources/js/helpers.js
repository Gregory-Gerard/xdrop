const { v4: uuidv4 } = require('uuid');

exports.banner = (content, type) => {
    const uuid = uuidv4();
    let background;

    switch (type) {
        case 'error':
            background = 'bg-red-500';
            break;
        case 'info':
            background = 'bg-indigo-500';
            break;
        case 'success':
            background = 'bg-green-500';
            break;
    }

    document.querySelectorAll('.alert').forEach(el => el.remove());

    document.querySelector('main').prepend(this.html(`
        <div class="alert relative overflow-hidden shadow-md rounded py-2 px-4 ${background} text-white" id="alert-${uuid}">
            <div class="alert__progression absolute left-0 inset-y-0 transition-all bg-black opacity-20 z-0"></div>

            <div class="relative flex items-center justify-between w-full z-10">
                <span>${content}</span>

                <a href="#" class="alert__close transition transition-colors rounded-lg p-2 hover:bg-white hover:bg-opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="24"
                         height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         stroke-width="2"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         class="block">
                        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </a>
            </div>
        </div>
    `));

    const el = document.querySelector(`#alert-${uuid}`);

    el.querySelector('.alert__close').addEventListener('click', e => {
        e.preventDefault();

        e.target.closest('.alert').remove();
    });

    return {
        el,
        updateProgression(progression) {
            el.querySelector('.alert__progression').style.width = `${progression}%`;
        }
    };
}

exports.plural = (word, number) => {
    return `${word}${number > 1 ? 's' : ''}`;
}

exports.html = (string) => {
    const template = document.createElement('template');
    template.innerHTML = string;
    return template.content;
}
