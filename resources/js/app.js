require('./bootstrap');
const { banner, plural, html } = require('./helpers');

/** region Envoi sur le serveur des fichiers et / ou du message */
document.querySelector('#send').addEventListener('click', async e => {
    e.preventDefault();

    const files = document.querySelector('input[type="file"]').files;
    const message = document.querySelector('textarea').value;

    if (files.length === 0 && message.trim() === '') return banner('Fichier(s) ou message requis !', 'error');

    const uploadingMessage = banner(`En cours d'envoi`, 'info');

    const formData = new FormData();
    formData.append('message', message);
    [...files].forEach(file => formData.append('files[]', file));

    let response = null;
    try {
        response = await axios.post('upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                uploadingMessage.updateProgression(Math.round(progressEvent.loaded/progressEvent.total*100));
            }
        });
    } catch (e) {
        if (!e.response) return banner('Une erreur est survenue', 'error');

        switch (e.response.status) {
            case 413:
                banner('Fichier trop gros (1 GB max.)', 'error');
                break;
            case 429:
                banner('Maximum 5 envois par minute', 'error');
                break;
            default:
                banner(e.response.statusText ?? 'Une erreur est survenue', 'error');
                break;
        }
    }

    if (!response) return;

    banner(`
        C'est fait ! Voici votre code <strong class="block text-lg tracking-widest">${response.data.message}</strong><br>
        Disponible 10 minutes.
    `, 'success');
});

document.querySelector('input[type="file"]').addEventListener('change', e => {
    const el = e.target;

    document.querySelector('label[for="files"] span').textContent = el.files.length !== 0 ? `${el.files.length} ${plural('fichier', el.files.length)} ${plural('sélectionné', el.files.length)}` : 'Ajoutez vos fichiers';
});
/** endregion */

/** region Récupération des fichiers et / ou du message via le code */
document.querySelector('#retrieve').addEventListener('submit', async e => {
    e.preventDefault();

    const code = [...document.querySelectorAll('#retrieve input[type="text"][maxlength="1"]')].map(el => el.value).join('');

    if (code.length !== 4) return banner('Code incorrect', 'error');

    let response;

    try {
        response = await axios.get(`retrieve/${code}`);
    } catch (e) {
        return banner('Transfert introuvable', 'error');
    }

    [...document.querySelectorAll('main > *:not(header)')].forEach(el => el.classList.add('hidden'));

    document.querySelector('main').append(html(`
        <div class="shadow-md rounded text-black bg-white p-4">
            <div class="flex items-center mb-4">
                <a href="#" class="retrieve__close transition transition-colors mr-2 rounded-lg p-1.5 hover:bg-black hover:bg-opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="block"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </a>

                <strong>Contenu du transfert</strong>
            </div>

            <ul>
                ${response.data.data.map(item => `
                    <li>${item.type === 'message' ? item.content : `<a href="retrieve/${code}/download/${item.id}" target="_blank" class="text-indigo-500 hover:underline">Télécharger ${item.original_name}</a>`}</li>
                `).join('')}
            </ul>
        </div>
    `));

    document.querySelector('.retrieve__close').addEventListener('click', e => {
        e.preventDefault();

        e.target.closest('.bg-white').remove();
        [...document.querySelectorAll('main > *:not(header)')].forEach(el => el.classList.remove('hidden'));
    })
});

document.querySelectorAll('#retrieve input[type="text"]').forEach(el => el.addEventListener('click', e => e.target.select()));
document.querySelectorAll('#retrieve input[type="text"]').forEach(el => el.addEventListener('input', e => !e.target.matches(':last-of-type') ? e.target.nextElementSibling.select() : document.querySelector('#retrieve__btn').focus()));
document.querySelectorAll('#retrieve input[type="text"]').forEach(el => el.addEventListener('paste', e => {
    e.stopPropagation();
    e.preventDefault();

    const code = (e.clipboardData || window.clipboardData).getData('text');

    if (code.length !== 4) return;

    document.querySelectorAll('#retrieve input[type="text"]').forEach((el, i) => el.value = code[i]);
    document.querySelector('#retrieve__btn').focus()
}));
/** endregion */

