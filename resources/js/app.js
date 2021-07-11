require('./bootstrap');
const { banner, plural, html } = require('./helpers');

/** region Page index */
document.addEventListener('xdrop@pageIndexLoaded', () => {
    if (!document.cookie.includes('xdrop_11072021')) {
        banner('🎉 Nouveau ! Déposez directement vos fichiers via un drag & drop ou un copier-coller', 'info');

        document.cookie = "xdrop_11072021=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure";
    }

    let filesToUpload = [];
    const handleFiles = (files) => {
        document.querySelector('label[for="files"] span').textContent = files.length !== 0 ? `${files.length} ${plural('fichier', files.length)} ${plural('sélectionné', files.length)}` : 'Ajoutez vos fichiers';
        filesToUpload = files;
    }

    /** region Envoi sur le serveur des fichiers et / ou du message */
    document.querySelector('#send').addEventListener('click', async e => {
        e.preventDefault();

        const files = filesToUpload;
        const message = document.querySelector('textarea').value;

        if (files.length === 0 && message.trim() === '') return banner('Fichier(s) ou message requis !', 'error');

        document.querySelector('#send').disabled = true;

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
                    uploadingMessage.updateProgression(Math.round(progressEvent.loaded / progressEvent.total * 100));

                    if (Math.round(progressEvent.loaded / progressEvent.total * 100) === 100) {
                        setTimeout(() => {
                            if (response) return;

                            banner(`Transfert en cours de traitement...`, 'info').updateProgression(100);
                        }, 2500);
                    }
                }
            });
        } catch (e) {
            response = e;

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

        if (!response || response instanceof Error) return;

        banner(`
            C'est fait ! Voici votre code <strong class="block text-lg tracking-widest"><a href="${route(`retrieve/${response.data.message}`)}" class="hover:underline" target="_blank">${response.data.message}</a></strong><br>
            Disponible 10 minutes.
        `, 'success');

        document.querySelector('input[type="file"]').value = '';
        document.querySelector('input[type="file"]').dispatchEvent(new Event('change'));
        document.querySelector('textarea').value = '';
        document.querySelector('#send').disabled = false;
    });

    document.querySelector('input[type="file"]').addEventListener('change', e => handleFiles(e.target.files));
    /** endregion */

    /** region Récupération des fichiers et / ou du message via le code */
    document.querySelector('#retrieve').addEventListener('submit', async e => {
        e.preventDefault();

        const code = [...document.querySelectorAll('#retrieve input[type="text"][maxlength="1"]')].map(el => el.value).join('');

        if (code.length !== 4) return banner('Code incorrect', 'error');

        try {
            await axios.get(`retrieve/${code}`);
        } catch (e) {
            return banner('Transfert introuvable', 'error');
        }

        location.href = `retrieve/${code}`;
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

    /** region Drop des fichiers */
    const dropArea = document.querySelector('body');
    const dropInfo = document.querySelector('#hightlight');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            document.querySelector('main').classList.add('pointer-events-none');
            dropInfo.classList.remove('hidden')
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            document.querySelector('main').classList.remove('pointer-events-none');
            dropInfo.classList.add('hidden')
        }, false);
    });

    dropArea.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files), false)
    /** endregion */

    /** region Paste des fichiers */
    document.addEventListener('paste', (e) => {
        let files = [];
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;

        for (const item of items) {
            files.push(item.getAsFile());
        }

        handleFiles(files);
    });
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
});
/** endregion */

/** region Page retrieve */
document.addEventListener('xdrop@pageRetrieveLoaded', () => {
    document.querySelector('pre')?.addEventListener('click', e => {
        const el = e.target.closest('pre');

        if (document.body.createTextRange) {
            const range = document.body.createTextRange();
            range.moveToElementText(el);
            range.select();
        } else if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(el);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
});
/** endregion */