/** region eg */
console.log(`
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠟⠛⠛⠛⠛⠛⠛⠛⡛⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠈⠒⠀⠀⠀⠈⠑⠂⠈⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠷⠤⣄⠈⠛⠦⣀⠀⠑⠂⠀⠀⠀⠀⠀⠐⠂⠀⠀⠀⠀⠀⠀⠙⠒⠤⣘⣯⡻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡿⠓⠢⢤⣀⠀⠀⠙⢦⡀⠈⠓⢤⡀⠀⠀⠉⠐⠠⢀⠀⠀⠈⠐⠄⡀⠈⠢⡀⠀⠀⠹⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡷⡶⠤⣄⡈⠳⣤⡀⠀⠙⠲⣄⡀⠈⠓⠤⣀⡀⠀⠀⠑⠂⠀⠀⠀⢀⡐⠀⣈⣁⣠⡀⡻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡿⠉⠻⣷⣤⡙⢦⣤⣍⣓⣦⣰⣶⡽⣷⣶⡟⠛⠿⠿⠶⠟⠛⠛⠛⠛⠋⠉⠉⠋⠈⠉⠙⠉⠉⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠃⠀⠀⠀⠉⠛⢦⣙⡄⠀⠉⠉⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠏⠀⢀⡀⠀⣀⣀⠀⠈⠏⠀⠀⠀⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⢹⡄⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡀⣦⣀⣤⣶⣒⣶⣤⣀⠀⠀⠀⠀⠀⠀⢿⠀⢀⣠⡶⠛⠉⠻⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠙⠚⠛⣦⠤⡤⠬⡙⠓⠦⠀⠀⠀⠀⢸⡇⢿⡉⠀⠒⠢⡄⢹⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⠇⠀⠆⠀⣻⣛⣂⣤⠜⠀⠀⠀⠀⠀⠀⠘⣏⠳⣽⣤⡴⠦⡌⡄⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⠏⠀⡌⠀⠀⠈⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡏⠳⡄⢸⡇⠀⢀⠇⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⡟⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣴⡋⠹⣗⡙⠻⡇⠀⠈⣰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⠁⠀⠀⠀⠀⠤⢄⠀⠀⠀⠀⠀⠀⠀⡜⢿⠀⠹⢦⡀⢨⡁⣇⢀⣼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣦⣤⣤⣶⣤⣤⡨⠀⢰⠖⠒⢤⡀⡼⡇⠈⠳⡀⠀⠀⠀⠙⣿⡏⠘⠦⠤⠤⠤⠴⠶⠦⠴⠖⠒⠋⢙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡇⢠⡀⢨⡙⠦⢤⣸⠟⡆⢠⢻⠃⢷⠀⠀⠘⠦⠀⠀⠁⠈⢻⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣷⣦⣵⣄⠉⡀⠀⠈⢿⠁⢴⡾⠀⠈⢧⡀⠀⠀⠀⠀⠀⠈⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣷⣿⣿⣿⣿⡟⠚⣿⠿⠶⠶⠶⣦⠃⡴⠶⠶⠶⠶⣶⠾⠷⠶⠶⠶⠶⠶⠶⣦⠀⣠⡴⠶⠛⠛⠛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡟⠉⠁⠀⣿⠉⠄⢻⡀⠀⠀⠀⢸⣿⡇⠀⠀⠀⢀⣿⠀⠀⠀⠀⠀⠀⠀⠀⣿⣼⠋⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⢯⠇⠀⠀⠀⣼⠀⠈⢸⣧⠀⠀⠀⠈⣿⠀⠀⠀⠀⣼⣿⠀⠀⠀⠀⠀⣀⣀⣀⣿⡏⠀⠀⠀⠀⣴⣆⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡾⢀⠀⠀⢠⠏⠀⠀⢀⣿⡄⠀⠀⠀⠟⠀⠀⠀⢰⣏⣽⠀⠀⠀⠀⠀⣿⠀⠀⠸⡇⠀⠀⠀⠀⠻⣿⣀⣀⣀⣀⣼⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣄⣸⣤⣴⠋⠄⠀⡄⠈⡻⣧⠀⠀⠀⠀⠀⠀⠀⣾⠁⢸⠀⠀⠀⠀⠀⠛⠛⠛⣷⣷⡀⠀⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡇⠙⠋⠈⣷⠀⠀⠀⠈⠀⠁⢹⡄⠀⠀⠀⠀⠀⢸⠇⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣷⣄⡀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡀⡀⠄⠀⠀⠆⠀⠀⡀⢀⣬⣷⠀⠀⠀⠀⢀⡟⠀⠀⢸⠀⠀⠀⠀⠀⣴⣶⣶⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣄⣠⣄⣀⣀⣠⣿⣿⣿⣿⠀⠀⠀⠀⢸⡇⣀⣠⣼⠀⠀⠀⠀⠀⣿⣿⣿⣿⡇⠀⠀⠀⠀⣿⣷⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⢸⣿⣿⣿⣿⠀⠀⠀⠀⠀⠛⠛⠛⢻⣷⠀⠀⠀⠀⢻⡿⠀⠀⠀⠀⢸⡟⠛⠛⠛⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⢸⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⡇⠀⠀⠀⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣤⣤⣤⣼⣿⣿⣿⣿⣦⣤⣤⣤⣤⣤⣤⣤⣼⣿⣿⣷⣦⣤⣤⣤⣤⣤⣶⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
`);
/** endregion */
